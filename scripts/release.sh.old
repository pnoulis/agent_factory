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
                     $REACT_ACTION_ROUTER \
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
commit='c25792602e47b360aacf31688d7c686d7aecc114'
# Author: pnoul <pavlos.noulis@gmail.com>
# Date:   Fri Sep 15 16:59:22 2023 +0300
# filterObject
echo $JS_UTILS
ensureAtCommit $JS_UTILS $commit || {
    git log -n 1
    die
}
cd $JS_UTILS
make build mode=production || die '------------------------------ FAILED BUILD ' $JS_UTILS
echo '------------------------------ SUCCESS BUILD ' $JS_UTILS

# react utils at:
commit='64d8ca64d503f0bba8daa5e6b2008ed00a63285d'
# Author: pavlos noulis <pavlos.noulis@gmail.com>
# Date:   Tue Sep 19 05:59:55 2023 +0300
# removed console.log statements
echo $REACT_UTILS
ensureAtCommit $REACT_UTILS $commit || {
    git log -n 1
    die
}
cd $REACT_UTILS
make build mode=production || die '------------------------------ FAILED BUILD ' $REACT_UTILS
echo '------------------------------ SUCCESS BUILD ' $REACT_UTILS

# mqtt_proxy at:
commit='8b60f80d4a98964a5f6eec0dec204464b0852766'
# Author: pnoul <pavlos.noulis@gmail.com>
# Date:   Tue Sep 12 14:28:57 2023 +0300
# All dependencies updated to latest version
echo $MQTT_PROXY
ensureAtCommit $MQTT_PROXY $commit || {
    git log -n 1
    die
}
cd $MQTT_PROXY
make build mode=production || die '------------------------------ FAILED BUILD ' $MQTT_PROXY
echo '------------------------------ SUCCESS BUILD ' $MQTT_PROXY

# Afmachine at:
commit='eca4b63c02a57a4d80d80d9185b14b3d6f4460f3'
# Author: pavlos noulis <pavlos.noulis@gmail.com>
# Date:   Tue Sep 19 05:59:08 2023 +0300
# removed console.log statements
echo $AFMACHINE
ensureAtCommit $AFMACHINE $commit || {
    git log -n 1
    die
}
cd $AFMACHINE
make build mode=production || die '------------------------------ FAILED BUILD ' $AFMACHINE
echo '------------------------------ SUCCESS BUILD ' $AFMACHINE

# Backend at:
commit='557adbb763ec176e249be6eb3de662a3da6ff909'
# Author: pavlos noulis <pavlos.noulis@gmail.com>
# Date:   Tue Sep 19 02:13:01 2023 +0300
# Disabled scoreboard scheduled task at ScheduleTasksService.java
echo $BACKEND
ensureAtCommit $BACKEND $commit || {
    git log -n 1
    die
}

# react-action-router at:
commit='b7ff2f2567ee73371d737519303fdd7169536245'
# Author: pavlos noulis <pavlos.noulis@gmail.com>
# Date:   Tue Sep 19 06:26:23 2023 +0300
# make distclean
echo $REACT_ACTION_ROUTER
ensureAtCommit $REACT_ACTION_ROUTER $commit || {
    git log -n 1
    die
}
cd $REACT_ACTION_ROUTER
make build mode=production || die '------------------------------ FAILED BUILD ' $REACT_ACTION_ROUTER
echo '------------------------------ SUCCESS BUILD ' $REACT_ACTION_ROUTER

# afadmin_client at:
commit='8b705dd9f5eb182a553e68a72fb5c91de5ed1000'
# Author: pavlos noulis <pavlos.noulis@gmail.com>
# Date:   Tue Sep 19 06:01:23 2023 +0300
# removed console.log and debug statements
echo $AFADMIN_CLIENT
ensureAtCommit $AFADMIN_CLIENT $commit || {
    git log -n 1
    die
}
cd $AFADMIN_CLIENT
make build mode=production || die '------------------------------ FAILED BUILD ' $AFADMIN_CLIENT
echo '------------------------------ SUCCESS BUILD ' $AFADMIN_CLIENT

# Thomas at:
# The ui/thomas source tree is not a git repository within the agent_factory
# superproject structure.
# echo $THOMAS
# cd $THOMAS
# make build || die 'Failed to build'
