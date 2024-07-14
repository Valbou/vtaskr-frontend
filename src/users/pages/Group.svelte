<script>
    import { onMount } from 'svelte'

    import { isAuthenticated } from '../services/authService.js'
    import { getTenantTasks } from '@/tasks/api/tasks_api.js'
    import { getGroup, getGroupMembers } from '@/users/api/groups_api.js'


    import Spinner from '@/lib/components/Spinner.svelte'
    import TaskList from '@/tasks/components/TaskList.svelte'
    import AddMember from '@/users/components/forms/AddMember.svelte'

    export let groupId

    onMount(() => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }
    })
    
    let groupRoles = getGroupMembers(groupId)
    let allTasks = getTenantTasks(groupId)

    console.log("DEBUG")
    console.log(async () => await groupRoles)
</script>

<section id="groupPage">
    {#await groupRoles}
        <Spinner />
    {:then roles}
        <h1>Group { roles[0].group.name }</h1>
        {#if roles[0].group.description}
            <p>{ roles[0].group.description }</p>
        {/if}

        <div class="members">
            <h2>Members ({ roles.length })</h2>
            <ul>
                {#each roles as role}
                    <li>{ role.user.first_name } { role.user.last_name } ({ role.roletype.name })</li>
                {/each}
            </ul>
            <h2>Invitations</h2>
            <AddMember {groupId} />
        </div>

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
