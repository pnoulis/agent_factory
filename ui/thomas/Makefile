#!/usr/bin/make

# Make and Shell behavior
SHELL = /usr/bin/bash
.DELETE_ON_ERROR:
.DEFAULT_GOAL := all
.ONESHELL:

PKG_DISTNAME=thomas-v0.1.0
NVM_DIR=$(HOME)/.nvm

.PHONY: all
all: release

# ------------------------------ RELEASE ------------------------------ #
.PHONY: release
release: $(PKG_DISTNAME).tar.gz
	@echo released $(PKG_DISTNAME)!

$(PKG_DISTNAME).tar.gz:
	tar -cvaf $(PKG_DISTNAME).tar.gz --show-transformed-names \
	--transform='s/build/gameplay/' build


.PHONY: build
build: node
	source $(NVM_DIR)/nvm.sh
	nvm use v16.20.0
	npm install
	nvm exec v16.20.0 npm run build --mode=production


.PHONY: node
node:
	source $(NVM_DIR)/nvm.sh
	nvm current
	@if [[ ! "$(nvm current)" =~ "v16\.20" ]]; then \
		echo 'installing node v16.20 for thomas'; \
		nvm install v16.20.0; \
	else \
		echo 'node v16.20 is installed'; \
	fi

.PHONY: nvm-path
nvm-path:
	source $(NVM_DIR)/nvm.sh
