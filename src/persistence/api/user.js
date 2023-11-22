import { env } from "../../config/config.js"
import { request } from "../../services/api_service.js"

// https://api.vtaskr.com/documentation

export async function register(email, firstName, lastName, password, locale, timezone) {
    const formData = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        locale: locale,
        timezone: timezone,
        password: password,
    }

    const url = env.backend_api + "/api/v1/users/register"
    const response = await request(url, "POST", formData)

    const data = await response.json()
    return data
}

export async function login(email, password) {
    const formData = {
        email: email,
        password: password,
    }

    const url = env.backend_api + "/api/v1/users/login"
    const response = await request(url, "POST", formData)

    const data = await response.json()
    return data
}

export async function confirm2fa(code) {
    const formData = {
        code_2FA: code,
    }

    const url = env.backend_api + "/api/v1/users/2fa"
    const response = await request(url, "POST", formData)

    const data = await response.json()
    return data
}
