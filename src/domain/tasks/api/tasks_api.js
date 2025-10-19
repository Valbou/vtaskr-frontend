import { env } from '../../../config/config.js'
import { request, makeQueryString } from '../../../utils/api/request.js'

export async function getUserScheduledTasks(startDate, endDate, userId = null) {
    const qsArgs = [
        `scheduled_at_gte=${startDate.toISOString()}`,
        `scheduled_at_lt=${endDate.toISOString()}`,
        `orderby=scheduled_at`,
        userId ? `assigned_to_eq=${userId}` : '',
    ]

    const querystring = makeQueryString(qsArgs)
    const url = `${env.backend_api}/api/v1/tasks${querystring}`
    return request(url, 'GET')
}

export async function getGroupScheduledTasks(startDate, endDate, groupId = null) {
    const qsArgs = [
        `scheduled_at_gte=${startDate.toISOString()}`,
        `scheduled_at_lt=${endDate.toISOString()}`,
        `orderby=scheduled_at`,
        groupId ? `tenant_id_eq=${groupId}` : '',
    ]

    const querystring = makeQueryString(qsArgs)
    const url = `${env.backend_api}/api/v1/tasks${querystring}`
    return request(url, 'GET')
}

export async function getUserNotScheduledTasks(userId = null) {
    const qsArgs = [
        `scheduled_at_eq=null`,
        `orderby=created_at`,
        userId ? `assigned_to_eq=${userId}` : '',
    ]

    const querystring = makeQueryString(qsArgs)
    const url = `${env.backend_api}/api/v1/tasks${querystring}`
    return request(url, 'GET')
}

export async function getGroupNotScheduledTasks(groupId = null) {
    const qsArgs = [
        `scheduled_at_eq=null`,
        `orderby=created_at`,
        groupId ? `tenant_id_eq=${groupId}` : '',
    ]

    const querystring = makeQueryString(qsArgs)
    const url = `${env.backend_api}/api/v1/tasks${querystring}`
    return request(url, 'GET')
}

export async function getUserLateTasks(startDate, endDate, userId = null) {
    const qsArgs = [
        `scheduled_at_gte=${startDate.toISOString()}`,
        `scheduled_at_lt=${endDate.toISOString()}`,
        `orderby=scheduled_at`,
        `done__isnull=true`,
        userId ? `assigned_to_eq=${userId}` : '',
    ]

    const querystring = makeQueryString(qsArgs)
    const url = `${env.backend_api}/api/v1/tasks${querystring}`
    return request(url, 'GET')
}

export async function getGroupLateTasks(startDate, endDate, groupId = null) {
    const qsArgs = [
        `scheduled_at_gte=${startDate.toISOString()}`,
        `scheduled_at_lt=${endDate.toISOString()}`,
        `orderby=scheduled_at`,
        `done__isnull=true`,
        groupId ? `tenant_id_eq=${groupId}` : '',
    ]

    const querystring = makeQueryString(qsArgs)
    const url = `${env.backend_api}/api/v1/tasks${querystring}`
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
