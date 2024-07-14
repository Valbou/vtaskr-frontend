<script>
    import { onMount } from 'svelte'

    import LoginRequired from '../components/LoginRequired.svelte'
    import { acceptInvitation } from '../api/invitations_api.js'

    export let inviteHash

    onMount(async () => {
        let role = await acceptInvitation(inviteHash)
        window.location.replace('/group/' + role.group_id)
    })
</script>

<LoginRequired />
