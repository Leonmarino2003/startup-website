Use jsons/_languagesAll.json.

Add your translations.

When you're done you can open a new node terminal and execute the the following:

cd frontend/languages
node convertToSeparate.js

This will convert all the translations into separate files. If a translation is missing for a language it will fall back to english. 

You access the translations by importing and using like so:

import translate from "../languages/translate";

let languageToUse = useSelector((state) => {
    return state.user.language;
});
translations = translate.fromSpecific(languageToUse);