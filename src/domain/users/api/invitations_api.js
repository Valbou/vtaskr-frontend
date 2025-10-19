import { env } from '../../../config/config.js'
import { request } from '../../../utils/api/request.js'

export async function createInvitation(invitationDTO) {
    const url = env.backend_api + '/api/v1/invite'
    return request(url, 'POST', invitationDTO)
}

export async function acceptInvitation(inviteHash) {
    const url = env.backend_api + '/api/v1/invite/accepted'
    return request(url, 'POST', {"hash": inviteHash})
}

export async function getWaitingInvitations(groupId) {
    const url = env.backend_api + '/api/v1/group/' + groupId + '/invitations'
    return request(url, 'GET')
}

export async function cancelInvitation(inviteId) {
    const url = env.backend_api + '/api/v1/invite/' + inviteId
    return request(url, 'DELETE')
}
