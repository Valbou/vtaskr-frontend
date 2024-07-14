<script>
    import { createInvitation } from '../../api/invitations_api.js'
    import { getGroupRoletypes } from '../../api/roletypes_api.js'
    import { InvitationDTO } from '../../api/invitations_dto.js'

    import Spinner from '@/lib/components/Spinner.svelte'
    import Toast from '@/lib/components/Toast.svelte'

    export let groupId

    let invitation = new InvitationDTO('', groupId, '')

    let validatedInvitation = null
    let invitationState = false

    let inviteResult = null
    let inviteError = null

    async function handleSubmit() {
        ;[invitationState, validatedInvitation] = invitation.getValidatedObjectFields()

        if (invitationState) {
            ;[inviteResult, inviteError] = await createInvitation(invitation)
        }
    }

    let groupRoletypes = getGroupRoletypes(groupId)
</script>

{#if inviteResult}
    <Toast typeMessage="success">
        <p slot="message">
            Invitation to join group sent to {inviteResult.to_user_email}.
        </p>
    </Toast>
{:else if inviteError}
    <Toast typeMessage="error">
        <p slot="message">
            {inviteError}
        </p>
    </Toast>
{/if}

<form class="form newmember" method="post" action="#" on:submit|preventDefault={() => handleSubmit()}>
    <div>
        {#if validatedInvitation && validatedInvitation.to_user_email}
            <p class="error">{validatedInvitation.to_user_email}</p>
        {/if}
        <input type="hidden" id="group" name="in_group_id" bind:value={invitation.in_group_id} />
        <input type="email" id="email" name="to_user_email" bind:value={invitation.to_user_email} />

        {#await groupRoletypes}
            <Spinner />
        {:then roletypes}
            <select id="roletype" name="with_roletype_id" bind:value={invitation.with_roletype_id}>
                <option value="" disabled>-- Role --</option>
                {#each roletypes as roletype}
                    {#if roletype.group_id == groupId || roletype.group_id == null}
                        <option value={roletype.id}>{roletype.name}</option>
                    {/if}
                {/each}
            </select>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}

        <button>Invite</button>
    </div>
</form>
