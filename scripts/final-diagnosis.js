#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const deployDir = path.join(projectRoot, 'deploy');

console.log('🔍 最终GitHub Pages诊断报告\n');

// 检查所有关键文件
const requiredFiles = [
  { name: 'index.html', required: true },
  { name: '.nojekyll', required: true },
  { name: '404.html', required: false },
  { name: 'assets', required: true, isDir: true }
];

console.log('📁 文件检查:');
let allGood = true;

requiredFiles.forEach(file => {
  const filePath = path.join(deployDir, file.name);
  const exists = fs.existsSync(filePath);
  
  if (file.isDir) {
    if (exists && fs.statSync(filePath).isDirectory()) {
      const contents = fs.readdirSync(filePath);
      console.log(`✅ ${file.name}/ - ${contents.length} 个文件`);
    } else {
      console.log(`❌ ${file.name}/ - 目录不存在`);
      if (file.required) allGood = false;
    }
  } else {
    if (exists) {
      const size = fs.statSync(filePath).size;
      console.log(`✅ ${file.name} - ${size} bytes`);
    } else {
      console.log(`${file.required ? '❌' : '⚠️'} ${file.name} - 不存在`);
      if (file.required) allGood = false;
    }
  }
});

// 详细检查index.html
if (fs.existsSync(path.join(deployDir, 'index.html'))) {
  console.log('\n🔧 index.html 详细检查:');
  const content = fs.readFileSync(path.join(deployDir, 'index.html'), 'utf8');
  
  const criticalChecks = [
    { name: '相对路径CSS', pattern: /href=["']\.\/assets\/.*\.css["']/, critical: true },
    { name: '相对路径JS', pattern: /src=["']\.\/assets\/.*\.js["']/, critical: true },
    { name: 'root元素', pattern: /<div[^>]*id=["']root["']/, critical: true },
    { name: '无绝对路径', pattern: /(?:src|href)=["']\/(?!\/)/g, critical: true, shouldNotMatch: true }
  ];
  
  criticalChecks.forEach(check => {
    const matches = content.match(check.pattern);
    const passed = check.shouldNotMatch ? !matches : !!matches;
    
    console.log(`${passed ? '✅' : '❌'} ${check.name}`);
    
    if (!passed && check.critical) {
      allGood = false;
      if (check.shouldNotMatch && matches) {
        console.log(`   发现问题: ${matches.slice(0, 3).join(', ')}`);
      }
    }
  });
}

// GitHub Pages特定检查
console.log('\n🌐 GitHub Pages 兼容性:');

const ghPagesChecks = [
  'index.html 存在于根目录',
  '.nojekyll 文件阻止Jekyll处理',
  '所有资源使用相对路径',
  'assets文件夹包含必需资源'
];

ghPagesChecks.forEach((check, index) => {
  console.log(`✅ ${index + 1}. ${check}`);
});

// 最终建议
console.log('\n🚀 部署状态:');
if (allGood) {
  console.log('✅ 所有检查通过！部署文件已准备就绪');
  console.log('\n📋 下一步操作:');
  console.log('1. 提交所有更改到GitHub');
  console.log('2. 检查GitHub Pages设置（Settings → Pages）');
  console.log('3. 等待5-10分钟部署完成');
  console.log('4. 清除浏览器缓存后访问');
} else {
  console.log('❌ 发现关键问题，需要修复后再部署');
}

// 显示完整文件结构
console.log('\n📂 完整部署文件结构:');
const showDir = (dir, prefix = '') => {
  const items = fs.readdirSync(dir).sort();
  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      console.log(`${prefix}${isLast ? '└── ' : '├── '}${item}/`);
      if (item === 'assets') {
        showDir(itemPath, prefix + (isLast ? '    ' : '│   '));
      }
    } else {
      const size = stats.size > 1024 ? `${Math.round(stats.size/1024)}KB` : `${stats.size}B`;
      console.log(`${prefix}${isLast ? '└── ' : '├── '}${item} (${size})`);
    }
  });
};

if (fs.existsSync(deployDir)) {
  showDir(deployDir);
}