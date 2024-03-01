#!/usr/bin/env bash

usage() {
    cat <<EOF
${0} reads, expands and transforms environment variables.

  Dotenv implementation's abound in the developer community across all languages
  and paradigms. This dotenv implementation was designed specifically to
  decouple the very common requirement of gathering envars from a variety of
  sources from any specific language or tool. Bash achieves at least partically
  that decoupling, because it is a tool that is widely used most often adopting
  the role of the least common denominator.

[USAGE]: ${0} [OPTION...] file1 dir1 dir2 file2...

  Read envars from each file in the order they appear provided as a positional
  parameter. Duplicated envars are replaced by the most recently read
  definition.

  If any of the positional arguments is a directory instead of a file then the
  directory is expected to hold environment variables presets. An envar preset
  is a file used to keep environment variable definitions. The filename that
  matches the MODE is loaded to form part of the environment of the current run.

  -m, --mode - Environment presets mode
        By default --mode=production
  -e, --environment - Define environment variables
  -p, --inherit-process
        By defaut the process environment is not loaded, althought it is used
        for expanding environment variables. With -p the parent's process
        environment is included in the output.
  -s, --switch-prefixes
        Adds or replaces a substring from each environment variable key loaded.
  -h, --help - Show this message

[EXAMPLES]:

  #1) Given the command:

  ${0} --mode=production .

  (assuming that . is a presets directory)
  presets_dir/
  presets_dir/env
  presets_dir/env.production
  presets_dir/env.development

  Then ${0} shall load in order:
  presets_dir/env
  presets_dir/.env
  presets_dir/env.production
  presets_dir/.env.production

  Any of these environment preset files might be missing without causing
  an error.

  #2) Given the command:

  ${0} --switch-prefixes="FRONTEND=REACT;=BACKEND" .

  Given the environment variable set:
  FRONTEND_ONE=something
  FRONTEND_TWO=something
  THREE=something
  FOUR=something

  The output is:
  REACT_ONE=something
  REACT_TWO=something
  BACKEND_ONE=something
  BACKEND_ONE=something

  #3) Given the command:

  ${0} --environment="$USER;ONE=$HOME" .

  Given the environment variable set inherited from the process:
  USER=pnoul
  HOME=/home/pnoul

  The output is:
  USER=pnoul
  ONE=/home/pnoul

  Notice how $USER within --environment is not provided with a value. If no
  value is provided and the key is prefixed with $ then that envar is to be
  cloned by the environment defined so far.

EOF
}

# Options
# parameter
# -m --mode=
MODE=${MODE:-production}
# parameter
# -e --environment=
CLIENV=
# parameter
# --switch-prefixes=
declare -gA SWITCH_PREFIXES=()
# flag
# -p --inherit-process
declare -gA PROCENV=()
# positional arguments
# $@ file1 dir1 dir2 file2...

# ------------------------------ PROGRAM START ------------------------------ #
trap 'exit 1' 10
declare -g PROC=$$
# Exit script on error
set -o errexit
EXECDIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)
declare -gA ENV=()

main() {
    parse_args "$@"
    set -- "${POSARGS[@]}"

    ENV['MODE']=$MODE
    load_process_env

    # load directory and file environment presets
    for f in "$@"; do
        # expand path
        f=$(realpath $f 2>/dev/null)
        if ! [[ -r $f ]]; then
            # if path does not exist or is not readable
            fatal $f does not exist or not readable!
        elif [[ -d $f ]]; then
            # if directory
            load_preset_env $f
        elif [[ -f $f ]]; then
            # if file
            load_file_env $f
        fi
    done

    substitute_process_env
    load_cli_env
    env_to_stdout
}

# write env to stdout
env_to_stdout() {
    for i in ${!ENV[@]}; do
        echo $i=${ENV[$i]}
    done
}

