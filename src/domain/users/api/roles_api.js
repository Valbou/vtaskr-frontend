import { env } from '../../../config/config.js'
import { request } from '../../../utils/api/request.js'

export async function deleteRole(roleId) {
    const url = env.backend_api + '/api/v1/roles/' + roleId
    return request(url, 'DELETE')
}
