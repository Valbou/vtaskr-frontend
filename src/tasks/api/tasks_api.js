import { env } from '@/config/config.js'
import { request } from '@/utils/api/request.js'
import { getStartOfDay, getTomorrow } from '@/utils/time'

export async function getAllTasks() {
    const url = env.backend_api + '/api/v1/tasks'
    return request(url, 'GET')
}

export async function getOneDayTasks(day) {
    let start = getStartOfDay(day)
    let end = getTomorrow(start)

    const url = `${env.backend_api}/api/v1/tasks?scheduled_at_gte=${start.toISOString()}&scheduled_at_lt=${end.toISOString()}&orderby=scheduled_at`
    return request(url, 'GET')
}

export async function getNotScheduledTasks() {
    const url = `${env.backend_api}/api/v1/tasks?scheduled_at_eq=null&orderby=created_at`
    return request(url, 'GET')
}

export async function getLateTasks() {
    let today = new Date()

    const url = `${env.backend_api}/api/v1/tasks?scheduled_at_lt=${today.toISOString()}&done_eq=null`
    return request(url, 'GET')
}

export async function getTenantTasks(tenantId) {
    const url = env.backend_api + '/api/v1/tasks?tenant_id_eq=' + tenantId
    return request(url, 'GET')
}

export async function createTasks(task) {
    const url = env.backend_api + '/api/v1/tasks'
    return request(url, 'POST', task)
}

export async function updateTasks(task) {
    const url = env.backend_api + `/api/v1/task/${task.id}`
    return request(url, 'PUT', task)
}

export async function deleteTasks(taskId) {
    const url = env.backend_api + `/api/v1/task/${taskId}`
    return request(url, 'DELETE')
}
