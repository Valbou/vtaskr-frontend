<script>
    import { onMount } from 'svelte'

    import { getLastPathId } from '../../../utils/urls.js'

    import { isAuthenticated } from '../../../domain/users/service.js'

    import { getMe } from '../../../domain/users/api/users_api.js'
    import { getGroupMembers } from '../../../domain/users/api/groups_api.js'
    import { getWaitingInvitations } from '../../../domain/users/api/invitations_api.js'

    import Trans from "../../../libs/i18n/components/Trans.svelte"

    import AddTaskForm from '../../../components/tasks/forms/AddTaskForm.svelte'
    import ScheduledTasks from '../../../components/tasks/ScheduledTasks.svelte'
    import NotScheduledTasks from '../../../components/tasks/NotScheduledTasks.svelte'

    import Spinner from '../../../components/generics/Spinner.svelte'
    import TaskList from '../../../components/tasks/TaskList.svelte'

    import AddMember from '../../../components/users/forms/AddMember.svelte'
    import InvitationsList from '../../../components/users/InvitationsList.svelte'
    import RolesList from '../../../components/users/RolesList.svelte'

    let currentUserData = $state(null)
    let groupId = $state(getLastPathId())
    let isLoading = $state(true)
    let roles = $state([])
    let invitations = $state([])
    let tasks = $state([])
    let newTasks = $state(0)
    let members = $derived(roles.map((r) => r.user))

    let error = $state(null)

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

    async function loadMe() {
        let resMe = await getMe()

        if (resMe.isOk) {
            currentUserData = {...resMe.data}
        } else {
            error = resMe.error
        }
    }

    onMount(async () => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }

        await loadMe()
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
                    <h2><Trans textKey="users:groups:members:title" /> ({ roles.length })</h2>
                </summary>
                <RolesList roles={roles} {updateRole} {deleteRole} />

                <h2><Trans textKey="users:groups:invitations:title" /></h2>
                {#key invitations.length}
                    <InvitationsList invitations={invitations} />
                {/key}
                <AddMember {groupId} {addRole} />
            </details>

            <details class="tasks" open>
                <summary>
                    <h2><Trans textKey="users:groups:tasks:title" vars={roles[0].group} /></h2>
                </summary>

                {#if currentUserData}
                    <AddTaskForm {addTask} defaultGroupId={groupId} members={members} currentUserId={currentUserData.user.id} />
                {/if}

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
