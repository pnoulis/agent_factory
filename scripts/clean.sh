#!/usr/bin/env bash

scriptdir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)
srcdir="$(dirname -- "$scriptdir")"

declare -A FILENAMES=()

echo scriptdir: $scriptdir
echo srcdir: $srcdir



"{"merge":"","group party":"","live view":"","scoreboard":"","administration":"","pair wristband":"","players":"","cashout cashier":"","cashiers":"","devices":"","register cashier":"","top 10":"","yolo":"","no":"","yes":"","name":"","status":"","packages":"","active package type":"","active package amount":"","active package remainder":"","active package start time":"","points":"","played":"","won":"","lost":"","created":"","id":"","username":"","email":"","role":"","type":"","room":"","view":"","surname":"","state":"","list devices":"","list players with wristband":"","list teams":"","list scoreboard":"","login cashier":"","list session":"","successfully logged in cashier":"","undefined":"","nok backend api response":"","bad credentials":"","merge team":"","not enough players":"","find team":"","search player":"","fullname":"","rfid":"","color":"","t_start":"","t_end":"","cost":"","remainder":"","amount":"","merge group party":"","could not locate cashier in storage":"","stop session":"","successfully stopped session":"","start session":"","successfully started session":"","list players":"","successfully registered new player":"","remove player":"","pair player's wristband":"","scan wristband":"","register wristband":"","successfully registered wristband to player":"","register team":"","successfully registered team":"","todays team":"","pair wristbands":"","list packages":"","add package":"","list team packages":"","team does not have any packages!":"","team package":"","add team package":"","remove package":"","activate team":"","remove team package":"","start team":"","cannot remove a completed package":"","group party teams cannot change their roster":"","roster":""}"
components=$(realpath ${srcdir}/assets)
echo components:$components
while IFS= read -r path; do
  echo $path
  relative_components="$(realpath --relative-to="$(dirname "$path")" "$components")"
  if [[ $relative_components == 'afmachine' ]]; then
    relative_components="./${relative_components}"
  fi
  echo relative_components:$relative_components
  # sed -i "s|#afm|$relative_components|gi" "$path"
done < <(grep -rin '#assets' ${srcdir}/src | cut -d':' -f1 | uniq)


# grep -rin 'components' ${srcdir}/src | cut -d ':' -f1
