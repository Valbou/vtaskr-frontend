
export async function request(url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) {
    const requestData = {
        method: method,
        headers: headers,
        body: body,
    }

    const response = await fetch(url, requestData)

    return response
}
