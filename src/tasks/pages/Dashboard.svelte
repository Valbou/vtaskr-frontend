<script>
    import { onMount } from 'svelte'

    import { getStartOfDay, getDistantDayMonth } from '/src/utils/time.js'
    import { getMe } from '../../users/api/users_api.js'

    import { isAuthenticated } from '../../users/services/authService.js'

    import Trans from "../../i18n/components/Trans.svelte"
    import Spinner from '../../lib/components/Spinner.svelte'

    import AddTaskForm from '../components/forms/AddTaskForm.svelte'
    import ScheduledTasks from '../components/ScheduledTasks.svelte'
    import NotScheduledTasks from '../components/NotScheduledTasks.svelte'

    let newTasks = $state(0)
    let currentUserData = $state(null)
    let isLoading = $state(true)
    let error = $state(null)

    async function loadMe() {
        let resMe = await getMe()

        if (resMe.isOk) {
            currentUserData = {...resMe.data}
            isLoading = false
        } else {
            error = resMe.error
        }
    }

    function addTask() {
        newTasks += 1

        return true
    }

    onMount(async () => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }

        await loadMe()
    })
</script>

<section>
    <h1><Trans textKey="global:dashboard" /></h1>

    {#if currentUserData}
        <AddTaskForm {addTask} defaultGroupId={currentUserData.default_group.id} members={[currentUserData.user]} currentUserId={currentUserData.user.id} />
    {/if}

    {#if error}
        <p style="color: red">{error}</p>
    {:else if isLoading}
        <Spinner />
    {:else}
        {#key newTasks}
            <ScheduledTasks user={currentUserData.user} />
            <NotScheduledTasks user={currentUserData.user} />
        {/key}
    {/if}
</section>
