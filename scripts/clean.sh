#!/usr/bin/env bash

scriptdir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)
srcdir="$(dirname -- "$scriptdir")"

declare -A FILENAMES=()

echo scriptdir: $scriptdir
echo srcdir: $srcdir


cd $srcdir

npx eslint $srcdir/src | grep 'no-unused-vars'
