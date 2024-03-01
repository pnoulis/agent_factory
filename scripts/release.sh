#!/usr/bin/env bash

function isGitClean() {
    # input validation
    ## 1. one parameter has been provided
    [[ $# -eq 0 ]] && {
        echo isGitClean
        echo Wrong number of arguments
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
        echo isGitClean
        echo "$1"
        echo No such file or directory
        return 1
    }


    # check
    pushd "$tpath" > /dev/null
    ## 1. provided argument is a path repository
    {
        git status >& /dev/null
    } || {
        echo isGitClean
        echo "$tpath"
        echo Not a git repository
        return 1
    }
    ## 2. working directory is clean
    [ -n "$(git status --porcelain)" ] && {
        echo isGitClean
        echo "$tpath"
        echo working directory is dirty
        popd > /dev/null
        return 1
    }
    popd > /dev/null
    return 0
}

gitNoUnpushedCommits() {
    # input validation
    ## 1. one parameter has been provided
    [[ $# -eq 0 ]] && {
        echo gitNoUnpushedCommits
        echo Wrong number of arguments
        return 1
    }

    ## 2. that paremeter is not an empty string
    [ -z "$1" ] && {
        echo gitNoUnpushedCommits
        echo Null string
        return 1
    }

    # make sure:
    ## 1. is a path
    ## 2. all nodes exist
    ## 3. expand path
    {
        local tpath=$(realpath -qe "$1")
    } || {
        echo gitNoUnpushedCommits
        echo "$1"
        echo No such file or directory
        return 1
    }


    # check
    pushd "$tpath" > /dev/null
    ## 1. provided argument is a git repository
    {
        git status >& /dev/null
    } || {
        echo gitNoUnpushedCommits
        echo "$tpath"
        echo Not a git repository
        return 1
    }

    [[ "$(git status --short --branch --porcelain)" =~ ahead[[:space:]][0-9]+ ]] && {
        echo gitNoUnpushedCommits
        echo "$tpath"
        echo Unpushed commits
        return 1
    }
    popd >/dev/null

    return 0
}

ensureOnBranch() {
  # input validation
  ## 1. parameters have been provided
  [[ $# -ne 2 ]] && {
    echo ensureOnBranch
    echo Wrong number of arguments
    return 1
  }

  ## 2. that paremeters are not the empty string
  [[ -z "$1"  || -z "$2" ]] && {
    echo ensureOnBranch
    echo Wrong parameter syntax
    return 1
  }

  # Move into repo
  local tpath=$(realpath -qe "$1")
  pushd "$tpath" > /dev/null

  [[ "$(git rev-parse --abbrev-ref HEAD)" != "$2" ]] && {
    echo ensureOnReleaseBranch
    echo Not on "$2" branch
    return 1
  }

  popd >/dev/null
  return 0
}


# ensureOnBranch $srcdir_top 'master' || exit 1
# isGitClean || exit 1
# gitNoUnpushedCommits $srcdir_top || exit 1
prev_version=$pkg_version

echo $prev_version

select vsegment in 'major' 'minor' 'patch'; do
  case $vsegment in
    major)
      next_v="$($bumpve -cM $prev_version)"
      break
      ;;
    minor)
      next_v="$($bumpve -cm $prev_version)"
      break
      ;;
    patch)
      next_v="$($bumpve -cp $prev_version)"
      break
      ;;
  esac
done

echo $next_v


releaseId="[v$next_v] $(date "+%A %d %B %Y %k:%M:%S")"

echo $releaseId

# ## package.json
# jq ".version = \"$next_v\"" package.json > package.json

# ## Release
