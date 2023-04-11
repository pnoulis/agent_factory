#!/usr/bin/make

# Make and Shell behavior
SHELL = /usr/bin/bash
.DELETE_ON_ERROR:
.DEFAULT_GOAL := all

.PHONY: all
all:
	@echo yolo

# ------------------------------ CLEANS ------------------------------ #
.PHONY: clean
clean:
	rm -rdf ./node_modules
	cd ./core/afmachine && make clean
	cd ./ui/react_utils && make clean
	cd ./lib/js_utils && make clean
	cd ./ui/afadmin_client && make clean
	cd ./lib/mqtt_proxy && make clean
