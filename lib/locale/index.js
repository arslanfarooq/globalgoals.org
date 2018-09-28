const y18n = require('y18n')
const { inBrowser } = require('../components/base/utils')

/**
 * Include locales in browser build
 */

const LANGUAGES = {
  en: require('./en'),
  // ar: require('./ar'),
  zh: require('./zh'),
  es: require('./es'),
  fr: require('./fr'),
  ja: require('./ja'),
  ru: require('./ru'),
  sv: require('./sv')
}

const LANGUAGE_MAP = {
  en: 'en-us',
  ar: 'ar-eg',
  zh: 'zh-cn',
  es: 'es-mx',
  fr: 'fr-fr',
  ja: 'ja-jp',
  ru: 'ru',
  sv: 'sv-se'
}

const options = {
  directory: __dirname,
  locale: process.env.GLOBALGOALS_LANG || 'en'
}

/**
 * Adaption for browser bundle
 */

if (inBrowser || typeof self !== 'undefined') {
  options.updateFiles = false
}

const my18n = module.exports = y18n(options)

/**
 * Expose languages on instance
 */

my18n.languages = LANGUAGES

/**
 * Map language short code to proper (Prismic friendly) ISO format
 * @param {string} lang Language short code
 */

my18n.getCode = function (lang) {
  return LANGUAGE_MAP[lang]
}

/**
 * Get short code for language code
 * @param {string} code Language code
 */

my18n.getShortCode = function (code) {
  return Object.keys(LANGUAGE_MAP).find(key => LANGUAGE_MAP[key] === code)
}

/**
 * Extend y18n with custom (static) `_readLocaleFile`
 */

if (inBrowser || typeof self !== 'undefined') {
  my18n._readLocaleFile = () => {
    my18n.cache[my18n.locale] = LANGUAGES[my18n.locale]
  }
}
