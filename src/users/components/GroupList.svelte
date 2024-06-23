<script>
    import GroupCard from './GroupCard.svelte'
    import AddGroup from './forms/AddGroup.svelte'

    export let groups = []
    export let withAddForm = true

    function handleNewGroup(event) {
        let newGroup = event.detail.group
        groups = [...groups, newGroup]
    }

    function handleDeletedGroup(event) {
        let deletedGroup = event.detail.group
        groups = groups.filter((g) => g.id != deletedGroup.id)
    }
</script>

{#if groups.length > 0}
<ul>
    {#each groups as group}
        <li>
            <GroupCard {group} />
        </li>
    {/each}
</ul>
{/if}

{#if withAddForm}
    <AddGroup on:message={handleNewGroup} />
{/if}

<style>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        padding: 20px;
        border: 1px solid var(--lb);
        border-radius: 10px;
    }
</style>
