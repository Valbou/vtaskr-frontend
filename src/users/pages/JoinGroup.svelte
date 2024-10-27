<script>
    import { onMount } from 'svelte'

    import { getLastPathId } from '@/utils/urls.js'

    import LoginRequired from '../components/LoginRequired.svelte'
    import { acceptInvitation } from '../api/invitations_api.js'

    let inviteHash = $state(getLastPathId())

    onMount(async () => {
        inviteHash = params.hash

        let role = await acceptInvitation(inviteHash)
        window.location.replace('/group/' + role.data.group_id)
    })
</script>

<LoginRequired />
