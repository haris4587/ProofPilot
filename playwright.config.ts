import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'tests/browser',retries:0,use:{baseURL:'http://127.0.0.1:4173'},
 webServer:{command:'npm run dev -- --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},
 projects:[{name:'desktop',use:{viewport:{width:1440,height:1000}}},{name:'mobile',use:{...devices['iPhone 13'],defaultBrowserType:'chromium'}}],
});
