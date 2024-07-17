import { env } from '../../config/config.js'
import { request, svelteRequest } from '../../utils/api/request.js'

export async function getAllRoles() {
    const url = env.backend_api + '/api/v1/roles'
    return svelteRequest(url, 'GET')
}

export async function deleteRole(roleId) {
    const url = env.backend_api + '/api/v1/roles/' + roleId
    return svelteRequest(url, 'DELETE')
}
