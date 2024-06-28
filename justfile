#!/usr/bin/env just --justfile
# 'justfile'
# just-repo: https://github.com/casey/just
# just-docs: https://just.systems/man/en/

@_default:
    just --list --unsorted

all: ci

# build it
build:
    pnpm build

# ci -- often default or 'all' target
ci: build test lint

# lint da code
lint:
    pnpm lint

# run tests
test:
    pnpm test

# clean up
clean:
    echo "unimplemented"

# remove all node_modules
NUKE:
    npx rimraf ./**/node_modules

# FORMATTING
fmt-prettier:
    npx prettier@latest --write .

# format errthing
fmt:
    pnpm fmt
    just --fmt --unstable

# format check
fmtc:
    pnpm fmtc

change *ARGS:
    pnpm run change {{ ARGS }}
