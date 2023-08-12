// configuration files
const _businessConfig = require('../../../configs/business-config.json');
const _emailMessages = require('../../../configs/email-messages.json');
const _plotLinesConfig = require('../../../configs/plot-lines-config.json');

// Cache the configuration in memory
let businessConfig = null;
let emailMessages = null;
let plotLinesConfig = null;

// Load the configuration from the file system
// Optionally make it immutable using Object.freeze()
async function loadConfig() {
  businessConfig = Object.freeze(_businessConfig);
  console.log('Business config loaded');
  emailMessages = Object.freeze(_emailMessages);
  console.log('Email messages loaded');
  plotLinesConfig = Object.freeze(_plotLinesConfig);
  console.log('Plot lines config loaded');
}

// Load the configuration once during app startup
loadConfig();

// Export the configuration
module.exports = configs = {
  businessConfig,
  emailMessages,
  plotLinesConfig,
};
