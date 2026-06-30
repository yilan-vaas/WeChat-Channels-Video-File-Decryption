/**
 * worker.html 安全配置测试。
 *
 * 确保 API 服务的 Playwright worker 只加载本地 WASM 资源，不在本地资源失败时
 * 动态拉取远程 CDN 脚本。
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const workerPath = path.join(__dirname, '..', 'worker.html');
const workerHtml = fs.readFileSync(workerPath, 'utf8');

console.log('运行 worker.html 安全配置测试...\n');

assert(
    !workerHtml.includes('aladin.wxqcloud.qq.com'),
    'worker.html 不应包含微信 CDN URL'
);

assert(
    !workerHtml.includes('VTS_WASM_CDN_URL'),
    'worker.html 不应定义 CDN WASM URL'
);

assert(
    !workerHtml.includes('document.createElement(\'script\')'),
    'worker.html 不应动态创建远程 script fallback'
);

assert(
    workerHtml.includes('wechat_files/wasm_video_decode.wasm'),
    'worker.html 应继续使用本地 WASM 文件'
);

console.log('✅ worker.html 未启用 CDN fallback');
