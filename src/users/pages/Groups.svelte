<script>
    import { onMount } from 'svelte'

    import { isAuthenticated } from '@/users/services/authService.js'

    import { getAllGroups } from '@/users/api/groups_api.js'

    import GroupList from '../components/GroupList.svelte'
    import Spinner from '@/lib/components/Spinner.svelte'

    let allGroups = getAllGroups()

    onMount(async () => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }
    })
</script>

<section id="groups">
    <h1>All groups you are a member of</h1>
    {#await allGroups}
        <Spinner />
    {:then groups}
        {#if groups && groups.isOk}
            <GroupList groups={groups.data} />
        {:else}
            <p style="color: red">{groups.error}</p>
        {/if}
    {/await}
</section>
