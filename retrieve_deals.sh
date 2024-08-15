#!/bin/bash

# Define the path to the JavaScript file
JS_FILE_PATH="src\components\RestaurantDisplay\retrieveDeals.js"

OUTPUT_PATH="src\components\RestaurantDisplay\deals.ts"

# Check if the JavaScript file exists
if [ -f "$JS_FILE_PATH" ]; then
  # Run the JavaScript file with Node.js and pass the output path as an argument
  node "$JS_FILE_PATH" "$OUTPUT_PATH"
else
  echo "Error: JavaScript file not found at $JS_FILE_PATH"
  exit 1
fi

# Check if the file was generated
if [ -f "$OUTPUT_PATH" ]; then
  echo "File Located at $OUTPUT_PATH"
else
  echo "Error: File was not generated."
fi