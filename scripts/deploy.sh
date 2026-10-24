#!/usr/bin/env bash
set -Eeuo pipefail
umask 022
sha="${DEPLOY_SHA:?Verified commit required}"
[[ "$sha" =~ ^[0-9a-f]{40}$ ]] || exit 1
export PATH=/home/max/.nvm/versions/node/v24.22.1/bin:/usr/bin:/bin
export npm_config_cache=/home/max/build-sites/portfolio/npm-cache
export NODE_OPTIONS=--max-old-space-size=1536
repo=/home/max/portfolio
build="/home/max/build-sites/portfolio/$sha"
runtime="/srv/native-sites/portfolio/releases/$sha"
mkdir -p /home/max/build-sites/portfolio
exec 9>/home/max/build-sites/portfolio/deploy.lock
flock 9
git -C "$repo" fetch origin "$sha"
if [[ ! -d "$build" ]]; then git -C "$repo" worktree add --detach "$build" "$sha"; fi
test "$(git -C "$build" rev-parse HEAD)" = "$sha"
cd "$build"
npm ci --no-audit --no-fund
node --env-file=/home/max/native-config/portfolio-web.env /home/max/.nvm/versions/node/v24.22.1/lib/node_modules/npm/bin/npm-cli.js run check
test -f dist/previews/jslab.gif
test ! -e "$runtime"
mkdir -p "$runtime/web"
cp -a dist serve.json package.json package-lock.json "$runtime/web/"
npm --prefix "$runtime/web" ci --omit=dev --ignore-scripts --no-audit --no-fund
touch "$runtime/ready"
if [[ "${NATIVE_BUILD_ONLY:-0}" == 1 ]]; then printf 'Built isolated portfolio %s\n' "$sha"; exit 0; fi
sudo -n /usr/local/sbin/sites-admin portfolio activate "$sha"
