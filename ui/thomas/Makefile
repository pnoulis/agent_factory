#!/usr/bin/make

# Make and Shell behavior
SHELL = /usr/bin/bash
.DELETE_ON_ERROR:
.DEFAULT_GOAL := all

PKG_DISTNAME=thomas-v0.1.0


.PHONY: all
all: release

# ------------------------------ RELEASE ------------------------------ #
.PHONY: release
release: $(PKG_DISTNAME).tar.gz
	@echo released $(PKG_DISTNAME)!

$(PKG_DISTNAME).tar.gz:
	tar -cvaf $(PKG_DISTNAME).tar.gz --show-transformed-names \
	--transform='s/build/gameplay/' build


