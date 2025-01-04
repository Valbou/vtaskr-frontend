<script>
    import { Link } from 'svelte-routing'
    import { deleteGroups, updateGroups } from '../api/groups_api.js'

    import Spinner from '@/lib/components/Spinner.svelte'
    import Picto from '@/lib/components/Picto.svelte'

    let { group, deleteGroup, updateGroup } = $props()

    async function removeGroup() {
        let rm_confirm = confirm(`Confirm delete group: ${group.name}`)
        if (rm_confirm) {
            const result = await deleteGroups(group.id)
            if (result.isOk) {
                deleteGroup(group)
            }
        }
    }
</script>

<div>
    <h3>{ group.name }</h3>
    <p>{ group.description }</p>

    <Link class="button" to="/group/{group.id}">Go</Link>
    {#if !group.is_private || group.name != "Private"}
        <button onclick={() => removeGroup()}><Picto name="delete" /></button>
    {/if}
</div>
