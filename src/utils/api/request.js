import { updateAuthHeaders, cleanupSession } from '@/users/services/authService.js'

export async function request(url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) {
    headers = updateAuthHeaders(headers)

    const requestData = {
        method: method,
        headers: headers,
        body: body,
    }

    let result = null
    let error = null

    try {
        const response = await fetch(url, requestData)
        result = await response.json()
        if (!response.ok) {
            if (response.status == 401) {
                cleanupSession()
                window.location.replace('/login')
            }

            throw new Error(`Error ${result.status}: ${result.error}`)
        }
    }
    catch (errorCaught) {
        result = null
        error = errorCaught.message
    }

    return [result, error]
}
