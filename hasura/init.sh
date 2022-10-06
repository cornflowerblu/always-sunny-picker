#!/bin/sh

# Install deps
apt update -y
apt install curl -y
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

# Set the inner-docker config
cd hasura
rm -f config.yaml
mv config-docker.yaml config.yaml

# Apply Metadata, Migrate, Seed
hasura metadata apply
hasura migrate apply --database-name default
hasura metadata reload
hasura seed apply --database-name default