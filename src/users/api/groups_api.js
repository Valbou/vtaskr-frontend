import { env } from '../../config/config.js'
import { request, svelteRequest } from '../../utils/api/request.js'

export async function getAllGroups() {
    const url = env.backend_api + '/api/v1/groups'
    return svelteRequest(url, 'GET')
}

export async function getGroup(groupId) {
    const url = env.backend_api + '/api/v1/group/' + groupId
    return request(url, 'GET')
}

export async function createGroup(groupDTO) {
    const url = env.backend_api + '/api/v1/groups'
    return request(url, 'POST', groupDTO)
}
