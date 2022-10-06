#!/bin/sh

# Install deps
apt update -y
apt install curl -y
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

# Set the inner-docker config
cd hasura
rm -f config.yaml
echo {version: 3, endpoint: 'http://graphql-engine:8080', admin_secret: myadminsecretkey, metadata_directory: metadata, actions: {kind: synchronous, handler_webhook_baseurl: 'http://web:3000'}} > config.yaml

# Apply Metadata, Migrate, Seed
hasura metadata apply
hasura migrate apply --database-name default
hasura metadata reload
hasura seed apply --database-name default

# Reset config.yaml
rm -f config.yaml
echo {version: 3, endpoint: 'http://localhost:8080', admin_secret: myadminsecretkey, metadata_directory: metadata, actions: {kind: synchronous, handler_webhook_baseurl: 'http://localhost:3000'}} > config.yaml