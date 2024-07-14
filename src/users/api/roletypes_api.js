import { env } from '../../config/config.js'
import { request, svelteRequest } from '../../utils/api/request.js'

export async function getGroupRoletypes() {
    const url = env.backend_api + '/api/v1/roletypes'
    return svelteRequest(url, 'GET')
}
