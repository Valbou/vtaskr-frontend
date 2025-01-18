<script>
    import GroupCard from './GroupCard.svelte'

    let { groups = [], deleteGroup, updateGroup } = $props()
</script>

{#if groups.length > 0}
    <ul>
        {#each groups as group}
            <li>
                <GroupCard {group} {deleteGroup} {updateGroup} />
            </li>
        {/each}
    </ul>
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
