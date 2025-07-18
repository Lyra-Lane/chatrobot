#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 GitHub Pages 部署诊断');

const projectRoot = path.resolve(__dirname, '..');
const deployDir = path.join(projectRoot, 'deploy');

// 检查所有必需文件
const checkFile = (filePath, description) => {
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${description}: ${filePath} (${stats.size} bytes)`);
    return true;
  } else {
    console.log(`❌ 缺失: ${description}: ${filePath}`);
    return false;
  }
};

// 1. 检查基本文件
console.log('\n📁 检查部署文件:');
const hasIndex = checkFile(path.join(deployDir, 'index.html'), 'index.html');
const hasNojekyll = checkFile(path.join(deployDir, '.nojekyll'), '.nojekyll');
const hasAssets = fs.existsSync(path.join(deployDir, 'assets'));

if (hasAssets) {
  const assetFiles = fs.readdirSync(path.join(deployDir, 'assets'));
  console.log(`✅ assets目录: ${assetFiles.length} 个文件`);
  assetFiles.forEach(file => {
    console.log(`  - ${file}`);
  });
} else {
  console.log('❌ 缺失 assets 目录');
}

// 2. 验证index.html内容
if (hasIndex) {
  console.log('\n🔧 检查index.html配置:');
  const indexContent = fs.readFileSync(path.join(deployDir, 'index.html'), 'utf8');
  
  // 检查关键元素
  const checks = [
    { name: 'DOCTYPE声明', regex: /<!DOCTYPE html>/i },
    { name: 'HTML lang属性', regex: /<html[^>]*lang=/i },
    { name: 'meta charset', regex: /<meta[^>]*charset=/i },
    { name: 'viewport meta', regex: /<meta[^>]*viewport=/i },
    { name: 'title标签', regex: /<title>/i },
    { name: 'root div', regex: /<div[^>]*id=["']root["']/i },
    { name: '相对路径CSS', regex: /href=["']\.\/assets\/[^"']*\.css["']/i },
    { name: '相对路径JS', regex: /src=["']\.\/assets\/[^"']*\.js["']/i },
  ];
  
  checks.forEach(check => {
    const result = check.regex.test(indexContent);
    console.log(`${result ? '✅' : '❌'} ${check.name}`);
  });
  
  // 检查是否有绝对路径（会导致404）
  const absolutePaths = indexContent.match(/(?:src|href)=["']\/[^"']*["']/g);
  if (absolutePaths) {
    console.log('⚠️  发现绝对路径（可能导致404）:');
    absolutePaths.forEach(path => console.log(`  ${path}`));
  }
}

// 3. 生成完整的GitHub Pages兼容index.html
const generateCompleteIndex = () => {
  console.log('\n🛠️  生成GitHub Pages优化的index.html');
  
  // 读取assets文件
  const assetsDir = path.join(deployDir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.log('❌ assets目录不存在，跳过');
    return;
  }
  
  const assetFiles = fs.readdirSync(assetsDir);
  const jsFile = assetFiles.find(f => f.startsWith('index-') && f.endsWith('.js'));
  const cssFile = assetFiles.find(f => f.startsWith('index-') && f.endsWith('.css'));
  
  if (!jsFile || !cssFile) {
    console.log('❌ 找不到必需的JS或CSS文件');
    return;
  }
  
  const optimizedHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>ManYao Li - Data Science & NLP Researcher</title>
    <meta name="description" content="ManYao Li - Statistics student at Beijing Normal University specializing in NLP, Machine Learning, and Data Science. Available for data science internships." />
    <meta property="og:title" content="ManYao Li - Data Science & NLP Researcher" />
    <meta property="og:description" content="Statistics student at Beijing Normal University specializing in NLP, Machine Learning, and Data Science." />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script type="module" crossorigin src="./assets/${jsFile}"></script>
    <link rel="stylesheet" crossorigin href="./assets/${cssFile}">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

  const backupPath = path.join(deployDir, 'index.html.backup');
  const indexPath = path.join(deployDir, 'index.html');
  
  // 备份原文件
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, backupPath);
    console.log('✅ 原index.html已备份');
  }
  
  // 写入优化版本
  fs.writeFileSync(indexPath, optimizedHtml);
  console.log('✅ 已生成GitHub Pages优化版index.html');
  console.log(`📝 CSS: ./assets/${cssFile}`);
  console.log(`📝 JS: ./assets/${jsFile}`);
};

// 执行优化
generateCompleteIndex();

console.log('\n🚀 部署建议:');
console.log('1. 确保GitHub仓库设置中Pages源为正确分支');
console.log('2. 等待5-10分钟让GitHub处理部署');
console.log('3. 清除浏览器缓存再测试');
console.log('4. 如果仍有问题，检查GitHub Actions日志');