#!/usr/bin/env bash

scriptdir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)
srcdir="$(dirname -- "$scriptdir")"

declare -A FILENAMES=()

echo scriptdir: $scriptdir
echo srcdir: $srcdir

while IFS= read -r -d $'\0' path; do
  filename="${path%.*}" # remove extension
  filename="${filename##*/}" # remove all path segments except last
  grep -riq "import.*$filename" ${srcdir}/src
  if [[ "$?" == 1 ]]; then
    FILENAMES["$path"]=1
  fi

  # grep --exclude-dir=backend --exclude-dir=.git --exclude-dir=tests --exclude-dir=node_modules -riq "import.*$filename" ${srcdir}
  # if [[ "$?" == 1 ]]; then
  #   FILENAMES["$path"]=1
  # fi
done < <(find ${srcdir}/src -mindepth 1 -iname 'mysqldb' -prune -o -iname 'getaf*' -prune -o -print0)


for path in "${!FILENAMES[@]}"; do
  printf "%s\n" "$path"
  rm -rf "$path"
done
