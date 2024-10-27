<script>
    import { onMount } from 'svelte'

    import { getLastPathId } from '@/utils/urls.js'

    import { isAuthenticated } from '@/users/services/authService.js'
    import { getTenantTasks } from '@/tasks/api/tasks_api.js'

    import { getGroupMembers } from '@/users/api/groups_api.js'
    import { getWaitingInvitations } from '@/users/api/invitations_api.js'

    import Spinner from '@/lib/components/Spinner.svelte'
    import TaskList from '@/tasks/components/TaskList.svelte'

    import AddMember from '@/users/components/forms/AddMember.svelte'
    import InvitationsList from '@/users/components/InvitationsList.svelte'
    import RolesList from '@/users/components/RolesList.svelte'

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

            <div class="members">
                <h2>Members ({ roles.length })</h2>
                <RolesList roles={roles} {updateRole} {deleteRole} />

                <h2>Invitations</h2>
                {#key invitations.length}
                    <InvitationsList invitations={invitations} />
                {/key}
                <AddMember {groupId} {addRole} />
            </div>

            {#if tasks.length > 0}
                <TaskList tasks={tasks} />
            {:else}
                <p>Actually there is no tasks for this group</p>
            {/if}
        {/key}
    {/if}
</section>
