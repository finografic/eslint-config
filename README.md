# @finografic/eslint-config

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

---

## INIT: how to install as dep and setup scripts

Install as a dev dependency from the root of the monorepo

```sh
pnpm add -D @finografic/eslint-config --latest --recursive --registry http://localhost:4873",
```

Add update script to the root package.json

```json
{
  "·········· LINTING": "···················································",
  "update:eslint-config": "pnpm update @finografic/eslint-config --latest --recursive --registry http://localhost:4873"
}
```

## `.npmrc` file - THIS source repository

```config
# For local development/publishing
registry=http://localhost:4873
@finografic:registry=http://localhost:4873

# For GitHub Packages publishing
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

## `.npmrc` file - CONSUMER repository

this allows to pull from GitHub Packages, when running `pnpm install`

```config
@finografic:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

---

## OTHER: how to reference this as a submodule inside of a monorepo

Keep the `workspace:*` specifier since it's still a workspace package

```
"devDependencies": {
  "@finografic/eslint-config": "workspace:*"
}
```
