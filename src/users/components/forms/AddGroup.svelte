<script>
    import { createEventDispatcher } from 'svelte'

    import { createGroup } from '@/users/api/groups_api.js'
    import { GroupDTO } from '@/users/api/groups_dto.js'
    import { updateToken } from '../../store/auth.js'

    import Toast from '@/lib/components/Toast.svelte'

    const dispatch = createEventDispatcher()

    let group = new GroupDTO('', '')

    let validatedGroup = null
    let groupState = false

    let groupResult = null
    let groupError = null
    let showMessage = false

    async function handleSubmit() {
        ;[groupState, validatedGroup] = group.getValidatedObjectFields()
        showMessage = true

        if (groupState) {
            ;[groupResult, groupError] = await createGroup(group)

            updateToken(groupResult.token)

            if (groupResult && groupResult.name == group.name) {
                sendGroup(groupResult)
            }
        }
    }

    function sendGroup(groupResult) {
        dispatch('message', {
            group: groupResult
        })
    }
</script>

{#if groupError}
    <Toast typeMessage="error" bind:showMessage>
        <p slot="message">
            {groupError}
        </p>
    </Toast>
{/if}

<form class="form newgroup" method="post" action="#" on:submit|preventDefault={() => handleSubmit()}>
    <h1>Add a New Group</h1>
    <div>
        <label for="name">Name</label>
        {#if validatedGroup && validatedGroup.name}
            <p class="error">{validatedGroup.name}</p>
        {/if}
        <input type="text" id="name" name="name" bind:value={group.name} />
    </div>
    <div>
        <label for="description">Description</label>
        {#if validatedGroup && validatedGroup.description}
            <p class="error">{validatedGroup.description}</p>
        {/if}
        <input type="text" id="description" name="description" bind:value={group.description} />
    </div>
    <div>
        <button>Create</button>
    </div>
</form>
