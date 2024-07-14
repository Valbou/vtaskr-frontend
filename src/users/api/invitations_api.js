import { env } from '../../config/config.js'
import { request, svelteRequest } from '../../utils/api/request.js'

export async function createInvitation(invitationDTO) {
    const url = env.backend_api + '/api/v1/invite'
    return request(url, 'POST', invitationDTO)
}
