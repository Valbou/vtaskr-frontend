<script>
    import { getAllGroups } from '@/users/api/groups_api.js'

    import GroupList from '../components/GroupList.svelte'
    import Spinner from '@/lib/components/Spinner.svelte'

    let allGroups = getAllGroups()
</script>

<section id="groups">
    <h1>All groups you are a member of</h1>
    {#await allGroups}
        <Spinner />
    {:then groups}
        {#if groups.isOk}
            <GroupList groups={groups.data} />
        {:else}
            <p style="color: red">{groups.error}</p>
        {/if}
    {/await}
</section>
