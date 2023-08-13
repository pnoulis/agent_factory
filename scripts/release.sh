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
commit='d613833cd43daea9808bd3a38129c237fa1f1607' 
# Author: pavlos noulis <pavlos.noulis@gmail.com>
# Date:   Sun Aug 13 20:53:36 2023 +0300
# Makefile NODE was tied to version v20.4.0, it has been now switched to the node currently installed in the system
echo $JS_UTILS
ensureAtCommit $JS_UTILS $commit || die
cd $JS_UTILS
make build mode=production || die 'Failed to build'

# react utils at:
commit='7a0289b1461ea0ae94afa62639769c35930099d3'
# Author: pavlos noulis <pavlos.noulis@gmail.com>
# Date:   Mon Aug 7 07:53:18 2023 +0300
# inputs/TextArea
echo $REACT_UTILS
ensureAtCommit $REACT_UTILS $commit || die
make build mode=production || die 'Failed to build'

# mqtt_proxy at:
commit='205be884b41f94b8ba0ff364bbde1e41ac417156'
# Author: pnoul <pavlos.noulis@gmail.com>
# Date:   Tue Jul 18 09:04:27 2023 +0300
# removed unnecessary packages
echo $MQTT_PROXY
ensureAtCommit $MQTT_PROXY $commit || die
cd $MQTT_PROXY
make build mode=production || 'Failed to build'

# Afmachine at:
commit='8ca80fbd6052b80641c436d4a732d2f60e48185b'
# Author: pnoul <pavlos.noulis@gmail.com>
# Date:   Mon Aug 7 16:47:15 2023 +0300
# cashout console.log not outping
echo $AFMACHINE
ensureAtCommit $AFMACHINE $commit || die
cd $AFMACHINE
make build mode=production || 'Failed to build'

# afadmin_client at:
commit='9fed525255d6afad19d9ece7acaf1883c873af8a'
# Author: pavlos noulis <pavlos.noulis@gmail.com>
# Date:   Sun Aug 13 20:28:22 2023 +0300
# agent_factory now uses M4 preprocessor to conditionally import either an MQTT_CLIENT_LIB fit for a browser runtime or one for a nodejs runtime
echo $AFADMIN_CLIENT
ensureAtCommit $AFADMIN_CLIENT $commit || die
cd $AFADMIN_CLIENT
make build mode=production || 'Failed to build'

# Backend at:
commit='8f64fca25ec13f0a40b187ee005f51cba5eb01e4'
# Author: Pavlos Kapoutsis <pavloskapoutsis@gmail.com>
# Date:   Sat Aug 5 19:14:18 2023 +0300
# color game init
echo $BACKEND
ensureAtCommit $BACKEND $commit || die

# Thomas at:
# The ui/thomas source tree is not a git repository within the agent_factory
# superproject structure.
# echo $THOMAS
# cd $THOMAS
# make build || die 'Failed to build'
