<script>
    import { createEventDispatcher } from 'svelte'

    import { createGroup } from '../../api/groups_api.js'
    import { GroupDTO } from '../../api/groups_dto.js'

    import Trans from "../../../i18n/components/Trans.svelte"
    import Toast from '../../../lib/components/Toast.svelte'

    const dispatch = createEventDispatcher()

    let group = $state(new GroupDTO('', '', true))

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
            <Trans textKey="users:forms:add_group:title" vars={groupResult.data} />
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
    <h1><Trans textKey="users:forms:add_group:title" /></h1>
    <div>
        <label for="name"><Trans textKey="users:forms:add_group:name" /></label>
        {#if validatedGroup && validatedGroup.name}
            <p class="error">{validatedGroup.name}</p>
        {/if}
        <input type="text" id="name" name="name" bind:value={group.name} />
    </div>
    <div>
        <label for="description"><Trans textKey="users:forms:add_group:description" /></label>
        {#if validatedGroup && validatedGroup.description}
            <p class="error">{validatedGroup.description}</p>
        {/if}
        <input type="text" id="description" name="description" bind:value={group.description} />
    </div>
    <div>
        <div class="subgroup">
            <input type="checkbox" id="is_private" bind:checked={group.is_private} defaultChecked={true} />
            <label for="is_private"><Trans textKey="users:forms:add_group:private" /></label>
        </div>
    </div>
    <div>
        <button><Trans textKey="users:forms:add_group:create" /></button>
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
        justify-content: space-around;
        align-items: center;
        margin: 5px 0;
    }

    .form .subgroup input {
        width: auto;
    }
</style>
