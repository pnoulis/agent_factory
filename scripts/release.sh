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
source ${SRCDIR}/scripts/git_utils.sh

for submodule in $BACKEND \
                     $AFADMIN_CLIENT \
                     $REACT_UTILS \
                     $JS_UTILS \
                     $MQTT_PROXY \
                     $AFMACHINE; do
    cd $submodule
    isGitClean $submodule || die $submodule
    gitNoUnpushedCommits $submodule || die $submodule
    ensureBranchExists $submodule "release" || die $submodule
    ensureOnBranch $submodule "release" || {
        git switch release
    }
    cd $SRCDIR
done


# Make sure that every submodule points to the release commit
# ORDER OF make build is important

# js_utils at:
commit='ffa84ae2c5165ecce9bcebac3d9495c2441151d9'
# Author: pnoul <pavlos.noulis@gmail.com>
# Date:   Tue May 23 17:10:31 2023 +0300
# [fix] ConsoloLogger was failing to instantiate if no arguments provided
echo $JS_UTILS
ensureAtCommit $JS_UTILS $commit || die
cd $JS_UTILS
make build || die 'Failed to build'

# react utils at:
commit='fa7bfd105c12a1d462c109b66f133749fbc604d2'
# Author: pnoul <pavlos.noulis@gmail.com>
# Date:   Fri May 19 17:06:42 2023 +0300
# SelectOnlyCombobox default value
echo $REACT_UTILS
ensureAtCommit $REACT_UTILS $commit || die
make build || die 'Failed to build'

# mqtt_proxy at:
commit='5ed10e16927d2f776fb6dca52b2a45b60e470506'
# Author: pavlos noulis <pavlos.noulis@gmail.com>
# Date:   Thu May 11 00:29:09 2023 +0300
# git ignores emacs hidden temporary files
echo $MQTT_PROXY
ensureAtCommit $MQTT_PROXY $commit || die
cd $MQTT_PROXY
make build || 'Failed to build'

# Afmachine at:
commit='cc7bd416b8903c29f1a54477bc9e400533cb4cad'
# Author: pnoul <pavlos.noulis@gmail.com>
# Date:   Mon Jun 19 11:08:17 2023 +0300
# Running in production mode calls the developments configuration preset
echo $AFMACHINE
ensureAtCommit $AFMACHINE $commit || die
cd $AFMACHINE
make build || 'Failed to build'

# afadmin_client at:
commit='60147c900452f3c9b449ef3956c5258bb4a43a67'
# Author: pnoul <pavlos.noulis@gmail.com>
# Date:   Mon Jun 19 10:56:33 2023 +0300
# Mqtt server address in production
echo $AFADMIN_CLIENT
ensureAtCommit $AFADMIN_CLIENT $commit || die
cd $AFADMIN_CLIENT
make build || 'Failed to build'

# Backend at:
commit='c5b6838a3fd96ef1362938d15b85e5cd4b494d4f'
# Author: Pavlos Kapoutsis <pavloskapoutsis@gmail.com>
# Date:   Fri May 19 12:50:37 2023 +0300
# --
echo $BACKEND
ensureAtCommit $BACKEND $commit || die

# Thomas at:
# The ui/thomas source tree is not a git repository within the agent_factory
# superproject structure.
echo $THOMAS
cd $THOMAS
make build || die 'Failed to build'
