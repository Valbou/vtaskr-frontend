<script>
    import { createEventDispatcher } from 'svelte'

    import { cancelInvitation } from '../../domain/users/api/invitations_api.js'

    import Trans from "../../libs/i18n/components/Trans.svelte"
    import Picto from '../generics/Picto.svelte'

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
    { invitation.to_user_email } <Trans textKey="users:invitation:waiting_acceptation" /> { invitation.with_roletype.name }
    <button on:click={deleteInvitation} title="Cancel invitation">
        <Picto name="delete" />
    </button>
</p>
