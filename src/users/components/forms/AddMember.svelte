<script>
    import { createInvitation } from '../../api/invitations_api.js'
    import { getGroupRoletypes } from '../../api/roletypes_api.js'
    import { InvitationDTO } from '../../api/invitations_dto.js'

    import Spinner from '@/lib/components/Spinner.svelte'
    import Toast from '@/lib/components/Toast.svelte'

    let { groupId, addRole } = $props()

    let invitation = new InvitationDTO('', groupId, '')

    let validatedInvitation = $state(null)
    let invitationState = $state(false)

    let inviteResult = $state(null)

    async function handleSubmit(e) {
        e.preventDefault()
        ;[invitationState, validatedInvitation] = invitation.getValidatedObjectFields()

        if (invitationState) {
            ;inviteResult = await createInvitation(invitation)
            if (inviteResult.isOk) {
                addRole(inviteResult.data)
                e.target.reset()
            }
        }
    }

    let groupRoletypes = getGroupRoletypes(groupId)
</script>

{#if inviteResult && inviteResult.isOk}
    <Toast typeMessage="success" message={messageOk} />
    {#snippet messageOk()}
        <p>
            Invitation to join group sent to {inviteResult.data.to_user_email}.
        </p>
    {/snippet}
{:else if inviteResult && !inviteResult.isOk}
    <Toast typeMessage="error" message={messageKo} />
    {#snippet messageKo()}
        <p>
            {inviteResult.error}
        </p>
    {/snippet}
{/if}

<form class="form newmember" method="post" action="#" onsubmit={(e) => handleSubmit(e)}>
    <div>
        {#if validatedInvitation && validatedInvitation.to_user_email}
            <p class="error">{validatedInvitation.to_user_email}</p>
        {/if}
        <input type="hidden" id="group" name="in_group_id" bind:value={invitation.in_group_id} />
        <input type="email" id="email" name="to_user_email" bind:value={invitation.to_user_email} />

        {#await groupRoletypes}
            <Spinner />
        {:then roletypes}
            {#if roletypes.isOk}
                <select id="roletype" name="with_roletype_id" bind:value={invitation.with_roletype_id}>
                    <option value="" disabled>-- Role --</option>
                    {#each roletypes.data as roletype}
                        {#if roletype.group_id == groupId || roletype.group_id == null}
                            <option value={roletype.id}>{roletype.name}</option>
                        {/if}
                    {/each}
                </select>
            {:else}
                <p style="color: red">{roletypes.error}</p>
            {/if}
        {/await}

        <button>Invite</button>
    </div>
</form>
