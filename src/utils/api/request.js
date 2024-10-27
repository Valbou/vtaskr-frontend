import { updateAuthHeaders, completeAuthURL, cleanupSession } from '@/users/services/authService.js'

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
        result = await response.json()

        responseObject.code = response.status
        responseObject.error = null
        responseObject.isOk = response.ok

        if (responseObject.isOk) {
            responseObject.data = result
        } else {
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
