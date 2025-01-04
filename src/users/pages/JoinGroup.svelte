<script>
    import { onMount } from 'svelte'

    import { getQueryString } from '@/utils/urls.js'

    import LoginRequired from '../components/LoginRequired.svelte'
    import { acceptInvitation } from '../api/invitations_api.js'

    let inviteHash = $state(null)

    onMount(async () => {
        let params = getQueryString()
        inviteHash = params.get("hash")

        let role = await acceptInvitation(inviteHash)
        window.location.replace('/group/' + role.data.group_id)
    })
</script>

<LoginRequired />
