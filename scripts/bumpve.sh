#!/bin/bash

# bumpve
# Bump up or down, a version following the semantic versioning scheme
# https://semver.org/


# Options && args
## -------------------------------------- ##
INPUT=
PREFIX=
STITCH=
VALIDATE=
DEBUG=
BUMP=0
bumpTarget=$((0))

# Utils
# --------------------------------------- ##
# Core[-PreRelease[+Build] | -PreRelease | +Build]
PREFIX_RE="[vV]"
CORE_RE="(?:0\.|[1-9]\d*\.){2}(?:0|[1-9]\d*)"
RELEASE_RE="(?:(?:[-1-9][-0-9]*|[-a-zA-Z]*|0)\.)*(?:[-1-9][-0-9]*|[-a-zA-Z]*|0)"
BUILD_RE="(?:[-a-zA-Z0-9]*\.)*[-a-zA-Z0-9]*"
SEMVER_RE="^${PREFIX_RE}?${CORE_RE}(?:-${RELEASE_RE})?(?:\\+${BUILD_RE})?\$"

main() {
    declare -ag length
    declare -ag offset
    length[0]=$(getSchemaElementLength "core")
    length[1]=$(getSchemaElementLength "release")
    length[2]=$(getSchemaElementLength "build")
    length[3]=$((-1)) # stitch length
    length[4]=$((${length[0]} + ${length[1]} + ${length[2]})) # total length
    offset[0]=0
    offset[1]=$((${length[0]}))
    offset[2]=$((${offset[1]} + ${length[1]}))
    offset[3]=$((-1)) # stitch offset

    # redirection or pipe
    if [[ -p /dev/stdin || ! -t 0 ]]; then
        read -r INPUT
    fi

    while getopts "hcrbMmps:dv" o; do
        case "$o" in
            h) # help
                usage
                ;;
            c) # core
                BUMP=1
                bumpTarget=$((${offset[0]} + bumpTarget))
                ;;
            r) # release
                BUMP=1
                bumpTarget=$((${offset[1]} + bumpTarget))
                ;;
            b) # build
                BUMP=1
                bumpTarget=$((${offset[2]} + bumpTarget))
                ;;
            M) # major
                bumpTarget=$((0 + bumpTarget))
                ;;
            m) # minor
                bumpTarget=$((1 + bumpTarget))
                ;;
            p) # patch
                bumpTarget=$((2 + bumpTarget))
                ;;
            s) # stitch
                STITCH="$OPTARG"
                ;;
            d) # debug
                DEBUG=1
                ;;
            v) # validate
                VALIDATE=1
                ;;
            *)
                ;;
        esac
    done
    shift $((OPTIND - 1))
    (( $# > 0 )) && INPUT="$1"

    [ -n "$STITCH" ] && calculateStitchRange
    ((BUMP == 1 )) && bump
    ((VALIDATE == 1)) && validate "$INPUT"
}

usage() {
    cat <<EOF
${0}: [OPTION]... version
-c core
-r release
-b build
-M major
-m minor
-p patch
-s stitch
-d debug
-v validate
-h help
EOF
}


# param
# { string } message
stateError() {
    echo "error"
    exit 1
}

# params
# { integer } $1, index
# { boolean } $2, show
debug() {
    (($# > 1 )) && {
        echo -e "${YELLOW}target:${NC}" "${PURPLE}$bumpTarget${NC}"
        echo -e "${YELLOW}stitch start:${NC}" "${PURPLE}${offset[3]}${NC}" \
             "${YELLOW}stitch end:${NC}" "${PURPLE}${length[3]}${NC}"
        echo -e bump: "${debug[bump]}"
        echo -e empty: "${debug[empty]}"
        echo -e stitch: "${debug[stitch]}"
        echo -e reset: "${debug[reset]}"
        return $?
    }

    (( ${#debug[@]} == 0 )) && {
        declare -gA debug
        debug["empty"]=""
        debug["stitch"]=""
        debug["bump"]=""
        debug["reset"]=""
        PURPLE='\033[0;35m'
        YELLOW='\033[0;33m'
        BLUE='\033[0;34m'
        RED='\033[0;31m'
        NC='\033[0m'
    }

    if (( $BUMP == 1 )); then
        debug["bump"]+="${RED}0${NC}"
    else
        debug["bump"]+='0'
    fi

    if (( $STITCH == 1 )); then
        debug["stitch"]+="${RED}0${NC}"
    else
        debug["stitch"]+='0'
    fi

    if (( $EMPTY == 1 )); then
        debug["empty"]+="${RED}0${NC}"
    else
        debug["empty"]+='0'
    fi

    if (( $RESET == 1 )); then
        debug["reset"]+="${RED}0${NC}"
    else
        debug["reset"]+='0'
    fi

    (($1 == ${offset[1]} - 1 || $1 == ${offset[2]} - 1)) && {
        for z in "${!debug[@]}"; do
            debug[$z]+="${BLUE}.${NC}"
        done
    }

    return $?
}

# params
# example: -scM-bp -> would register all identifiers up for stitches
# example: -s -> stich up to bump target
calculateStitchRange() {
    [ $STITCH == '-' ] && {
        offset[3]=0
        length[3]=$bumpTarget
        return 0
    }
    IFS='-' read offset[3] length[3] <<<"$STITCH"
    [ -z ${length[3]} ] && length[3]=${offset[3]}
    offset[3]=$(getIndex $(decodeClarg ${offset[3]:0:1}) $(decodeClarg ${offset[3]:1:1}))
    length[3]=$(getIndex $(decodeClarg ${length[3]:0:1}) $(decodeClarg ${length[3]:1:1}))
    [[ ${length[3]} -lt ${offset[3]} ]] && stateError
    return $?
}

# params
# { any } a command line argument $1 {c | r | b | M | m | p | 0 | 1 | 2}
decodeClarg() {
    case $1 in
        c)
            echo -n 0
            ;;
        r)
            echo -n 1
            ;;
        b)
            echo -n 2
            ;;
        M)
            echo -n 0
            ;;
        m)
            echo -n 1
            ;;
        p)
            echo -n 2
            ;;
        0)
            echo -n 'core'
            ;;
        1)
            echo -n 'release'
            ;;
        2)
            echo -n 'build'
            ;;
        *)
            stateError
            ;;
    esac
}

