
export function getLastPathId() {
    let urlPath = window.location.pathname.split('?')[0].split('/')
    return urlPath[urlPath.length - 1]
}
