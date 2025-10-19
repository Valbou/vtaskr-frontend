import { updateAuthHeaders, completeAuthURL, cleanupSession } from '../../domain/users/service.js'

export async function request(
    url,
    method = 'GET',
    body = null,
    headers = { 'Content-Type': 'application/json' },
    redirect = true
) {
    headers = updateAuthHeaders(headers)
    url = completeAuthURL(url)

    const requestData = {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
    }

    let result = null
    let responseObject = {
        code: null,
        isOk: false,
        error: null,
        data: null
    }

    try {
        const response = await fetch(url, requestData)
        responseObject.code = response.status
        responseObject.isOk = response.ok

        responseObject.error = null

        if (responseObject.isOk && responseObject.code != 204) {
            result = await response.json()
            responseObject.data = result
        } else {
            result = await response.json()
            responseObject.error = result.error

            if (responseObject.code == 401) {
                cleanupSession()

                if (redirect) {
                    window.location.replace('/')
                }
            }

            throw new Error(`Error ${responseObject.code}: ${responseObject.error}`)
        }
    } catch (errorCaught) {
        responseObject.error = errorCaught.message
    }

    return new Promise((resolve, reject) => {
        resolve(responseObject)
    })
}


export function makeQueryString(args){
    const qs = args.filter(a => a.indexOf('=') > 0).join("&")

    return qs ? `?${qs}` : ''
}
