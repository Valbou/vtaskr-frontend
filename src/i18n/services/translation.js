import { TRAD } from '../translations/index'

export function getLang() {
    return new Intl.Locale(navigator.language).language
}

export function hydrateVars(content, vars) {
    for (let v in vars) {
        content = content.replace(`{${v}}`, vars[v])
    }

    return content
}

export function getTranslation(lang, key, vars) {
    let text = ""

    if (TRAD[lang] !== undefined) {
        if (TRAD[lang][key] !== undefined) {
            text = TRAD[lang][key]
        } else if (TRAD['en'][key] !== undefined) {
            text = TRAD['en'][key]
        } else {
            text = `${lang}_${key}`
        }
    } else {
        text = getTranslation('en', key)
    }

    return hydrateVars(text, vars)
}

export function getText(textKey, vars = {}) {
    let lang = getLang()
    return getTranslation(lang, textKey, vars)
}
