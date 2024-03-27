export function updateToken(tokenValue) {
    localStorage.setItem("token", tokenValue)
}

export function getToken() {
    return localStorage.getItem("token")
}

export function resetToken() {
    localStorage.setItem("token", '')
}
