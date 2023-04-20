#!/usr/bin/make

# Make and Shell behavior
SHELL = /usr/bin/bash
.DELETE_ON_ERROR:
.DEFAULT_GOAL := all

# Source directories
SRCDIR := $(shell pwd)
BACKEND = $(SRCDIR)/core/backend
AFADMIN_CLIENT = $(SRCDIR)/ui/afadmin_client
REACT_UTILS = $(SRCDIR)/ui/react_utils
JS_UTILS = $(SRCDIR)/lib/js_utils
MQTT_PROXY = $(SRCDIR)/lib/mqtt_proxy
AF_MACHINE = $(SRCDIR)/core/afmachine

# Config directories
CONFDIR = $(SRCDIR)/config
AFADMIN_CLIENT_CONFDIR = $(CONFDIR)/afadmin_client

# git modules
GITMODULES = $(AFADMIN_CLIENT) $(REACT_UTILS) $(JS_UTILS) \
$(MQTT_PROXY) $(AF_MACHINE)

.PHONY: all
all:
	@echo Supply recipie to run.

# ------------------------------ SETUP ------------------------------ #
.PHONY: setup

setup: modules npm-packages

modules:
	git config --local include.path '../.gitconfig'
	git submodule update --init --recursive

npm-packages:
	npm install --workspace=js_utils
	npm install || npm install

# ------------------------------ SERVE ------------------------------ #
.PHONY: serve serve-backend serve-afadmin_client

serve: serve-backend serve-afadmin_client
	@echo ngix was build

serve-afadmin_client: nginx-image
	@docker run \
	--name agent_factory.nginx \
	--detach \
	--publish 80:80 \
	--mount \
	type=bind,\
	source=$(AFADMIN_CLIENT)/dist,\
	target=/srv \
	agent_factory/nginx

nginx-image:
	@docker images | grep agent_factory/nginx; \
	if (( $$? > 0 )); then \
		docker build --quiet --tag=agent_factory/nginx \
		--file $(SRCDIR)/Dockerfile.afadmin_client .; \
	fi

serve-backend:
	cd $(BACKEND); \
	docker-compose build; \
	docker-compose up

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
.PHONY: clean distclean dockerclean

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

dockerclean:
	docker stop agent_factory.nginx 2>/dev/null || exit 0
	docker rm agent_factory.nginx 2>/dev/null || exit 0
	docker rmi agent_factory/nginx 2>/dev/null || exit 0
