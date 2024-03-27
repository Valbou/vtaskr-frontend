<script>
    import { onMount } from 'svelte'
    import { logout } from '../api/users_api.js'
    import { resetToken } from '../store/auth.js'
    import { cleanupSession } from '../services/authService.js'

    import LoginRequired from '../components/LoginRequired.svelte'

    onMount(async () => {
        await logout()
        cleanupSession()
    })
</script>

<LoginRequired />

<h1>See you soon !</h1>