readSchema() {
    schema='{
        "core": [
            0,
            0,
            0
        ],
        "release": [
            ["alpha", "beta", "rc"],
            0
        ],
        "build": [
            { "_date": ["one", "two"] },
            0
        ]
    }'
    echo -n "$schema"
}

# params
# { string } element {core,release,build}
getSchemaElementLength() {
    readSchema | jq -r --arg e "$1" '.[$e] | length'
}

# params
# { string } element $1 {core | release | build}
getSchemaElementIndices() {
    readSchema | jq -r --arg e "$1" '.[$e] | [range(0, length)] | join(" ")'
}

# params
# { string } element $1 {core | release | buid}
# { integer } identifier $2 {0, 1, ...}
expandSchemaIdentifier() {
    readSchema | jq -r --arg e "$1" --arg i "$2" '
    .[$e][$i|tonumber]
    | if type == "array" then ["array", .[]] | join(" ")
    elif type == "object" then to_entries[] | ["object", .key, (.value | join(","))] | join(" ")
    elif type == "number" then ["number", .] | join(" ")
    else null end
'
}

# params
# { integer } element $1 [0 = core | 1 = release | 2 = build]
# { integer } identifer $2 [0 = major | 1 = minor | 2 = patch]
getIndex() {
    echo $((${offset[$1]} + $2))
    return 0
}

# params
# { string } element name $1 {core | release | build}
# { integer } identifier index $2 {0 | 1 | 2}
# { any } previous identifier value $3
stitch() {
    local patch=""
    local i=0
    read -a ids <<< $(expandSchemaIdentifier  $1 $2)
    case ${ids[0]} in
        array)
            ids=("${ids[@]:1}")
            if [ -n "$3" ]; then
                for i in "${!ids[@]}"; do
                    if [ "$3" == "${ids[i]}" ]; then
                        ((++i == ${#ids[@]})) && ((i--))
                        patch="${ids[i]}"
                        break
                    fi
                done
            else
                patch="${ids[0]}"
            fi
            ;;
        object)
            patch=$(eval "${ids[@]:1}")
            ;;
        number)
            if [ -n "$3" ]; then
                patch=$(($3 + 1))
            else
                patch=${ids[1]}
            fi
            ;;
        *)
            stateError
            ;;
    esac
    [ -z "$patch" ] && stateError
    echo "$patch"
    return $?
}

