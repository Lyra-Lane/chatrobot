#!/bin/bash

echo "🧪 模拟GitHub Actions构建流程测试"
echo "=================================="

# 清理之前的构建
echo "🧹 清理之前的构建..."
rm -rf dist/ deploy/

# 1. 安装依赖 (模拟GitHub Actions)
echo "📦 安装依赖..."
npm install

# 2. 构建前端项目
echo "🔨 构建前端..."
npx vite build

# 3. 检查构建输出
echo "🔍 检查构建输出..."
if [ ! -d "dist/public" ]; then
    echo "❌ 错误：dist/public 目录不存在"
    exit 1
fi

if [ ! -f "dist/public/index.html" ]; then
    echo "❌ 错误：index.html 不存在"
    exit 1
fi

if [ ! -d "dist/public/assets" ]; then
    echo "❌ 错误：assets 目录不存在"
    exit 1
fi

echo "✅ 构建输出验证通过"

# 4. 准备部署文件
echo "📁 准备部署文件..."
node scripts/prepare-deploy.js

# 5. 最终验证
echo "🎯 最终验证..."
if [ ! -f "deploy/index.html" ]; then
    echo "❌ 部署文件缺失"
    exit 1
fi

if [ ! -f "deploy/.nojekyll" ]; then
    echo "❌ .nojekyll 文件缺失"
    exit 1
fi

# 检查资源路径
if grep -q 'src="/assets/' deploy/index.html; then
    echo "❌ 发现绝对路径，应该是相对路径"
    exit 1
fi

if grep -q 'src="./assets/' deploy/index.html; then
    echo "✅ 资源路径正确（相对路径）"
else
    echo "❌ 未找到正确的资源路径"
    exit 1
fi

echo ""
echo "🎉 GitHub Actions模拟测试通过！"
echo "📂 部署文件已准备就绪："
ls -la deploy/
echo ""
echo "🚀 现在可以安全地推送到GitHub了！"