<script>
    import { onMount } from 'svelte'

    import LoginRequired from '../components/LoginRequired.svelte'
    import { acceptInvitation } from '../api/invitations_api.js'

    const { inviteHash } = $props()

    onMount(async () => {
        let role = await acceptInvitation(inviteHash)
        window.location.replace('/group/' + role.data.group_id)
    })
</script>

<LoginRequired />
