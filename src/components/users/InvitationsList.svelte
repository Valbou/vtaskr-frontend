<script>
    import Invitation from './Invitation.svelte'

    let { invitations } = $props()

    function handleDeletedInvitation(event) {
        let deletedInvitation = event.detail.invitation
        invitations = invitations.filter((i) => i.id != deletedInvitation.id)
    }
</script>

{#if invitations}
    <ul>
        {#each invitations as invitation}
            <li><Invitation {invitation} onmessage={(e) => handleDeletedInvitation(e)} /></li>
        {/each}
    </ul>
{/if}
