#!/usr/bin/env bash
# /usr/local/bin/minio-init.sh
set -e

# Start MinIO server in the background
minio server --console-address ":9001" /data &
MINIO_PID=$!

echo "Waiting for MinIO server to be ready..."
# Instead of sleeping for a fixed time, poll until the server is ready
MAX_RETRIES=10
RETRY_COUNT=0
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  if mc alias set local http://localhost:9000 minioadmin minioadmin > /dev/null 2>&1; then
    echo "MinIO server is ready!"
    break
  fi
  RETRY_COUNT=$((RETRY_COUNT+1))
  echo "Waiting for MinIO to start... (${RETRY_COUNT}/${MAX_RETRIES})"
  sleep 1
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
  echo "MinIO server failed to start in time. Proceeding anyway..."
fi

# Check if bucket exists and create if needed
if mc ls local/starter-kit-bucket > /dev/null 2>&1; then
  echo "Bucket starter-kit-bucket already exists. Skipping creation."
else
  echo "Creating bucket: starter-kit-bucket"
  mc mb local/starter-kit-bucket
fi

# Set anonymous download policy directly without creating a policy file
echo "Setting public read access on the bucket..."
mc anonymous set download local/starter-kit-bucket

echo "MinIO setup complete!"

# Wait for the MinIO server process
wait $MINIO_PID
