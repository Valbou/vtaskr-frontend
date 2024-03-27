import { getToken, resetToken } from '../store/auth.js'


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

export function cleanupSession() {
    resetToken()
}
