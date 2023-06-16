#!/bin/bash

die() {
    (( $# > 0 )) && echo "$@" >&2
    echo Failed release! >&2
    exit 1
}

if [ -z "${CALLED_BY_MAKE:-}" ]; then
    echo "THIS SCRIPT SHOULD BE CALLED THROUGH MAKE";
    exit 1
fi

readonly EXECDIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)

# Change into agent_factory/
cd $SRCDIR

# current version
PREV_VERSION=$PKG_VERSION
echo current version $PKG_VERSION

# next version
NEXT_VERSION=
echo 'next version bump segment ->'
select vsegment in "major" "minor" "patch"; do
    case $vsegment in
        major)
            NEXT_VERSION="$(./scripts/bumpve.sh -cM $PREV_VERSION)"
            break
            ;;
        minor)
            NEXT_VERSION="$(./scripts/bumpve.sh -cm $PREV_VERSION)"
            break
            ;;
        patch)
            NEXT_VERSION="$(./scripts/bumpve.sh -cp $PREV_VERSION)"
            break
            ;;
    esac
done

echo $NEXT_VERSION
automated_release_message="[AUTOMATED RELEASE] $(date "+%A_%d_%B_%Y_%k:%M")"

# Next package.json
cat $SRCDIR/package.json | sed -E "s/version.*/version: \"$NEXT_VERSION\",/" > $SRCDIR/tmp/next.package.json

# Next PACKAGE
cat $SRCDIR/PACKAGE | sed -E "s/PKG_VERSION=.*/PKG_VERSION=$NEXT_VERSION/" > $SRCDIR/tmp/next.PACKAGE

# Next CHANGELOG
NEXT_CHANGELOG=$SRCDIR/tmp/next.CHANGELOG
cat $SRCDIR/CHANGELOG > $NEXT_CHANGELOG

# Header
cat <<EOF >> $NEXT_CHANGELOG
--------------------------------------------------------------------------------
$automated_release_message
$PREV_VERSION -> $NEXT_VERSION
EOF

# JS_UTILS
cat <<EOF >> $NEXT_CHANGELOG

JS_UTILS
$JS_UTILS
EOF
cd $JS_UTILS
git remote --verbose >> $NEXT_CHANGELOG
git log -n 1 >> $NEXT_CHANGELOG

# REACT_UTILS
cat <<EOF >> $NEXT_CHANGELOG

REACT_UTILS
$REACT_UTILS
EOF
cd $REACT_UTILS
git remote --verbose >> $NEXT_CHANGELOG
git log -n 1 >> $NEXT_CHANGELOG

# AFMACHINE
cat <<EOF >> $NEXT_CHANGELOG

AFMACHINE
$AFMACHINE
EOF
cd $AFMACHINE
git remote --verbose >> $NEXT_CHANGELOG
git log -n 1 >> $NEXT_CHANGELOG

# MQTT_PROXY
cat <<EOF >> $NEXT_CHANGELOG

MQTT_PROXY
$MQTT_PROXY
EOF
cd $MQTT_PROXY
git remote --verbose >> $NEXT_CHANGELOG
git log -n 1 >> $NEXT_CHANGELOG

# AFADMIN_CLIENT
cat <<EOF >> $NEXT_CHANGELOG

AFADMIN_CLIENT
$AFADMIN_CLIENT
EOF
cd $AFADMIN_CLIENT
git remote --verbose >> $NEXT_CHANGELOG
git log -n 1 >> $NEXT_CHANGELOG

# BACKEND
cat <<EOF >> $NEXT_CHANGELOG

BACKEND
$BACKEND
EOF
cd $BACKEND
git remote --verbose >> $NEXT_CHANGELOG
git log -n 1 >> $NEXT_CHANGELOG
