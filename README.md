# @fino/eslint-config

```sh
# 1. Edit pnpm-workspace.yaml to remove the eslint-config directory
# (temporarily remove or comment out the packages/* line if needed)

# 2. Remove the directory from git tracking (but keep the files)
git rm -r --cached packages/eslint-config

# 3. Now you can add it as a submodule
git submodule add git@github.com:finografic/eslint-config.git packages/eslint-config

# 4. Commit the changes
git commit -m "Convert eslint-config to submodule"

# 5. Don't forget to restore your pnpm-workspace.yaml if you modified it
```

## how to reference this as a submodule inside of a monorepo

Keep the `workspace:*` specifier since it's still a workspace package

```json
"devDependencies": {
  "@finografic/eslint-config": "workspace:*"
}
```


## run alias helper `_gps` to push new commits to the submodule

```sh
_gca "updated eslint-config"
_gps
```
