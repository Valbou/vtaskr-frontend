<script>
    import { onMount } from 'svelte'
    import { logout } from '../api/users_api.js'
    import { resetToken } from '../store/auth.js'
    import { cleanupSession } from '../services/authService.js'

    import Trans from "../../i18n/components/Trans.svelte"
    import LoginRequired from '../components/LoginRequired.svelte'

    onMount(async () => {
        await logout()
        cleanupSession()
    })
</script>

<LoginRequired />

<h1><Trans textKey="users:logout" /></h1>
