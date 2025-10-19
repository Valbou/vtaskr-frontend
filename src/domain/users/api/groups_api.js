import { env } from '../../../config/config.js'
import { request } from '../../../utils/api/request.js'

export async function getAllGroups() {
    const url = env.backend_api + '/api/v1/groups'
    return request(url, 'GET')
}

export async function getGroup(groupId) {
    const url = env.backend_api + '/api/v1/group/' + groupId
    return request(url, 'GET')
}

export async function createGroup(groupDTO) {
    const url = env.backend_api + '/api/v1/groups'
    return request(url, 'POST', groupDTO)
}

export async function deleteGroups(groupId) {
    const url = env.backend_api + `/api/v1/group/${groupId}`
    return request(url, 'DELETE')
}

export async function updateGroups(group) {
    const url = env.backend_api + `/api/v1/group/${group.id}`
    return request(url, 'PUT', group)
}

export async function getGroupMembers(groupId) {
    const url = env.backend_api + '/api/v1/group/' + groupId + "/members"
    return request(url, 'GET')
}
