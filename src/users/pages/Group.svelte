<script>
    import { onMount } from 'svelte'

    import { isAuthenticated } from '../services/authService.js'
    import { getTenantTasks } from '@/tasks/api/tasks_api.js'
    import { getGroup } from '@/users/api/groups_api.js'

    import Spinner from '@/lib/components/Spinner.svelte'
    import TaskList from '@/tasks/components/TaskList.svelte'

    export let groupId

    onMount(() => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }
    })

    let oneGroup = getGroup(groupId)
    let allTasks = getTenantTasks(groupId)
</script>

<section>
    {#await oneGroup}
        <Spinner />
    {:then group}
        <h1>{ group[0].name }</h1>
        {#if group[0].description}
            <p>{ group[0].description }</p>
        {/if}

        {#await allTasks}
            <Spinner />
        {:then tasks}
            <TaskList {tasks} withAddForm={true} />
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}

</section>
