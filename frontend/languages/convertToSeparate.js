// Converts _languagesAll.json to separate language files in the json folder. 
// It will fall back to English if a translation is missing for a language.

// To run:
// change directory to frontend\languages
// node convertToSeparate.js

const fs = require('fs');
const _READ_PATH = './jsons/_languagesAll.json';
const _WRITE_PATH = './jsons/';




fs.readFile(_READ_PATH, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
      }
    
      try {
        const translations = JSON.parse(data);
    
        // Extract all the language codes
        const languageCodes = Object.keys(translations[Object.keys(translations)[0]]);
    
        // Iterate over each language code
        languageCodes.forEach((languageCode) => {
          const languageData = {};
    
          // Iterate over each key in the translations
          for (const key in translations) {
            if (translations.hasOwnProperty(key)) {
              const translation = translations[key][languageCode];
    
              // If the translation is missing for the current language, fallback to English
              languageData[key] = translation || translations[key]['en-GB'];
            }
          }
    
          // Write the translations for the current language code to a separate file
          const filename = `${languageCode}.json`;
          fs.writeFile(`${_WRITE_PATH + filename}`, JSON.stringify(languageData, null, 2), 'utf8', (err) => {
            if (err) {
              console.error(`Error writing ${filename}:`, err);
              return;
            }
    
            console.log(`${filename} successfully created.`);
          });
        });
      } catch (error) {
        console.error('Error parsing the JSON:', error);
      }
    });



//`.json/${filename}`