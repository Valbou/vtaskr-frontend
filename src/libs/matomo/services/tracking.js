import { env } from '../../config/config.js'


export function init_matomo() {
    window._paq = window._paq || [];

    window._paq.push(['trackPageView'])
    window._paq.push(['enableLinkTracking'])

    // TODO: move DOM management to import matomo.js
    (function() {
        var u=env.matomo_host
        window._paq.push(['setTrackerUrl', u+'matomo.php'])
        window._paq.push(['setSiteId', env.matomo_id])

        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s)
    })();
}

export function trackPage(title='', url='') {
    // https://developer.matomo.org/guides/tracking-javascript-guide#custom-page-title

    window._paq.push(['setCustomUrl', url || document.location.pathname + document.location.hash])
    window._paq.push(['setDocumentTitle', title || document.title])
    window._paq.push(['trackPageView'])
}

export function trackEvent(category, action, name, value=0) {
    // https://developer.matomo.org/guides/tracking-javascript-guide#manually-trigger-events

    window._paq.push(['trackEvent', category, action, name, value])
}

export function trackGoal(goalId, value=0) {
    // https://developer.matomo.org/guides/tracking-javascript-guide#manually-trigger-goal-conversions
    // https://matomo.org/faq/reports/manually-trigger-goals-in-matomo/

    window._paq.push(['trackGoal', goalId, value])
}

export function customVar(index, name, value, scope) {
    // https://developer.matomo.org/guides/tracking-javascript-guide#custom-variables-for-visits

    window._paq.push(['setCustomVariable', index, name, value, scope]);
}

export function delCustomVar(index, scope) {
    // https://developer.matomo.org/guides/tracking-javascript-guide#deleting-a-custom-variable

    window._paq.push(['deleteCustomVariable', index, scope]);
}

export function customDimension(dimensionId, dimensionValue) {
    // https://developer.matomo.org/guides/tracking-javascript-guide#tracking-a-custom-dimension-across-tracking-requests

    window._paq.push(['setCustomDimension', dimensionId, dimensionValue]);
}

export function setUserId(userId) {
    // https://developer.matomo.org/guides/tracking-javascript-guide#user-id

    window._paq.push(['setUserId', userId]);
}
