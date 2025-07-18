# GitHub Pages 部署故障排除指南

## 🚨 如果仍然出现404错误，请检查以下设置：

### 1. GitHub仓库设置检查

**步骤：**
1. 进入您的GitHub仓库
2. 点击 **Settings** 标签
3. 滚动到 **Pages** 部分

**正确配置应该是：**
- **Source**: Deploy from a branch
- **Branch**: `main` (或者您推送代码的分支)
- **Folder**: `/ (root)`

### 2. 常见的GitHub Pages配置错误

**❌ 错误配置：**
- Branch 选择了错误的分支
- Folder 选择了 `/docs` 而不是 `/ (root)`
- 仓库是私有的（需要GitHub Pro）

**✅ 正确配置：**
- Branch: `main` 
- Folder: `/ (root)`
- 仓库必须是公开的（或有GitHub Pro订阅）

### 3. 检查GitHub Actions部署

1. 在仓库中点击 **Actions** 标签
2. 查看最新的工作流运行
3. 如果显示红色错误，点击查看详细日志

**常见Actions错误：**
- 权限问题：检查 Settings → Actions → General → Workflow permissions
- 需要启用 "Read and write permissions"

### 4. 强制刷新部署

如果一切设置正确但仍404：

```bash
# 1. 创建空提交强制触发部署
git commit --allow-empty -m "Trigger GitHub Pages deployment"
git push

# 2. 或者推送任何小更改
echo "<!-- Deploy trigger -->" >> README.md
git add README.md
git commit -m "Force deploy"
git push
```

### 5. 检查文件名大小写

GitHub Pages对文件名大小写敏感：
- 必须是 `index.html` （小写）
- 不能是 `Index.html` 或 `INDEX.html`

### 6. 验证URL访问

**正确的访问URL格式：**
- 用户页面：`https://yourusername.github.io/`
- 项目页面：`https://yourusername.github.io/repository-name/`

### 7. 浏览器缓存问题

1. 硬刷新：`Ctrl+F5` (Windows) 或 `Cmd+Shift+R` (Mac)
2. 清除浏览器缓存
3. 尝试无痕/隐身模式

### 8. DNS传播延迟

GitHub Pages部署可能需要：
- **5-10分钟** 进行初始部署
- **最多1小时** 进行全球CDN传播

### 9. 查看GitHub状态

如果所有设置都正确但仍有问题：
- 访问 https://www.githubstatus.com/
- 检查GitHub Pages服务状态

## 🔧 终极诊断方法

如果以上都不解决问题，尝试：

1. **重新创建Pages设置：**
   - Settings → Pages → Source → None → Save
   - 等待1分钟
   - Settings → Pages → Source → Deploy from branch → main → / (root) → Save

2. **检查具体错误：**
   - 打开浏览器开发者工具 (F12)
   - 查看Console和Network标签页
   - 查找具体的404资源

3. **联系GitHub支持：**
   如果确认所有配置正确但仍无法访问，可能是GitHub服务问题。

## ✅ 部署成功指标

当一切正常工作时，您应该看到：
- 个人简介页面完整加载
- Morandi色彩主题正确显示
- 聊天机器人功能正常（搜索栏和浮动按钮）
- 图片和样式完全加载
- 响应式设计在移动设备上正常工作