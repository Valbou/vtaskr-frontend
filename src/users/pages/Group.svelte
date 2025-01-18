<script>
    import { onMount } from 'svelte'

    import { getLastPathId } from '../../utils/urls.js'

    import { isAuthenticated } from '../services/authService.js'
    import { getTenantTasks } from '../../tasks/api/tasks_api.js'

    import { getGroupMembers } from '../api/groups_api.js'
    import { getWaitingInvitations } from '../api/invitations_api.js'

    import AddTaskForm from '../../tasks/components/forms/AddTaskForm.svelte'
    import LateTasks from '../../tasks/components/LateTasks.svelte'
    import DayTasks from '../../tasks/components/DayTasks.svelte'
    import NotScheduledTasks from '../../tasks/components/NotScheduledTasks.svelte'

    import Spinner from '../../lib/components/Spinner.svelte'
    import TaskList from '../../tasks/components/TaskList.svelte'

    import AddMember from '../components/forms/AddMember.svelte'
    import InvitationsList from '../components/InvitationsList.svelte'
    import RolesList from '../components/RolesList.svelte'

    let groupId = $state(getLastPathId())
    let isLoading = $state(true)
    let roles = $state([])
    let invitations = $state([])
    let tasks = $state([])

    let error = $state(null)

    onMount(async () => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }

        let groupRoles = await getGroupMembers(groupId)
        let allTasks = await getTenantTasks(groupId)
        let invitationsWaiting = await getWaitingInvitations(groupId)

        if (groupRoles.isOk && invitationsWaiting.isOk && allTasks.isOk) {
            roles = [...groupRoles.data]
            invitations = [...invitationsWaiting.data]
            tasks = [...allTasks.data]

            isLoading = false
        } else {
            error = `${groupRoles.error} ${invitationsWaiting.error} ${allTasks.error}`
        }
    })

    function addRole(role) {
        roles.push(role)
    }

    function deleteRole(role) {
        roles = roles.filter((r) => r.id != r.id)
    }

    function updateRole(role) {
        let index = roles.map((e) => e.id).indexOf(role.id);
        roles[index] = role
    }

    function addTask(task) {
        tasks.push(task)

        return true
    }

    function deleteTask(task, confirm=true) {
        tasks = tasks.filter((t) => t.id != task.id)

        return true
    }

    function updateTask(task) {
        let index = tasks.map((e) => e.id).indexOf(task.id);
        tasks[index] = task

        return true
    }
</script>

<section id="groupPage">
    {#if isLoading}
        <Spinner />
    {:else}
        {#key roles.length}
            <h1>Group { roles[0].group.name }</h1>
            {#if roles[0].group.description}
                <p>{ roles[0].group.description }</p>
            {/if}

            <details class="members">
                <summary>
                    <h2>Members ({ roles.length })</h2>
                </summary>
                <RolesList roles={roles} {updateRole} {deleteRole} />

                <h2>Invitations</h2>
                {#key invitations.length}
                    <InvitationsList invitations={invitations} />
                {/key}
                <AddMember {groupId} {addRole} />
            </details>

            <details class="tasks" open>
                <summary>
                    <h2>{ roles[0].group.name } Tasks</h2>
                </summary>
                <AddTaskForm {addTask} default_group={groupId} />
                {#if tasks.length > 0}
                    {#key tasks.length}
                        <LateTasks tasks={tasks} {deleteTask} {updateTask} />
                        <DayTasks tasks={tasks} {deleteTask} {updateTask} />
                        <NotScheduledTasks tasks={tasks} {deleteTask} {updateTask} />
                    {/key}
                {:else}
                    <p>Actually there is no tasks for this group</p>
                {/if}
            </details>
        {/key}
    {/if}
</section>

<style>
    details.tasks {
        margin: 20px 0;
    }
</style>
