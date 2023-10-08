
#
# Elide Site - Makefile
#

DEBUG ?= no
VERBOSE ?= no

CP ?= $(shell which cp)
RM ?= $(shell which rm)
GIT ?= $(shell which git)
FIND ?= $(shell which find)
NODE ?= $(shell which node)
BUN ?= $(shell which bun)
PNPM ?= $(shell which pnpm)
RUNNER ?= $(BUN)
NODE_MODULES ?= node_modules/
DEPS ?= $(NODE_MODULES)
INSTALL_PACKAGES ?= $(PNPM) install
TARGET ?= dist

POSIX_FLAGS =

ifeq ($(VERBOSE),yes)
RULE =
POSIX_FLAGS += POSIX_FLAGS
else
RULE = @
endif

all: build test  ## Build and test all targets.

build: deps  ## Build all targets.
	$(info Building Elide site...)
	$(RULE)$(PNPM) build

test: deps  ## Run all available tests.
	$(info Running Elide site tests...)
	$(RULE)$(PNPM) test


# ------------------------------------------------------


clean:  ## Clean build outputs and caches.
	@echo "Cleaning targets..."
	$(RULE)$(RM) -fr$(strip $(POSIX_FLAGS)) $(TARGET)
	$(RULE)$(FIND) . -name .DS_Store -delete

distclean: clean  ## DANGER: Clean and remove any persistent caches. Drops changes.
	@echo "Cleaning caches..."
	$(RULE)$(RM) -fr$(strip $(POSIX_FLAGS)) kotlin-js-store .buildstate.tar.gz

forceclean: forceclean  ## DANGER: Clean, distclean, and clear untracked files.
	@echo "Resetting codebase..."
	$(RULE)$(GIT) reset --hard
	@echo "Cleaning untracked files..."
	$(RULE)$(GIT) clean -xdf

help:  ## Show this help text ('make help').
	$(info Elide Site:)
	@grep -E '^[a-z1-9A-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


# ------------------------------------------------------


deps: $(DEPS)

$(NODE_MODULES):
	$(info Instlling NPM modules...)
	$(RULE)$(INSTALL_PACKAGES)


.PHONY: deps build test
