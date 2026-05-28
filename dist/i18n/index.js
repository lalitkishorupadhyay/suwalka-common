"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocale = setLocale;
exports.t = t;
const en_1 = require("./locales/en");
const locales = { en: en_1.en };
let activeLocale = 'en';
/** Switch the active locale (call at app startup, e.g. from env). */
function setLocale(locale) {
    activeLocale = locale;
}
/** Look up a message key in the active locale. */
function t(key) {
    return locales[activeLocale][key];
}
//# sourceMappingURL=index.js.map