#!/usr/bin/env bash

scriptdir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)
srcdir="$(dirname -- "$scriptdir")"

declare -A FILENAMES=()

echo scriptdir: $scriptdir
echo srcdir: $srcdir


components=$(realpath ${srcdir}/src/afmachine)
echo components:$components
while IFS= read -r path; do
  echo $path
  relative_components="$(realpath --relative-to="$(dirname "$path")" "$components")"
  if [[ $relative_components == 'afmachine' ]]; then
    relative_components="./${relative_components}"
  fi
  echo relative_components:$relative_components
  sed -i "s|#afm|$relative_components|gi" "$path"
done < <(grep -rin '#afm' ${srcdir}/src | cut -d':' -f1 | uniq)


# grep -rin 'components' ${srcdir}/src | cut -d ':' -f1
