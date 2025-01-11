#!/bin/bash

# Process all JavaScript files in dist
for file in $(find dist -name "*.js"); do
  # Handle directory imports first (add /index.js)
  sed -i '' "s/from '\.\.\/types'/from '\.\.\/types\/index.js'/g" "$file"
  sed -i '' "s/from '\.\/types'/from '\.\/types\/index.js'/g" "$file"
  sed -i '' "s/from '\.\.\/constants'/from '\.\.\/constants.js'/g" "$file"
  sed -i '' "s/from '\.\/constants'/from '\.\/constants.js'/g" "$file"
  sed -i '' "s/from '\.\.\/configs'/from '\.\.\/configs\/index.js'/g" "$file"
  sed -i '' "s/from '\.\/configs'/from '\.\/configs\/index.js'/g" "$file"
  sed -i '' "s/from '\.\.\/presets'/from '\.\.\/presets\/index.js'/g" "$file"
  sed -i '' "s/from '\.\/presets'/from '\.\/presets\/index.js'/g" "$file"

  # Add .js to local imports
  sed -i '' "s/from '\.\([^']*\)'/from '\.\1.js'/g" "$file"
  sed -i '' "s/from '\.\.\([^']*\)'/from '\.\.\1.js'/g" "$file"

  # Final pass: Clean up any double .js extensions
  sed -i '' "s/\.js\.js/\.js/g" "$file"

  echo "Processed $file"
done

# Wait for file operations to complete
sleep 1

# Clean up any double .js extensions in all files at once
find dist -name "*.js" -exec sed -i '' 's/\.js\.js/\.js/g' {} \;
