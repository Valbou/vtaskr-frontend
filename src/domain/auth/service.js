import { isAuthenticated, getAllUserGroups } from '../users/service.js'

export function isUserAuthenticated() {
    return isAuthenticated()
}

export async function getAllUserTenants() {
    return await getAllUserGroups()
}
