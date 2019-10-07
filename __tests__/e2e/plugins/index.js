// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const path = require("path");

module.exports = (on, config) => {
  const basePath = "__tests__/e2e/";

  return Object.assign({}, config, {
    baseUrl: "http://localhost:8080/#",
    defaultCommandTimeout: 10000,
    fixturesFolder: path.join(basePath, "fixtures"),
    integrationFolder: path.join(basePath, "specs"),
    screenshotsFolder: path.join(basePath, "screenshots"),
    videosFolder: path.join(basePath, "videos"),
    supportFile: path.join(basePath, "support/index.js"),
    viewportWidth: 1920,
    viewportHeight: 1080,
  });
};
