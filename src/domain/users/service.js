import { getToken, resetToken } from './store/auth.js'
import { getAllGroups } from './api/groups_api.js'

export function isAuthenticated() {
    // Not a guarantee !
    // Token can be manually set by end user

    let token = getToken()
    if (token && token.length > 20) {
        return true
    }
    return false
}

export function updateAuthHeaders(headers) {
    if (isAuthenticated()) {
        let token = getToken()
        headers['Authorization'] = `Bearer ${token}`
    }

    return headers
}

export function completeAuthURL(url) {
    let token = getToken()

    if (url.indexOf('?') > 0) {
        url += "&"
    }
    else {
        url += "?"
    }
    url += "token=" + token

    return url
}

export function getAuthToken() {
    return getToken()
}

export function cleanupSession() {
    resetToken()
}

export async function getAllUserGroups() {
    return await getAllGroups()
}
