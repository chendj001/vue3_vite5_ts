#!/bin/sh
set -e

# 从环境变量或默认值中获取输入参数
INPUT_ATOMIC=${INPUT_ATOMIC:-true}
INPUT_FORCE=${INPUT_FORCE:-false}
INPUT_FORCE_WITH_LEASE=${INPUT_FORCE_WITH_LEASE:-false}
INPUT_SSH=${INPUT_SSH:-false}
INPUT_TAGS=${INPUT_TAGS:-false}
INPUT_DIRECTORY=${INPUT_DIRECTORY:-'.'}
_ATOMIC_OPTION=''
_FORCE_OPTION=''
REPOSITORY=${INPUT_REPOSITORY:-$GITHUB_REPOSITORY}

# 输出将要推送的分支
echo "Push to branch $INPUT_BRANCH";

# 检查是否存在 GitHub Token
[ -z "${INPUT_GITHUB_TOKEN}" ] && {
    echo '检查是否存在 "github_token: ${{ secrets.GITHUB_TOKEN }}".';
    exit 1;
};

# 检查是否同时指定了 force 和 force_with_lease 参数
if ${INPUT_FORCE} && ${INPUT_FORCE_WITH_LEASE}; then
  echo '检查是否同时指定了 force 和 force_with_lease 参数';
  exit 1;
fi

# 根据输入参数设置相应的选项
if ${INPUT_ATOMIC}; then
    _ATOMIC_OPTION='--atomic'
fi

if ${INPUT_FORCE}; then
    _FORCE_OPTION='--force'
fi

if ${INPUT_FORCE_WITH_LEASE}; then
    _FORCE_OPTION='--force-with-lease'
fi

if ${INPUT_TAGS}; then
    _TAGS='--tags'
fi

# 切换到指定的目录
cd ${INPUT_DIRECTORY}

# 根据输入参数设置远程仓库地址
if ${INPUT_SSH}; then
    remote_repo="git@${INPUT_GITHUB_URL}:${REPOSITORY}.git"
else
    remote_repo="${INPUT_GITHUB_URL_PROTOCOL}//oauth2:${INPUT_GITHUB_TOKEN}@${INPUT_GITHUB_URL}/${REPOSITORY}.git"
fi

# 将安全目录配置为输入参数中指定的目录
git config --local --add safe.directory ${INPUT_DIRECTORY}

# 根据输入参数设置额外的推送参数
if ! ${INPUT_FORCE_WITH_LEASE}; then
  ADDITIONAL_PARAMETERS="${remote_repo} HEAD:${INPUT_BRANCH}"
fi

# 执行 git push 命令
git push $ADDITIONAL_PARAMETERS $_ATOMIC_OPTION --follow-tags $_FORCE_OPTION $_TAGS;
