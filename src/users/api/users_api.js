import { env } from '../../config/config.js'
import { request } from '../../utils/api/request.js'

export async function register(userDTO) {
    const url = env.backend_api + '/api/v1/users/register'
    return request(url, 'POST', userDTO)
}

export async function authenticate(loginDTO) {
    const url = env.backend_api + '/api/v1/users/login'
    return request(
        url, 'POST', loginDTO, { 'Content-Type': 'application/json' }, false
    )
}

export async function mfa(mfaDTO) {
    const url = env.backend_api + '/api/v1/users/2fa'
    return request(
        url, 'POST', mfaDTO, { 'Content-Type': 'application/json' }, false
    )
}

export async function logout() {
    const url = env.backend_api + '/api/v1/users/logout'
    return request(url, 'POST', {})
}
