#!/usr/bin/make

# Make and Shell behavior
SHELL = /usr/bin/bash
.DELETE_ON_ERROR:
.DEFAULT_GOAL := all

SRCDIR = /home/pnoul/projects/work/agent_factory

# git modules
GITMODULES = ./core/afmachine ./ui/react_utils ./ui/afadmin_client \
./lib/mqtt_proxy ./lib/js_utils
ONCHANGE = npx onchange


.PHONY: all
all:
	@echo yolo


# ------------------------------ SETUP ------------------------------ #
.PHONY: setup

setup:
	npm install

# ------------------------------ WATCH ------------------------------ #
.PHONY: watch watch-dev watch-staging watch-prod
watch: watch-dev

watch-dev:
	$(ONCHANGE) -f change -d 3000 -v --await-write-finish 3000 'lib/js_utils/src/**/*' \
	-- make -C lib/js_utils build-dev

.PHONY: stop
stop:
	kill $(pgrep -f '$(ONCHANGE)')

# ------------------------------ BUILD ------------------------------ #
.PHONY: build build-dev build-staging build-prod
build: build-dev

build-dev:
	@for gitmodule in $(GITMODULES); do \
		make -C "$$gitmodule" build; \
	done

build-staging:
	@for gitmodule in $(GITMODULES); do \
		make -C "$$gitmodule" build-staging; \
	done

build-prod:
	@for gitmodule in $(GITMODULES); do \
		make -C "$$gitmodule" build-prod; \
	done

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
