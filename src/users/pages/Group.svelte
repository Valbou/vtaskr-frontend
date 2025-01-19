<script>
    import { onMount } from 'svelte'

    import { getLastPathId } from '../../utils/urls.js'

    import { isAuthenticated } from '../services/authService.js'

    import { getGroupMembers } from '../api/groups_api.js'
    import { getWaitingInvitations } from '../api/invitations_api.js'

    import AddTaskForm from '/src/tasks/components/forms/AddTaskForm.svelte'
    import ScheduledTasks from '/src/tasks/components/ScheduledTasks.svelte'
    import NotScheduledTasks from '/src/tasks/components/NotScheduledTasks.svelte'

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
    let newTasks = $state(0)

    let error = $state(null)

    onMount(async () => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }

        let groupRoles = await getGroupMembers(groupId)
        let invitationsWaiting = await getWaitingInvitations(groupId)

        if (groupRoles.isOk && invitationsWaiting.isOk) {
            roles = [...groupRoles.data]
            invitations = [...invitationsWaiting.data]

            isLoading = false
        } else {
            error = `${groupRoles.error} ${invitationsWaiting.error}`
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

    function addTask() {
        newTasks += 1

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

                {#key newTasks}
                    <ScheduledTasks group={roles[0].group} />
                    <NotScheduledTasks group={roles[0].group} />
                {/key}
            </details>
        {/key}
    {/if}
</section>

<style>
    details.tasks {
        margin: 20px 0;
    }
</style>
