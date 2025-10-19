<script>
    import { onMount } from 'svelte'
    import { logout } from '../../../domain/users/api/users_api.js'
    import { resetToken } from '../../../domain/users/store/auth.js'
    import { cleanupSession } from '../../../domain/users/service.js'

    import Trans from "../../../libs/i18n/components/Trans.svelte"
    import LoginRequired from './LoginRequired.svelte'

    onMount(async () => {
        await logout()
        cleanupSession()
    })
</script>

<LoginRequired />

<h1><Trans textKey="users:logout" /></h1>
