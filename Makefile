#!/usr/bin/make

# Make and Shell behavior
SHELL = /usr/bin/bash
.DELETE_ON_ERROR:
.DEFAULT_GOAL := all

SRCDIR := $(shell pwd)
AFADMIN_CLIENT = $(SRCDIR)/ui/afadmin_client
REACT_UTILS = $(SRCDIR)/ui/react_utils
JS_UTILS = $(SRCDIR)/lib/js_utils
MQTT_PROXY = $(SRCDIR)/lib/mqtt_proxy
AF_MACHINE = $(SRCDIR)/core/afmachine

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
	npm install

# ------------------------------ SERVE ------------------------------ #
.PHONY: serve

serve: nginx-container
	@echo ngix was build

nginx-container: nginx-image
	@docker run \
	--name agent_factory.nginx \
	--detach \
	--publish 80:80 \
	--mount \
	type=bind,\
	source=$(SRCDIR)/ui/afadmin_client/dist,\
	target=/srv \
	-v $(SRCDIR)/tmp/afadmin_client.nginx.conf:/etc/nginx/conf.d/default.conf:ro \
	agent_factory/nginx

nginx-image:
	@docker images | grep agent_factory/nginx; \
	if (( $$? > 0 )); then \
		docker build --quiet --tag=agent_factory/nginx ./tmp; \
	fi

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
