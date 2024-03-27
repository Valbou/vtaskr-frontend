import { isAuthenticated } from '@/users/services/authService.js'

export function isUserAuthenticated() {
    return isAuthenticated()
}
