
export function getLastPathId() {
    let urlPath = window.location.pathname.split('/').filter((s) => s.length > 0)
    return urlPath[urlPath.length - 1]
}

export function getQueryString() {
    return new URLSearchParams(window.location.search)
}
