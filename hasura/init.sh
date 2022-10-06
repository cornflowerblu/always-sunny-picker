#!/bin/sh

apt update -y
apt install curl -y
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
cd home && mkdir hasura
hasura init . --endpoint http://graphql-engine:8080 --admin-secret myadminsecretkey
cd metadata/databases/default/tables
rm tables.yaml
echo [{table: {name: characters, schema: public}, object_relationships: [{name: show, using: {foreign_key_constraint_on: show_id}}]}, {table: {name: episodes, schema: public}, object_relationships: [{name: season, using: {foreign_key_constraint_on: season_id}}]}, {table: {name: seasons, schema: public}, object_relationships: [{name: show, using: {foreign_key_constraint_on: show_id}}], array_relationships: [{name: episodes, using: {foreign_key_constraint_on: {column: season_id, table: {name: episodes, schema: public}}}}]}, {table: {name: sessions, schema: public}}, {table: {name: shows, schema: public}, array_relationships: [{name: characters, using: {foreign_key_constraint_on: {column: show_id, table: {name: characters, schema: public}}}}, {name: seasons, using: {foreign_key_constraint_on: {column: show_id, table: {name: seasons, schema: public}}}}]}] > tables.yaml
hasura metadata apply