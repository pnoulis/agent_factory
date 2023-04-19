#!/usr/bin/make

# Make and Shell behavior
SHELL = /usr/bin/bash
.DELETE_ON_ERROR:
.DEFAULT_GOAL := all

SRCDIR = /home/pnoul/projects/work/agent_factory

# git modules
GITMODULES = ./core/afmachine ./ui/react_utils ./ui/afadmin_client \
./lib/mqtt_proxy ./lib/js_utils


.PHONY: all
all:
	@echo Supply recipie to run.

# ------------------------------ SETUP ------------------------------ #
.PHONY: setup

setup:
	npm install

# ------------------------------ BUILD ------------------------------ #
.PHONY: build build-dev build-staging build-prod
build: build-dev

build-dev:
	@for gitmodule in $(GITMODULES); do \
		make -C "$$gitmodule" build; \
	done
	cp -r ./ui/afadmin_client/dist .

build-staging:
	@for gitmodule in $(GITMODULES); do \
		make -C "$$gitmodule" build-staging; \
	done
	cp -r ./ui/afadmin_client/dist .

build-prod:
	@for gitmodule in $(GITMODULES); do \
		make -C "$$gitmodule" build-prod; \
	done
	cp -r ./ui/afadmin_client/dist .

# ------------------------------ CLEAN ------------------------------ #
.PHONY: clean distclean

clean:
	rm -rdf build dist
	@for gitmodule in $(GITMODULES); do \
		make -C "$$gitmodule" clean; \
	done

distclean: clean
	rm -rdf ./node_modules package-lock.json
	@for gitmodule in $(GITMODULES); do \
		make -C "$$gitmodule" distclean; \
	done
