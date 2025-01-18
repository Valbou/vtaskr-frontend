<script>
    import { onMount } from 'svelte'

    import { getMe } from '../../users/api/users_api.js'
    import { getAllTasks } from '../api/tasks_api.js'

    import { isAuthenticated } from '../../users/services/authService.js'

    import Spinner from '../../lib/components/Spinner.svelte'

    import AddTaskForm from '../components/forms/AddTaskForm.svelte'
    import LateTasks from '../components/LateTasks.svelte'
    import DayTasks from '../components/DayTasks.svelte'
    import WeekTasks from '../components/WeekTasks.svelte'
    import MonthTasks from '../components/MonthTasks.svelte'
    import NotScheduledTasks from '../components/NotScheduledTasks.svelte'

    let tasks = $state([])
    let current_user = $state(null)
    let isLoading = $state(true)
    let error = $state(null)

    async function loadTasks() {
        // TODO: limit to 1 month before today and 3 month after
        // Send reload function to extend dates if sublist view need it
        let resTasks = await getAllTasks()

        if (resTasks.isOk) {
            tasks = [...resTasks.data]
            isLoading = false
        } else {
            error = resTasks.error
        }
    }

    async function loadMe() {
        let resMe = await getMe()

        if (resMe.isOk) {
            current_user = {...resMe.data}
        } else {
            error = resMe.error
        }
    }

    function addTask(task) {
        tasks.push(task)

        return true
    }

    function deleteTask(task) {
        tasks = tasks.filter((t) => t.id != task.id)

        return true
    }

    function updateTask(task) {
        let index = tasks.map((e) => e.id).indexOf(task.id);
        tasks[index] = task

        return true
    }

    let daily = $state(true)
    let weekly = $state(false)
    let monthly = $state(false)

    function setDailyView() {
        daily = true
        weekly = false
        monthly = false
    }

    function setWeeklyView() {
        daily = false
        weekly = true
        monthly = false
    }

    function setMonthlyView() {
        daily = false
        weekly = false
        monthly = true
    }

    onMount(async () => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }

        await loadTasks()
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
        {#key tasks.length}
            <LateTasks tasks={tasks} {deleteTask} {updateTask} />

            <ul class="tab">
                <li onclick={() => setDailyView()} class="{daily ? "selected" : ""}">Daily</li>
                <li onclick={() => setWeeklyView()} class="{weekly ? "selected" : ""}">Weekly</li>
                <li onclick={() => setMonthlyView()} class="{monthly ? "selected" : ""}">Monthly</li>
            </ul>

            {#if daily}
                <DayTasks tasks={tasks} {deleteTask} {updateTask} />
            {:else if weekly}
                <WeekTasks tasks={tasks} {deleteTask} {updateTask} />
            {:else}
                <MonthTasks tasks={tasks} {deleteTask} {updateTask} />
            {/if}

            <NotScheduledTasks tasks={tasks} {deleteTask} {updateTask} />
        {/key}
    {/if}
</section>

<style>
    ul.tab {
        list-style: none;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .tab li {
        padding: 8px 20px;
        border: 1px solid var(--lb);
        border-radius: 10px;
        cursor: pointer;
    }

    .tab li.selected {
        opacity: 0.5;
    }
</style>
