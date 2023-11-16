#!/usr/bin/make

# Make and Shell behavior
SHELL = /usr/bin/bash
.DELETE_ON_ERROR:
.DEFAULT_GOAL := all

# Critical Paths
SRCDIR := .
LOGDIR := var/log
BUILDIR := $(SRCDIR)/build
DISTDIR := $(SRCDIR)/dist
# Monorepo dirs
AGENT_FACTORY := $(SRCDIR)/..
# preset environment dirs
ENVDIRS = $(SRCDIR)/env

# Programs
INSTALL = /usr/bin/install
MKDIRP = /usr/bin/mkdir -p
SORT = /usr/bin/sort
CP = /usr/bin/cp
RM = /usr/bin/rm
CHMOD = /usr/bin/chmod
INTERPRETER = node
BUNDLER = npx vite
TESTER = npx vitest
LINTER = npx eslint
FORMATER = npx prettier
DOTENV = ~/bin/dotenv
PRETTY_OUTPUT = npx pino-pretty
LOADENV = set -o allexport; source .env

ENVARS = RUNTIME=node

.PHONY: all
all: build
.EXPORT_ALL_VARIABLES:

# ------------------------------ RUN ------------------------------ #
.PHONY: run
run: mode := 'development'
run: file := '$(SRCDIR)/tmp/scratch.js'
run: env
	$(LOADENV) && \
	$(INTERPRETER) $(file) \
	| $(PRETTY_OUTPUT)

.PHONY: scratch
scratch: mode ?= 'development'
scratch: RUNTIME ?= node
scratch: ENVARS := $(ENVARS);BUNDLED=false
scratch: env
	$(LOADENV) && $(INTERPRETER) ./tmp/scratch.js

.PHONY: run-build
run-build:
	@set -a; source ./.env && \
	$(INTERPRETER) ./dist/index.js \
	| $(PRETTY_OUTPUT)

# ------------------------------ DEV ------------------------------ #
.PHONY: dev
dev: mode := 'development'
dev: env
	set -a; source ./.env && \
	$(BUNDLER) server --mode=$(mode)

# ------------------------------ BUILD ------------------------------ #
.PHONY: build
build: mode := 'production'
build: env
	set -a; source ./.env && \
	$(BUNDLER) build --mode=$(mode)

# ------------------------------ TEST ------------------------------ #
.PHONY: test
test: mode := 'testing'
test: suite := *
test: env
	set -a; source ./.env && \
	$(TESTER) run --reporter='verbose' --mode=$(mode) $(suite)

# ------------------------------ LINT ------------------------------ #
.PHONY: lint
lint: file := '.'
lint:
	$(LINTER) --ext js,jsx --fix $(file)

.PHONY: lint-check
lint-check: file := '.'
lint-check:
	$(LINTER) --ext js,jsx $(file)

# ------------------------------ FORMAT ------------------------------ #
.PHONY: fmt
fmt: file := '.'
fmt:
	$(FORMATER) --write $(file)

.PHONY: fmt-check
fmt-check: file := '.'
fmt-check:
	$(FORMATER) --check $(file)

# ------------------------------ CLEAN ------------------------------ #
.PHONY: clean distclean
clean:
	rm -rdf dist build

distclean: clean
	rm -rdf node_modules package-lock.json

# ------------------------------ ENV ------------------------------#
.PHONY: env env-dry
env: mode ?= 'development'
env: ENVARS := RUNTIME=$(RUNTIME);$(ENVARS)
env:
	$(DOTENV) --mode=$(mode) \
	--environment='$(ENVARS)' $(ENVDIRS) \
	| $(SORT) > $(SRCDIR)/.env

env-dry:
	$(DOTENV) --mode=$(mode) --environment='$(ENVARS)' $(ENVDIRS) | $(SORT)

# ------------------------------ VARIOUS ------------------------------ #

.PHONY: mqtt
mqtt:
	m4 -D RUNTIME=$(RUNTIME) ./utils/macros.m4 ./clients/mqtt.js.m4 > ./clients/mqtt.js
