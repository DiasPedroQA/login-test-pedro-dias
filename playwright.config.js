// playwright.config.js
module.exports = {
  use: {
    headless: true,
    baseURL: 'https://beta.skill5.com/pt',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  timeout: 60000,
};
