#!/usr/bin/env bash
# /etc/localstack/init/ready.d/init-s3.sh
set -e

echo "Initializing S3"

# 1) Create test-bucket
awslocal s3api create-bucket --bucket test-bucket

# 2) Update CORS policy for test-bucket
awslocal s3api put-bucket-cors \
    --bucket test-bucket \
    --cors-configuration file:///etc/localstack/init/ready.d/s3-cors-config.json

echo "S3 initialized"
