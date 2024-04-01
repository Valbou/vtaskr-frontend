import { env } from '@/config/config.js'
import { request, svelteRequest } from '@/utils/api/request.js'

export async function getAllTasks() {
    const url = env.backend_api + '/api/v1/tasks'
    return svelteRequest(url, 'GET')
}

export async function createTasks(task) {
    const url = env.backend_api + '/api/v1/tasks'
    return request(url, 'POST', JSON.stringify(task))
}

export async function deleteTasks(taskId) {
    const url = env.backend_api + '/api/v1/tasks/id'
    return request(url, 'DELETE')
}
