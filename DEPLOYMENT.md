# GitHub Pages 部署指南

## 问题诊断和修复

### 之前的问题
GitHub Pages部署失败的原因是资源路径不正确：
- Vite构建生成的`index.html`使用绝对路径 `/assets/xxx.js`
- GitHub Pages需要相对路径 `./assets/xxx.js`

### 解决方案
1. **自动化构建脚本** (`scripts/prepare-deploy.js`)
   - 自动修复资源路径
   - 移除开发环境横幅
   - 验证文件完整性

2. **GitHub Actions工作流** (`.github/workflows/deploy.yml`)
   - 使用Node.js 20构建环境
   - 运行`npx vite build`生成静态文件
   - 执行部署准备脚本修复路径
   - 上传正确的部署文件

## 本地测试部署

```bash
# 1. 完整构建测试（模拟GitHub Actions）
./scripts/test-github-actions.sh

# 2. 或者手动步骤：
npm install
npm run build
node scripts/prepare-deploy.js

# 3. 验证生成的文件
ls -la deploy/
cat deploy/index.html | grep assets
```

## 部署状态验证

部署成功后，您的网站应该包含：
- ✅ 响应式设计和Morandi配色
- ✅ 英文/中文智能FAQ聊天机器人
- ✅ 项目展示（中文讽刺识别研究）
- ✅ 专业简历和联系信息
- ✅ 搜索栏和浮动聊天按钮

## 聊天机器人功能

**免费本地知识库支持：**
- 教育背景查询（university, study, 大学, 学历）
- 项目经验（project, research, sarcasm, 项目, 研究）
- 技能介绍（skill, python, programming, 技能, 编程）
- 联系方式（contact, email, 联系, 邮箱）
- 研究兴趣（interest, nlp, machine learning, 兴趣）

**特色功能：**
- 中英文关键词识别
- 智能回答匹配
- 优雅的加载动画
- 错误处理和用户友好提示

## 故障排除

如果部署仍有问题：
1. 检查GitHub Pages设置中的源分支
2. 确认Actions工作流有写入权限
3. 验证`deploy/`目录下文件结构正确