<script>
    import { onMount } from 'svelte'

    import { isAuthenticated } from '../services/authService.js'

    import { getAllGroups } from '../api/groups_api.js'

    import AddGroupForm from '../components/forms/AddGroupForm.svelte'
    import GroupList from '../components/GroupList.svelte'
    import Spinner from '../../lib/components/Spinner.svelte'

    let groups = $state([])
    let isLoading = $state(true)
    let error = $state(null)

    async function loadGroups() {
        let resGroups = await getAllGroups()

        if (resGroups.isOk) {
            groups = [...resGroups.data]
            isLoading = false
        } else {
            error = resGroups.error
        }
    }

    function addGroup(group) {
        groups.push(group)

        return true
    }

    function deleteGroup(group) {
        groups = groups.filter((g) => g.id != group.id)

        return true
    }

    function updateGroup(group) {
        let index = groups.map((e) => e.id).indexOf(group.id);
        groups[index] = group

        return true
    }

    onMount(async () => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }

        await loadGroups()
    })
</script>

<section id="groups">
    <AddGroupForm {addGroup} />

    <h1>All groups you are a member of</h1>
    {#if error}
        <p style="color: red">{error}</p>
    {:else if isLoading}
        <Spinner />
    {:else}
        {#key groups.length}
            <GroupList groups={groups} {deleteGroup} {updateGroup} />
        {/key}
    {/if}
</section>
