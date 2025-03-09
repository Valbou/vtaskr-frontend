import { TRAD } from "../translations/index"

export function getLang() {
    return new Intl.Locale(navigator.language).language
}

export function getTranslation(lang, key) {
    if (TRAD[lang] !== undefined) {
        if (TRAD[lang][key] !== undefined) {
            return TRAD[lang][key]
        }
        else if (TRAD["en"][key] !== undefined) {
            return TRAD["en"][key]
        }
        else {
            return `${lang}_${key}`
        }
    }
    else {
        getTranslation("en", key)
    }
}

export function getText(textKey) {
    let lang = getLang()
    return getTranslation(lang, textKey)
}