# load preset environment
load_preset_env() {
   local envdir=$1

   # env presets should not be hidden but
   # if they are they take precedence over
   # in plain sight presets

   # read default preset
   load_file_env $envdir/env.default
   load_file_env $envdir/.env.default

   # read $MODE preset
   load_file_env $envdir/env.$MODE
   load_file_env $envdir/.env.$MODE
}

# load file environment
load_file_env() {
    local envfile=$1
    if [[ -s $envfile ]]; then
        while IFS='=' read -r key value; do

            # Ignore empty lines
            if [[ -z "${key:-}" ]]; then
                continue
            fi

            # In case the key is of the form: '$KEY'
            # That is interpreted to mean that the user
            # wants to clone some environemnt variable
            # that is found either in ENV or PROCENV
            if [[ $key =~ ^\$ ]]; then
                value=$key
                key=${key#?}
            fi
            ENV[$(switch_prefix $key)]=$(expand_envar $value)
        done < <(cat $envfile | sed -e '$a\') # ensure file ends in newline
    fi
}

# parent process environment
load_process_env() {
    while IFS='=' read -r key value; do
        PROCENV[$key]=$value
    done < <(cat "/proc/$$/environ" | tr '\0' '\n')
}

# substitute envars in ENV for envars in PROCENV
substitute_process_env() {
    for key in ${!PROCENV[@]}; do
        if [[ -n "${ENV[$key]:-}" ]]; then
            # if $key is found in ENV substitute it for the
            # one found in PROCENV
            ENV[$key]=${PROCENV[$key]}
        fi
    done
}

# command line parameter --environment
load_cli_env() {
    if [[ -n "${CLIENV:-}" ]]; then
        while IFS='=' read -r key value; do
            # In case the key is of the form: $KEY
            # That is interpreted to mean that the user
            # wants to clone some environemnt variable
            # that is found either in ENV or PROCENV
            if [[ $key =~ ^\$ ]]; then
                value=$key
                key=${key#?}
            fi
            ENV[$(switch_prefix $key)]=$(expand_envar $value)
        done < <(echo "$CLIENV" | tr ';' '\n')
    fi
}

# expand environment variable
expand_envar() {
    local envar=$1
    local expanded=''
    local tmp=''

    while IFS='=' read -r action value; do
        case "${action:-}" in
            expand)
                # Fist try and expand the variable from ENV
                tmp=${ENV["$value"]}
                # If value was not expanded try PROCENV
                if [[ -z "${tmp:-}" ]]; then
                    tmp=${PROCENV["$value"]}
                fi
                # If the value remains unexpanded throw an error
                if [[ -z "${tmp:-}" ]]; then
                    fatal 'Failed expansion for' "$value" 'in' "$envar"
                else
                    expanded+="$tmp"
                fi
                ;;
            literal)
                expanded+="$value"
                ;;
            *)
                if [[ -z "${action:-}" && -n "${value:-}" ]]; then
                    fatal 'Failed expansion for' "$value" 'in' "$envar"
                fi
                ;;
        esac
    done < <(parse_envar "$envar" | tr ' ' '\n')

    echo "$expanded"
}

