#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const distPublicDir = path.join(projectRoot, 'dist', 'public');
const deployDir = path.join(projectRoot, 'deploy');

console.log('🚀 准备GitHub Pages部署...');

// 1. 检查构建输出是否存在
if (!fs.existsSync(distPublicDir)) {
  console.error('❌ 构建输出不存在，请先运行: npx vite build');
  process.exit(1);
}

// 2. 创建部署目录
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
fs.mkdirSync(deployDir, { recursive: true });

// 3. 复制所有构建文件
console.log('📁 复制构建文件...');
fs.cpSync(distPublicDir, deployDir, { recursive: true });

// 复制404.html文件（如果存在）
const source404 = path.join(projectRoot, 'client', 'public', '404.html');
const dest404 = path.join(deployDir, '404.html');
if (fs.existsSync(source404)) {
  fs.copyFileSync(source404, dest404);
  console.log('📄 已复制404.html');
}

// 4. 修复index.html中的资源路径
const indexPath = path.join(deployDir, 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('🔧 修复资源路径...');
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // 修复所有绝对路径为相对路径
  indexContent = indexContent
    .replace(/src="\/assets\//g, 'src="./assets/')
    .replace(/href="\/assets\//g, 'href="./assets/')
    .replace(/crossorigin src="\/assets\//g, 'crossorigin src="./assets/')
    .replace(/crossorigin href="\/assets\//g, 'crossorigin href="./assets/');
  
  // 移除replit开发横幅
  indexContent = indexContent.replace(
    /<script type="text\/javascript" src="https:\/\/replit\.com\/public\/js\/replit-dev-banner\.js"><\/script>/g,
    ''
  );
  
  fs.writeFileSync(indexPath, indexContent);
  console.log('✅ index.html路径已修复');
} else {
  console.error('❌ 找不到index.html文件');
  process.exit(1);
}

// 5. 添加.nojekyll文件以禁用Jekyll处理
const nojekyllPath = path.join(deployDir, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('✅ 已添加.nojekyll文件');

// 6. 验证文件结构
console.log('🔍 验证部署文件...');
const files = fs.readdirSync(deployDir);
console.log('部署目录内容:', files);

if (files.includes('index.html') && files.includes('assets')) {
  console.log('✅ 部署文件准备完成！');
  console.log('📄 文件路径已修复为GitHub Pages兼容格式');
  
  // 显示修复后的index.html片段
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const scriptMatch = indexContent.match(/src="\.\/assets\/[^"]+"/);
  const cssMatch = indexContent.match(/href="\.\/assets\/[^"]+"/);
  
  if (scriptMatch && cssMatch) {
    console.log('🎯 资源路径示例:');
    console.log('  JS:', scriptMatch[0]);
    console.log('  CSS:', cssMatch[0]);
  }
} else {
  console.error('❌ 部署文件不完整');
  process.exit(1);
}