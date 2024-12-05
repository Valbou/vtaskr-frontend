<script>
    import { createEventDispatcher } from 'svelte'

    import { createGroup } from '../../api/groups_api.js'
    import { GroupDTO } from '../../api/groups_dto.js'
    import { updateToken } from '../../store/auth.js'

    import Toast from '@/lib/components/Toast.svelte'

    const dispatch = createEventDispatcher()

    let group = $state(new GroupDTO('', ''))

    let validatedGroup = $state(null)
    let groupState = $state(false)

    let groupResult = $state(null)

    function cleanResult() {
        groupResult = null
    }

    async function handleSubmit(e) {
        e.preventDefault()
        ;[groupState, validatedGroup] = group.getValidatedObjectFields()

        if (groupState) {
            ;groupResult = await createGroup(group)

            updateToken(groupResult.data.token)

            if (groupResult.data && groupResult.data.name == group.name) {
                sendGroup(groupResult.data)
            }
        }
    }

    function sendGroup(groupResult) {
        dispatch('message', {
            group: groupResult.data
        })
    }
</script>

{#snippet message(groupResult)}
    {#if groupResult.isOk}
        <p>
            Group {groupResult.data.name} created.
        </p>
    {:else if groupResult && !groupResult.isOk}
        <p>
            {groupResult.error}
        </p>
    {/if}
{/snippet}

{#if groupResult}
    <Toast {message} result={groupResult} clean={cleanResult} />
{/if}

<form class="form newgroup" method="post" action="#" onsubmit={(e) => handleSubmit(e)}>
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
