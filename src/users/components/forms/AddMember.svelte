<script>
    import { createInvitation } from '../../api/invitations_api.js'
    import { getGroupRoletypes } from '../../api/roletypes_api.js'
    import { InvitationDTO } from '../../api/invitations_dto.js'

    import Trans from "../../../i18n/components/Trans.svelte"
    import Spinner from '../../../lib/components/Spinner.svelte'
    import Toast from '../../../lib/components/Toast.svelte'

    let { groupId, addRole } = $props()

    let invitation = $state(new InvitationDTO('', groupId, ''))

    let validatedInvitation = $state(null)
    let invitationState = $state(false)

    let inviteResult = $state(null)

    function cleanResult() {
        inviteResult = null
    }

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

{#snippet message(inviteResult)}
    {#if inviteResult.isOk}
        <p>
            <Trans textKey="users:forms:add_member:success" vars={inviteResult.data} />
        </p>
    {:else if inviteResult && !inviteResult.isOk}
        <p>
            {inviteResult.error}
        </p>
    {/if}
{/snippet}

{#if inviteResult}
    <Toast {message} result={inviteResult} clean={cleanResult} />
{/if}

<form class="form newmember" method="post" action="#" onsubmit={(e) => handleSubmit(e)}>
    <div>
        <div class="subgroup">
            {#if validatedInvitation && validatedInvitation.to_user_email}
                <p class="error">{validatedInvitation.to_user_email}</p>
            {/if}
            <input type="hidden" id="group" name="in_group_id" bind:value={invitation.in_group_id} />
            <input type="email" id="email" name="to_user_email" bind:value={invitation.to_user_email} placeholder="new-user@example.com" />
        </div>

        <div class="subgroup">
            {#await groupRoletypes}
                <Spinner />
            {:then roletypes}
                {#if roletypes.isOk}
                    <select id="roletype" name="with_roletype_id" bind:value={invitation.with_roletype_id}>
                        <option value="" disabled><Trans textKey="users:forms:add_membre:option_title" /></option>
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
        </div>

        <button><Trans textKey="users:forms:add_membre:invite" /></button>
    </div>
</form>

<style>
    .form {
        padding: 10px;
        border: 1px solid var(--light);
        border-radius: 10px;
    }

    .form div {
        margin: 0;
    }

    .form .subgroup {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0;
    }

    select {
        width: 100%;
    }
</style>
