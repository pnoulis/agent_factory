#!/usr/bin/env bash

usageusage() {
    cat <<EOF
${0} generate players for agent factory

[USAGE]: ${0} [OPTION] [numberOfPlayers]

    The 1st positional argument #numberOfPlayers specifies the amount
    of players to generate. By default only 1 player is generated.
    By default the script outputs players in json format.

    --as-js -> output data in javascript format
    -h, --help -> show this message
EOF
}

set -o errexit

EXECDIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)

# Options
export ASJS=1

# Positional Arguments
declare -i NPLAYERS=1

main() {
    cd $EXECDIR
    parse_args "$@"
    set -- "${POSARGS[@]}"
    NPLAYERS="${1:-1}"
    OUTFILE="$(mktemp)" || die "Failed to create a temporary file";

    if (( ASJS == 0 )); then
        cat <<EOF > $OUTFILE
const BACKEND_PLAYERS = [
EOF
    else
        cat <<EOF > $OUTFILE
[
EOF
    fi

    declare -i i=0
    while (( i < NPLAYERS )); do
      i=$((++i))
      player=$(gname)
      name="${player%_*}${i}"
      surname="${player#*_}${i}"
      username="auto${i}_${name}"
      randomActive=$((0 + $RANDOM % 2))

      if (( $randomActive == 0 )); then
          # create a player with a wristband assigned
          wristbandNumber=$i
          wristbandColor=$((0 + $RANDOM % 7))
          active=true

          randomMerged=$((0 + $RANDOM % 2))
          if (( $randomMerged == 0)); then
              # player is playing right now
              wristbandMerged=true
          else
              # player is not playing
              wristbandMerged=false
          fi

          cat <<EOF >> $OUTFILE
{
$(quote username): "${username}",
$(quote name): "${name}",
$(quote surname): "${surname}",
$(quote email): "${name}.${surname}@afadmin.com",
$(quote wristbandMerged): ${wristbandMerged},
$(quote wristband): {
$(quote wristbandNumber): ${wristbandNumber},
$(quote wristbandColor): ${wristbandColor},
$(quote active): ${active}
}
}$(comma i NPLAYERS)
EOF
      else
          # create a player without a wristband
          wristbandMerged=false
          cat <<EOF >> $OUTFILE
{
$(quote username): "${username}",
$(quote name): "${name}",
$(quote surname): "${surname}",
$(quote email): "${name}.${surname}@afadmin.com",
$(quote wristbandMerged): ${wristbandMerged},
$(quote wristband): null
}$(comma i NPLAYERS)
EOF
      fi
    done 

    if (( ASJS == 0 )); then
        cat <<EOF >> $OUTFILE
]
export { BACKEND_PLAYERS };
EOF
    else
        cat <<EOF >> $OUTFILE
]
EOF
    fi
    cat $OUTFILE
}

quote() {
    if (( "ASJS" == 0 )); then
        echo "$1"
    else
        echo '"'"$1"'"'
    fi
}

comma() {
    local -i diff=$(( $2 - $1 ));
    if (( diff >= 1 )); then
        echo ','
    else
        echo ''
    fi
}

parse_args() {
    declare -ga POSARGS=()
    while (($# > 0)); do
        case "${1:-}" in
            --as-js)
                ASJS=0
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
                die "Unrecognized argument ${1:-}"
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
        die "${param:-$1} requires an argument"
    fi

    echo "${arg:-}"
    return $toshift
}

die() {
    exec 1>&2
    echo "$@"
    exit 1
}

main "$@"
