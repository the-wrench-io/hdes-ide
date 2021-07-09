#!/usr/bin/env bash
set -e

# No changes, skip release
readonly local last_release_commit_hash=$(git log --author="$BOT_NAME" --pretty=format:"%H" -1)
echo "Last commit:    ${last_release_commit_hash} by $BOT_NAME"
echo "Current commit: ${GITHUB_SHA}"
if [[ "${last_release_commit_hash}" = "${GITHUB_SHA}" ]]; then
     echo "No changes, skipping release"
     #exit 0
fi


# Config GIT
echo "Setup git user name to '$BOT_NAME' and email to '$BOT_EMAIL' GPG key ID $GPG_KEY_ID"
git config --global user.name "$BOT_NAME";
git config --global user.email "$BOT_EMAIL";

# Checkout
git reset --hard
git fetch --all
git branch -a --contains ${GITHUB_SHA} --format="%(refname)"


readonly local refname=$(git branch -a --contains ${GITHUB_SHA} --format="%(refname)" | head -1)
if [[ "${refname}" = "refs/heads/main" ]]; then
     readonly local branch="main"
else
     readonly local branch=${refname#refs/remotes/origin/}
fi


echo "Git checkout refname: '${refname}' branch: '${branch}' commit: '${GITHUB_SHA}'"
# echo "Dev version: '${PROJECT_VERSION}' release version: '${RELEASE_VERSION}'"

git checkout ${branch}