echoerr() { echo "$@" 1>&2; }
#
# @params {number} $1 - The intended number of arguments
# @params {...} $2..n - The arguments
#
validateArgumentsLength() {
    # Assign $1 to each own variable
    nArgs=$1
    # Remove the 1st element of $@
    shift 1
    # $@ now contains only the arguments

    [[ $# -ne $nArgs ]] && {
        echoerr validateArgumentsLength
        echoerr Wrong number of arguments
        return  1
    }
    return 0
}

#
# Validate string is not the empty string
#
# @params {string} $1
noEmptyString() {
    [ -z "$1" ] && {
        echoerr noEmptyString
        echoerr empty string
        return 1
    }
    return 0
}

function isGitDir() {
    # input validation
    ## 1. one parameter has been provided
    [[ $# -eq 0 ]] && {
        echoerr isGitDir
        echoerr Wrong number of arguments
        return  1
    }

    ## 2. that paremeter is not an empty string
    [ -z "$1" ] && {
        echoerr isGitDir
        echoerr Null string
        return 1
    }

    # make sure:
    ## 1. is a path
    ## 2. all nodes exist
    ## 3. expand path
    {
        local tpath=$(realpath -qe "$1")
    } || {
        echoerr isGitDir
        echoerr "$1"
        echoerr No such file or directory
        return 1
    }

    # check cwd is a git repo
    pushd "$tpath" > /dev/null
    {
        git status >& /dev/null
    } || {
        echoerr isGitDir
        echoerr "$tpath"
        echoerr Not a git repository
        return 1
    }
    popd > /dev/null
    return 0
}

function isGitClean() {
    # input validation
    ## 1. one parameter has been provided
    [[ $# -eq 0 ]] && {
        echoerr isGitClean
        echoerr Wrong number of arguments
        return 1
    }

    ## 2. that paremeter is not an empty string
    [ -z "$1" ] && {
        return 1
    }

    # make sure:
    ## 1. is a path
    ## 2. all nodes exist
    ## 3. expand path
    {
        local tpath=$(realpath -qe "$1")
    } || {
        echoerr isGitClean
        echoerr "$1"
        echoerr No such file or directory
        return 1
    }


    # check
    pushd "$tpath" > /dev/null
    ## 1. provided argument is a path repository
    {
        git status >& /dev/null
    } || {
        echoerr isGitClean
        echoerr "$tpath"
        echoerr Not a git repository
        return 1
    }
    ## 2. working directory is clean
    [ -n "$(git status --porcelain)" ] && {
        echoerr isGitClean
        echoerr "$tpath"
        echoerr working directory is dirty
        popd > /dev/null
        return 1
    }
    popd > /dev/null
    return 0
}

#
#  @return {integer} 0 or 1
#   0 - no unpushed commits
#   1 - error or pushed commits
#
gitNoUnpushedCommits() {
    # input validation
    ## 1. one parameter has been provided
    [[ $# -eq 0 ]] && {
        echoerr gitNoUnpushedCommits
        echoerr Wrong number of arguments
        return 1
    }

    ## 2. that paremeter is not an empty string
    [ -z "$1" ] && {
        echoerr gitNoUnpushedCommits
        echoerr Null string
        return 1
    }

    # make sure:
    ## 1. is a path
    ## 2. all nodes exist
    ## 3. expand path
    {
        local tpath=$(realpath -qe "$1")
    } || {
        echoerr gitNoUnpushedCommits
        echoerr "$1"
        echoerr No such file or directory
        return 1
    }


    # check
    pushd "$tpath" > /dev/null
    ## 1. provided argument is a git repository
    {
        git status >& /dev/null
    } || {
        echoerr gitNoUnpushedCommits
        echoerr "$tpath"
        echoerr Not a git repository
        return 1
    }

    [[ "$(git status --short --branch --porcelain)" =~ ahead[[:space:]][0-9]+ ]] && {
        echoerr gitNoUnpushedCommits
        echoerr "$tpath"
        echoerr Unpushed commits
        return 1
    }
    popd >/dev/null

    return 0
}

ensureOnBranch() {
    # input validation
    ## 1. parameters have been provided
    [[ $# -ne 2 ]] && {
        echoerr ensureOnBranch
        echoerr Wrong number of arguments
        return 1
    }

    ## 2. that paremeters are not the empty string
    [[ -z "$1"  || -z "$2" ]] && {
        echoerr ensureOnBranch
        echoerr Wrong parameter syntax
        return 1
    }

    # Move into repo
    local tpath=$(realpath -qe "$1")
    pushd "$tpath" > /dev/null

    [[ "$(git rev-parse --abbrev-ref HEAD)" != "$2" ]] && {
        echoerr ensureOnReleaseBranch
        echoerr Not on "$2" branch
        return 1
    }

    popd >/dev/null
    return 0
}

ensureBranchExists() {
    validateArgumentsLength 2 $@

    local tpath=$(realpath -qe "$1")
    pushd "$tpath" > /dev/null

    git show-ref --quiet refs/heads/"$2"
    if (( $? > 0 )); then
        echoerr ensureBranchExists
        echoerr branch "$2" missing
        return 1
    fi

    popd >/dev/null
    return 0
}

ensureAtCommit() {
    validateArgumentsLength 2 $@
    local tpath=$(realpath -qe "$1")
    pushd "$tpath" > /dev/null

    atCommit="$(git rev-parse HEAD)"
    if [[ "$2" != "${atCommit:-}" ]]; then
        echoerr ensureOnCommit
        echoerr branch not at commit $2
        return 1
    fi
    popd >/dev/null
    return 0
}
