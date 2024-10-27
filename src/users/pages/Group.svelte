<script>
    import { onMount } from 'svelte'

    import { isAuthenticated } from '../services/authService.js'
    import { getTenantTasks } from '@/tasks/api/tasks_api.js'

    import { getGroup, getGroupMembers } from '@/users/api/groups_api.js'
    import { getWaitingInvitations } from '@/users/api/invitations_api.js'

    import Spinner from '@/lib/components/Spinner.svelte'
    import TaskList from '@/tasks/components/TaskList.svelte'

    import AddMember from '@/users/components/forms/AddMember.svelte'
    import InvitationsList from '@/users/components/InvitationsList.svelte'
    import RolesList from '@/users/components/RolesList.svelte'

    const { groupId } = $props()

    onMount(() => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }
    })

    let groupRoles = getGroupMembers(groupId)
    let allTasks = getTenantTasks(groupId)
    let invitationsWaiting = getWaitingInvitations(groupId)
</script>

<section id="groupPage">
    {#await groupRoles}
        <Spinner />
    {:then roles}
        {#if roles.isOk && roles.data.length > 0}
            <h1>Group { roles.data[0].group.name }</h1>
            {#if roles.data[0].group.description}
                <p>{ roles.data[0].group.description }</p>
            {/if}

            <div class="members">
                <h2>Members ({ roles.data.length })</h2>
                <RolesList roles={roles.data} />

                <h2>Invitations</h2>
                {#await invitationsWaiting}
                    <Spinner />
                {:then invitations}
                    {#if invitations.isOk}
                        <InvitationsList invitations={invitations.data} />
                    {:else}
                        <p style="color: red">{invitations.error}</p>
                    {/if}
                {/await}
                <AddMember {groupId} />
            </div>

            {#await allTasks}
                <Spinner />
            {:then tasks}
                {#if tasks.isOk}
                    <TaskList tasks={tasks.data} withAddForm={true} />
                {:else}
                    <p style="color: red">{tasks.error}</p>
                {/if}
            {/await}
        {:else}
            <p style="color: red">{roles.error}</p>
        {/if}
    {/await}
</section>
