import { isAuthenticated, getAllUserGroups } from '@/users/services/authService.js'

export function isUserAuthenticated() {
    return isAuthenticated()
}

export async function getAllUserTenants() {
    return await getAllUserGroups()
}
