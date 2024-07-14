<script>
    import Invitation from './Invitation.svelte'

    export let invitations

    function handleDeletedInvitation(event) {
        let deletedInvitation = event.detail.invitation
        invitations = invitations.filter((i) => i.id != deletedInvitation.id)
    }
</script>

<ul>
    {#each invitations as invitation}
        <li><Invitation {invitation} on:message={handleDeletedInvitation} /></li>
    {/each}
</ul>
