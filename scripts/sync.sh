#!/usr/bin/env bash

# This script copies does not sync (Δ) files.
# If the _destination_ contains a resource identically named with
# the one being transmitted, then the _source_ resource overwrites the
# _destination_ resource.

resource=$1
afserver=Mindtrap@afserver.local:C/laragon/www/administration

scp $resource $afserver
