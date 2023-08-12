const translate = {};

/**
 * Get the translations for a specific language json file
 *  @returns {Object} A object with the translated fields
 */
translate.fromSpecific = (languageToUse) => {
  const translations = require(`./jsons/${languageToUse}.json`);
  return translations;
  };

module.exports = translate;