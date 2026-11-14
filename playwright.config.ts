import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'tests/browser',retries:0,use:{baseURL:process.env.PROOFPILOT_TEST_URL||'http://127.0.0.1:4173',video:'on'},
 webServer:process.env.PROOFPILOT_TEST_URL?undefined:{command:'npx vite --host 127.0.0.1 --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},
 projects:[{name:'desktop',use:{viewport:{width:1920,height:1080}}},{name:'mobile',use:{...devices['iPhone 13'],defaultBrowserType:'chromium'}}],
});
