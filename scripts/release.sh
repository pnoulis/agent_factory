#!/bin/bash

die() {
    (( $# > 0 )) && echo "$@" >&2
    echo Failed release! >&2
    exit 1
}

[[ -z "${CALLED_BY_MAKE:-}" ]] && die 'This script should be invoked through make'
cd $SRCDIR

# Staging directory.
# Output is directed there until all things that could interrupt the release or
# result in an error have for the most part concluded. It ensures that the
# working directory does not get dirty with intermediate files or files left
# from an incomplete produce.
stagdir=$(mktemp -d)


# The release script tasks:
# 1. Ensuring VCS "integrity"
# 2. Bumping the version
# 3. Producing release Metadata
# 4. Producing a git tag
# 5. Pushing the release and tag

# 1. Ensuring VCS "integrity"
source scripts/git_utils.sh
for submodule in $SRCDIR $GITMODULES; do
    pushd $submodule 2>&1 >/dev/null || die "Missing submodule $submodule"
    isGitClean $submodule || die
    gitNoUnpushedCommits $submodule || die
    popd 2>&1 >/dev/null
done

# 2. Bumping the version
PREV_VERSION=$PKG_VERSION

echo -e "\n\n"
echo "Select next version ->"
select vsegment in 'major' 'minor' 'patch'; do
    case $vsegment in
        major)
            NEXT_VERSION="$(scripts/bumpve.sh -cM $PREV_VERSION)"
            break
            ;;
        minor)
            NEXT_VERSION="$(scripts/bumpve.sh -cm $PREV_VERSION)"
            break
            ;;
        patch)
            NEXT_VERSION="$(scripts/bumpve.sh -cp $PREV_VERSION)"
            break
            ;;
    esac
done

releaseId="[AUTOMATED RELEASE] $(date "+%A %d %B %Y %k:%M:%S") v$PREV_VERSION -> v$NEXT_VERSION"

# 3. Produce Metadata

## PACKAGE
sed "s/PKG_VERSION=.*/PKG_VERSION=$NEXT_VERSION/" PACKAGE > $stagdir/PACKAGE
sed -i "s/PKG_VVERSION=.*/PKG_VVERSION=v$NEXT_VERSION/" $stagdir/PACKAGE
sed -i "s/PKG_DISTNAME=.*/PKG_DISTNAME=${PKG_NAME}-v${NEXT_VERSION}/" $stagdir/PACKAGE

## CHANGELOG
cat <<EOF >> $stagdir/CHANGELOG
--------------------------------------------------------------------------------
$releaseId
EOF

cat $stagdir/CHANGELOG
for submodule in $SRCDIR $GITMODULES; do
    pushd $submodule 2>&1 >/dev/null || die "Missing submodule $submodule"
    cat <<EOF >> $stagdir/CHANGELOG


$(echo ${submodule##*/} | tr [a-z] [A-Z])
$submodule
$(git remote --verbose)
$(git log -n 1)
EOF
    popd 2>&1 >/dev/null
done

## package.json
jq ".version = \"$NEXT_VERSION\"" package.json > $stagdir/package.json

# Copy over files from $stagdir
cp $stagdir/* $SRCDIR

# Produce annotated tag
git tag -a "v$NEXT_VERSION"

# Commit release
git add .
git commit -m "[AUTOMATED_RELEASE]"

