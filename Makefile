#!/usr/bin/make

# Include package information
include ./PACKAGE

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
AFMACHINE = $(SRCDIR)/core/afmachine
THOMAS =$(SRCDIR)/ui/thomas

# Config directories
CONFDIR = $(SRCDIR)/config
AFADMIN_CLIENT_CONFDIR = $(CONFDIR)/afadmin_client

# git modules
GITMODULES = $(AFADMIN_CLIENT) $(REACT_UTILS) $(JS_UTILS) \
$(MQTT_PROXY) $(AFMACHINE)

.PHONY: all
all:
	@echo Supply recipe to run.

# ------------------------------ SETUP ------------------------------ #
.PHONY: setup

setup: modules npm-packages

modules:
	git config --local include.path '../.gitconfig'
	git submodule update --init --recursive

npm-packages:
	npm install --workspace js_utils
	npm install --workspace mqtt_proxy
	npm install --workspace shared
	npm install --workspace afmachine
	npm install --workspace react_utils
	npm install --workspace afadmin_client

# ------------------------------ RELEASE ------------------------------ #
.PHONY: release rel bump-version .EXPORT_ALL_VARIABLES

CALLED_BY_MAKE=true
bump-version:
	@set -a; source ./PACKAGE && ./scripts/changeVersion.sh

release: .EXPORT_ALL_VARIABLES
release:
	-rm -rdf $(SRCDIR)/dist/*
	-rm *.tar.gz
	-mkdir -p $(SRCDIR)/dist 2>/dev/null
	CALLED_BY_MAKE=true $(SRCDIR)/scripts/release.sh
	cp -r $(SRCDIR)/config/nginx.conf $(SRCDIR)/dist/agent_factory.nginx.conf
	cp -r $(AFADMIN_CLIENT)/dist $(SRCDIR)/dist/administration
	cp -r $(THOMAS)/build $(SRCDIR)/dist/gameplay
	cp -r $(SRCDIR)/PACKAGE $(SRCDIR)/dist/PACKAGE
	tar -cavf $(PKG_DISTNAME).tar.gz $(SRCDIR)/dist

.PHONY: sync
sync:
# sync administration
	rsync -az $(SRCDIR)/dist/administration/* \
	agent_factory:/var/www/html/administration
# sync gameplay
	rsync -az $(SRCDIR)/dist/gameplay/* \
	agent_factory:/var/www/html/gameplay
# sync nginx.conf
	rsync -az $(SRCDIR)/dist/agent_factory.nginx.conf \
	agent_factory:/etc/nginx/conf.d/agent_factory.nginx.conf


# ------------------------------ SERVE ------------------------------ #
.PHONY: serve serve-backend serve-afadmin_client

serve: serve-backend serve-afadmin_client
	@echo ngix was build

dockernginx: nginx-image
	@docker run \
	--name agent_factory.nginx \
	--detach \
	--publish 80:80 \
	--publish 9000:9000 \
	--publish 9090:9090 \
	--mount \
	type=bind,\
	source=$(SRCDIR)/dist,\
	target=/srv \
	--mount \
	type=bind,\
	source=$(SRCDIR)/config/afadmin_client/nginx.conf,\
	target=/etc/nginx/conf.d/default.conf \
	agent_factory/nginx

nginx-image:
	@docker images | grep agent_factory/nginx; \
	if (( $$? > 0 )); then \
		docker build --quiet --tag=agent_factory/nginx \
		--file $(SRCDIR)/Dockerfile.afadmin_client .; \
	fi

serve-backend:
	cd $(BACKEND) && docker-compose build
	cd $(BACKEND) && docker-compose up -d

# ------------------------------ BUILD ------------------------------ #
.PHONY: build build-dev build-staging build-prod
build: build-prod

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
.PHONY: clean distclean dockerclean dockercleannginx \
dockercontclean dockerimgclean allclean

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

dockercleannginx:
	-docker stop agent_factory.nginx 2>/dev/null
	-docker rm agent_factory.nginx 2>/dev/null
	-docker image rm agent_factory/nginx

dockercontclean:
	docker stop agent_factory.nginx 2>/dev/null || exit 0
	docker rm agent_factory.nginx 2>/dev/null || exit 0
	cd $(BACKEND) && docker-compose down 2>/dev/null || exit 0

dockerimgclean: dockercontclean
	docker rmi agent_factory/nginx || exit 0
	cd $(BACKEND) && docker-compose down --rmi all

dockerclean: dockercontclean dockerimgclean

allclean:
	make clean
	make dockerclean
	make distclean

# ------------------------------ VARIOUS ------------------------------ #
