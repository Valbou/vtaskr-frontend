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
    let error = null

    try {
        const response = await fetch(url, requestData)
        result = await response.json()
        error = null

        if (!response.ok) {
            if (response.status == 401) {
                cleanupSession()

                if (redirect) {
                    window.location.replace('/')
                }
            }

            throw new Error(`Error ${result.status}: ${result.error}`)
        }
    } catch (errorCaught) {
        result = null
        error = errorCaught.message
    }

    return [result, error]
}

export async function svelteRequest(
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

    const response = await fetch(url, requestData)

    if (!response.ok) {
        if (response.status == 401) {
            cleanupSession()

            if (redirect) {
                window.location.replace('/')
            }
        }

        throw new Error(`Error ${response.status}: ${response.body}`)
    }

    return response.json()
}
