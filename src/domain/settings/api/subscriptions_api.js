import { env } from '../../../config/config.js'
import { request } from '../../../utils/api/request.js'

export async function getAllSubscriptions() {
    const url = `${env.backend_api}/api/v1/subscriptions`
    return request(url, 'GET')
}

export async function addSubscription(subscription) {
    const url = `${env.backend_api}/api/v1/subscriptions`
    return request(url, 'POST', subscription)
}

export async function deleteSubscription(subscriptionId) {
    const url = `${env.backend_api}/api/v1/subscriptions/${subscriptionId}`
    return request(url, 'DELETE')
}
