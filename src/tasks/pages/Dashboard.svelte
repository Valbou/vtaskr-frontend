<script>
    import { onMount } from 'svelte'

    import { getStartOfDay, getDistantDayMonth } from '/src/utils/time.js'
    import { getMe } from '../../users/api/users_api.js'

    import { isAuthenticated } from '../../users/services/authService.js'

    import Spinner from '../../lib/components/Spinner.svelte'

    import AddTaskForm from '../components/forms/AddTaskForm.svelte'
    import ScheduledTasks from '../components/ScheduledTasks.svelte'
    import NotScheduledTasks from '../components/NotScheduledTasks.svelte'

    let newTasks = $state(0)
    let current_user = $state(null)
    let isLoading = $state(true)
    let error = $state(null)

    async function loadMe() {
        let resMe = await getMe()

        if (resMe.isOk) {
            current_user = {...resMe.data}
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
    <h1>Dashboard</h1>

    {#if current_user}
        <AddTaskForm {addTask} default_group={current_user.default_group.id} current_user_id={current_user.user.id} />
    {/if}

    {#if error}
        <p style="color: red">{error}</p>
    {:else if isLoading}
        <Spinner />
    {:else}
        {#key newTasks}
            <ScheduledTasks user={current_user.user} />
            <NotScheduledTasks user={current_user.user} />
        {/key}
    {/if}
</section>
