#!/usr/bin/env bash

scriptdir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)
srcdir="$(dirname -- "$scriptdir")"

declare -A FILENAMES=()

echo scriptdir: $scriptdir
echo srcdir: $srcdir


cd $srcdir/src


grep -rin 'cmd\.msg =' | cut -d':' -f1 | xargs -I {} sed -i 's/cmd\.msg =/cmd\.res\.msg =/gi' {}