# Break down environment variable value into constituent parts
# Returns an array of strings each of the form
# action=value
# the action part specifies how the value should be interpreted.
# Available actions are:
# 1. expand
# 2. exec
# 3. literal
parse_envar() {
    local envar=$1
    local -a parsed=()
    let lenparsed=0
    let LOOKING_FOR_SS=1
    let LOOKING_FOR_SE=0
    let ESCAPING=0

    while [[ -n "${envar:-}" ]]; do
        char=${envar:0:1}
        envar=${envar#?}
        case $char in
            \\)
                if [[ "${envar:0:1}" =~ [$\{\}] ]]; then
                    ESCAPING=1
                    continue
                fi
                ;;
            \{)
                if (( LOOKING_FOR_SE )); then
                    # part of special token
                    continue
                fi
                ;;
            \$ | \})
                if (( ESCAPING == 1 )); then
                    ((++ESCAPING))
                elif (( ESCAPING == 2 )); then
                    ESCAPING=0
                    LOOKING_FOR_SS=1
                    if (( ${#parsed[lenparsed]} >= 1 )); then
                        parsed[lenparsed++]="literal=${parsed[lenparsed]}$char"
                    fi
                    continue
                elif (( LOOKING_FOR_SS )); then
                    LOOKING_FOR_SS=0
                    LOOKING_FOR_SE=1
                    if (( ${#parsed[lenparsed]} >= 1 )); then
                        parsed[lenparsed++]="literal=${parsed[lenparsed]}"
                    fi
                    continue
                elif (( LOOKING_FOR_SE )); then
                    LOOKING_FOR_SS=1
                    LOOKING_FOR_SE=0
                    parsed[lenparsed++]="expand=${parsed[lenparsed]}"
                    continue
                fi
                ;;
            *)
                ;;
        esac

        parsed[lenparsed]+=$char

        # END OF ENVAR
        if [[ -z "${envar:-}" ]]; then
            if (( LOOKING_FOR_SS )); then
                parsed[lenparsed++]="literal=${parsed[lenparsed]}"
            fi

            if (( LOOKING_FOR_SE )); then
                parsed[lenparsed++]="expand=${parsed[lenparsed]}"
            fi
        fi

    done
    echo "${parsed[@]}"
}

# prefix switch
switch_prefix() {
    local envkey=$1
    while IFS='=' read -r key value; do
        if [[ -z "${key:-}" ]]; then
            envkey=$value$envkey
        elif [[ $envkey =~ $key ]]; then
            envkey=${envkey/$key/$value}
            echo $envkey
            return
        fi
    done < <(echo "$SWITCH_PREFIXES" | tr ';' '\n')
    echo $envkey
}

parse_args() {
    declare -ga POSARGS=()
    while (($# > 0)); do
        case "${1:-}" in
            -p | --inherit-process)
                unset -v PROCENV
                declare -gn PROCENV=ENV
                ;;
            -m | --mode*)
                MODE=$(OPTIONAL=0 parse_param "$@") || shift $?
                ;;
            -e | --environment*)
                CLIENV=$(OPTIONAL=0 parse_param "$@") || shift $?
                # remove last semicolon if any
                if [[ "$CLIENV" =~ .*\;$ ]]; then
                    CLIENV="${CLIENV%?}"
                fi
                ;;
            -s | --switch-prefixes*)
                SWITCH_PREFIXES=$(parse_param "$@") || shift $?
                # remove last semicolon if any
                if [[ "$SWITCH_PREFIXES" =~ .*\;$ ]]; then
                    SWITCH_PREFIXES="${SWITCH_PREFIXES%?}"
                fi
                ;;
            --debug)
                DEBUG=0
                ;;
            -h | --help)
                usage
                exit 0
                ;;
            -[a-zA-Z][a-zA-Z]*)
                local i="${1:-}"
                shift
                for i in $(echo "$i" | grep -o '[a-zA-Z]'); do
                    set -- "-$i" "$@"
                done
                continue
                ;;
            --)
                shift
                POSARGS+=("$@")
                ;;
            -[a-zA-Z]* | --[a-zA-Z]*)
                fatal "Unrecognized argument ${1:-}"
                ;;
            *)
                POSARGS+=("${1:-}")
                ;;
        esac
        shift
    done
}

parse_param() {
    local param arg
    local -i toshift=0

    if (($# == 0)); then
        return $toshift
    elif [[ "$1" =~ .*=.* ]]; then
        param="${1%%=*}"
        arg="${1#*=}"
    elif [[ "${2-}" =~ ^[^-].+ ]]; then
        param="$1"
        arg="$2"
        ((toshift++))
    fi

    if [[ -z "${arg-}" && ! "${OPTIONAL-}" ]]; then
        fatal "${param:-$1} requires an argument"
    fi

    echo "${arg:-}"
    return $toshift
}

fatal() {
    echo "$@" >&2
    kill -10 $PROC
    exit 1
}

main "$@"
