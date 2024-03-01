#!/usr/bin/env bash

# This script is designed to be invoked through the Makefile
#
# Example:
# make run file=scripts/release.sh
#
# OR:
# make release

# The versions and release id
prev_v=$pkg_version
next_v=
release_id=

main() {
  # Dependencies
  exit_if_empty pkg_version 'Missing \$pkg_version'
  exit_if_empty srcdir_top 'Missing \$srcdir_top'
  exit_if_empty bumpve 'Missing \$bumpve'
  exit_if_empty jq 'Missing \$jq'
  exit_if_empty configfile 'Missing \$configfile'
  exit_if_empty releasefile 'Missing \$releasefile'
  exit_if_empty pkgjsonfile 'Missing \$pkgjsonfile'

  ensureOnBranch $srcdir_top 'master' || exit 1
  isGitClean $srcdir_top || exit 1
  gitNoUnpushedCommits $srcdir_top || exit 1
  bump_version
  make_release_id
  update_release_file
  update_config_file
  update_packagejson_file
  tag_git
  commit_git
}

bump_version() {
  select vsegment in 'major' 'minor' 'patch'; do
    case $vsegment in
      major)
        next_v="$($bumpve -cM $prev_v)"
        break
        ;;
      minor)
        next_v="$($bumpve -cm $prev_v)"
        break
        ;;
      patch)
        next_v="$($bumpve -cp $prev_v)"
        break
        ;;
    esac
  done
}

make_release_id() {
  release_id="[v$next_v] $(date "+%A %d %B %Y %k:%M:%S")"
}

update_release_file() {
  echo "UPDATE RELEASE FILE|${releasefile}"
  local tmpfile=$(mktemp)

  if [[ -f $releasefile ]]; then
    cat $releasefile > $tmpfile
  fi

  printf "%s\n" "$release_id" > $releasefile
  cat $tmpfile >> $releasefile
  rm $tmpfile
}

update_config_file() {
  echo "UPDATE CONFIG FILE|${configfile}"
  sed -i "s|PKG_VERSION=$prev_v|PKG_VERSION=$next_v|g" $configfile
}

update_packagejson_file() {
  local tmpfile=$(mktemp)
  echo "UPDATE PACKAGE.JSON FILE|${pkgjsonfile}"
  $jq ".version = \"$next_v\"" $pkgjsonfile > $tmpfile
  cat $tmpfile > $pkgjsonfile
  rm $tmpfile
}

tag_git() {
  echo "TAGGING GIT|v$next_v"
  git tag -d "v$next_v"
  git tag -a "v$next_v" -m "$release_id"
}

commit_git() {
  echo "PUSHING GIT|$(git remote -v show | grep push)"
  git add .
  git commit -m "$release_id"
  git push --follow-tags
}


isGitClean() {
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

isempty() {
  local v="${!1:-}"
  if [ "$v" == "" ]; then
    return 0
  else
    return 1
  fi
}

error() {
  echo "$@"
  exit 1
}

exit_if_empty() {
  isempty $1 && error "${2:-Missing $1}"
}



main "$@"