# params
# { integer } $1, element index, 0..schemaLength
shouldStitch() {
    if (( $1 >= ${offset[3]} && $1 <= ${length[3]} )); then
        STITCH=1
    else
        STITCH=0
    fi
    return $?
}

# params
# { integer } $1, element index, 0..schemaLength
shouldReset() {
    if (( $1 > $bumpTarget )); then
        RESET=1
    else
        RESET=0
    fi
    return $?
}

# params
# { integer } $1, element index, 0..schemaLength
shouldBump() {
    if (( $1 == $bumpTarget )); then
        BUMP=1
    else
        BUMP=0
    fi
    return $?
}

# params
# { string } $1, element, "identifier"
isEmpty() {
    if [ -z "$1" ]; then
        EMPTY=1
    else
        EMPTY=0
    fi
    return $?
}

# params
# { string,... } identifiers
joinTokens() {
    local str=""
    local len=$#
    for (( i = 1; i < len; i++ )); do
        [[ "${!i}" ]] && str+="${!i}."
    done
    str+="${!len}"
    echo $str
    return 0
}

bump() {
    elements[0]="$(grep -Po "${CORE_RE}" <<< "$INPUT")"
    elements[1]="$(grep -Po "\-${RELEASE_RE}\\+" <<< "$INPUT" | sed 's/[-+]//g')"
    elements[2]="$(grep -Po "\\+${BUILD_RE}$" <<< "$INPUT" | sed 's/[+]//g')"
    EMPTY=
    BUMP=
    STITCH=
    RESET=
    # as in global index; the position of the current identifier within the full schema version.
    local gindex=
    for i in "${!elements[@]}"; do
        # split current semantic version element into its identifiers
        IFS='.' read -a identifiers <<< "${elements[$i]}"
        # iterate over the current registered element's identifiers
        for y in $(getSchemaElementIndices $(decodeClarg $i)); do
            # the current identifier's index within the set of all registered identifiers
            gindex=$(getIndex $i $y)
            shouldBump $gindex
            isEmpty "${identifiers[$y]}"
            shouldReset $gindex
            shouldStitch $gindex
            (( DEBUG == 1 )) && debug $gindex

            if ((EMPTY == 1)); then
                if ((STITCH == 1)); then
                    identifiers[y]=$(stitch $(decodeClarg $i) $y)
                fi
                if ((BUMP == 1)); then
                    [[ -z "${identifiers[$y]}" ]] && {
                        stateError
                    }
                    identifiers[y]=$(stitch $(decodeClarg $i) $y "${identifiers[y]}")
                fi
            elif ((BUMP == 1)); then
                identifiers[y]=$(stitch $(decodeClarg $i) $y "${identifiers[y]}")
            elif ((RESET == 1)); then
                identifiers[y]=$(stitch $(decodeClarg $i) $y)
            fi
        done

        case $i in
            1)
                ;;
            2)
                ;;
        esac
        (( ${#identifiers[@]} > 0 )) && {
            case $i in
                0)
                    elements[i]="$(joinTokens ${identifiers[@]})"
                    ;;
                1)
                    elements[i]="-$(joinTokens ${identifiers[@]})"
                    ;;
                2)
                    elements[i]="+$(joinTokens ${identifiers[@]})"
                    ;;
            esac
        }
    done
    (( DEBUG == 1 )) && debug 0 "show"
    echo "${elements[@]}" | sed 's/\s//g'
}

# params
# { string } version string
validate() {
    echo "$(grep -Po "${SEMVER_RE}" <<< "$1" )"
}


# ---------------------- STANDARD AND USER DEFINED FUNCTIONS ------------
# params
# { string } format string %d%m...
_date() {
    local defaults=(
        [0]="%a-%d-%m-%Y"
        [1]="%Y%m%d"
        [2]="%d%m%y"
        [3]="%a%d%m%Y"
    )
    echo "$(date +"${defaults[2]}")"
}

main "$@"
