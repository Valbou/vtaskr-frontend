<script>
    import { createEventDispatcher } from 'svelte'

    import { cancelInvitation } from '@/users/api/invitations_api.js'

    import Picto from '@/lib/components/Picto.svelte'

    const dispatch = createEventDispatcher()

    export let invitation

    async function deleteInvitation() {
        let result = confirm(`Confirm delete invitation: ${invitation.to_user_email}`)
        if (result) {
            await cancelInvitation(invitation.id)
            sendDelete()
        }
    }

    function sendDelete() {
        dispatch('message', {
            invitation: invitation
        })
    }
</script>

<p>
    { invitation.to_user_email } waiting for acceptation as { invitation.with_roletype.name }
    <span on:click={deleteInvitation} title="Cancel invitation">
        <Picto name="delete" />
    </span>
</p>
