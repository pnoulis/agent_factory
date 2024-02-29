#!/usr/bin/env bash

scriptdir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)
srcdir="$(dirname -- "$scriptdir")"

declare -A FILENAMES=()

echo scriptdir: $scriptdir
echo srcdir: $srcdir


components=$(realpath ${srcdir}/src/components)
echo components:$components
while IFS= read -r path; do
  realpath --relative-to="$path" "$components"
done < <(grep -rin '#components' ${srcdir}/src | cut -d':' -f1)


# grep -rin 'components' ${srcdir}/src | cut -d ':' -f1
