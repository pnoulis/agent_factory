#!/usr/bin/env bash

# checkVersions.sh
#
# Collects all dependencies of $modules across agent_factory
# into one file, sorted alphabetically into a list.
#
# This script was designed with the purpose of adjusting all modules to the same
# version of a shared dependency whenever that is possible so that npm-install
# across the workspace does not bloat node_modules with multiple versions of the
# same library.

# It is also useful in general for checking the state of agent_factory

PKGDIR=$(cd -- "$(dirname "$(dirname -- "${BASH_SOURCE[0]}")")" 2>/dev/null && pwd)
logfile=${PKGDIR}/checkVersions.log
tmplog=$(mktemp --quiet)
modules=(
    ${PKGDIR}/ui/afadmin_new_client.git
    ${PKGDIR}/ui/react_utils
    ${PKGDIR}/ui/react-action-router
    ${PKGDIR}/lib/js_utils
    ${PKGDIR}/lib/mqtt_proxy
    ${PKGDIR}/core/afmachine
    ${PKGDIR}/shared
)

main() {
    rm $logfile 2>/dev/null
    for i in ${modules[@]}; do
        basename=${i##*/}
        cat $i/package.json \
            | jq '.dependencies, .devDependencies, .peerDependencies' \
            | jq -s add \
            | sed 's/[{}]\|[[:space:]]\|"\|,//g' \
            | sed '/^$/d' \
            | awk -v module=$basename '{print $1 "  " module}' >> $tmplog
    done

    cat $tmplog | sort -d | sponge -a $logfile
    rm $tmplog
    cat $logfile
}

main "$@"
