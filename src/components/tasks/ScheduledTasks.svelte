<script>
    import { onMount } from 'svelte'

    import { getStartOfDay, getTomorrow, getNextStartOfWeek, getNextStartOfMonth, getDistantDayMonth } from '../../utils/time'
    import { getUserScheduledTasks, getGroupScheduledTasks, getUserLateTasks, getGroupLateTasks } from '../../domain/tasks/api/tasks_api.js'

    import Trans from "../../libs/i18n/components/Trans.svelte"
    import LateTasks from './LateTasks.svelte'
    import DayTasks from './DayTasks.svelte'
    import WeekTasks from './WeekTasks.svelte'
    import MonthTasks from './MonthTasks.svelte'

    let { user = null, group = null } = $props()

    let tasks = $state([])
    let lateTasks = $state([])
    let isLoading = $state(true)
    let error = $state(null)

    let startPeriodDay = $state(null)
    let startDate = $state(null)
    let endDate = $state(null)
    let daily = $state(true)
    let weekly = $state(false)
    let monthly = $state(false)

    let keyPeriod = $derived(
        startDate && endDate ? `${startDate.toLocaleTimeString()}|${endDate.toLocaleTimeString()}` : ''
    )

    async function loadTasks() {
        let resTasks = null

        if (user) {
            resTasks = await getUserScheduledTasks(startDate, endDate, user.id)
        } else if (group) {
            resTasks = await getGroupScheduledTasks(startDate, endDate, group.id)
        }

        if (resTasks.isOk) {
            tasks = [...resTasks.data]
            isLoading = false
        } else {
            error = resTasks.error
        }
    }

    async function loadLateTasks() {
        let resTasks = null

        let now = new Date()
        let lastYear = getDistantDayMonth(now, -12)

        if (user) {
            resTasks = await getUserLateTasks(lastYear, now, user.id)
        } else if (group) {
            resTasks = await getGroupLateTasks(lastYear, now, group.id)
        }

        if (resTasks.isOk) {
            lateTasks = [...resTasks.data]
            isLoading = false
        } else {
            error = resTasks.error
        }
    }

    async function setDates(start, end) {
        startDate = new Date(start)
        endDate = new Date(end)

        startPeriodDay = getStartOfDay(startDate)

        await loadTasks()
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

    async function setTodayView() {
        daily = true
        weekly = false
        monthly = false

        let today = new Date()
        startPeriodDay = getStartOfDay(today)
        startDate = getStartOfDay(today)
        endDate = getTomorrow(startPeriodDay)

        await setDates(startDate, endDate)
    }

    async function setDailyView() {
        daily = true
        weekly = false
        monthly = false

        endDate = getTomorrow(startPeriodDay)

        await setDates(startPeriodDay, endDate)
    }

    async function setWeeklyView() {
        daily = false
        weekly = true
        monthly = false

        endDate = getNextStartOfWeek(startPeriodDay)

        await setDates(startPeriodDay, endDate)
    }

    async function setMonthlyView() {
        daily = false
        weekly = false
        monthly = true

        endDate = getNextStartOfMonth(startPeriodDay)

        await setDates(startPeriodDay, endDate)
    }

    onMount(async () => {
        let today = new Date()
        startPeriodDay = getStartOfDay(today)
        startDate = getStartOfDay(today)
        endDate = getTomorrow(startPeriodDay)

        await setDates(startDate, endDate)
        await loadLateTasks()
    })
</script>

{#if startDate != null && endDate != null}
    {#key keyPeriod}
        <div>
            {#key lateTasks.length}
                <LateTasks tasks={lateTasks} {deleteTask} {updateTask} />
            {/key}

            <ul class="tab">
                <li onclick={() => setTodayView()}><Trans textKey="tasks:today" /></li>
                <li onclick={() => setDailyView()} class="{daily ? "selected" : ""}"><Trans textKey="tasks:daily" /></li>
                <li onclick={() => setWeeklyView()} class="{weekly ? "selected" : ""}"><Trans textKey="tasks:weekly" /></li>
                <li onclick={() => setMonthlyView()} class="{monthly ? "selected" : ""}"><Trans textKey="tasks:monthly" /></li>
            </ul>

            {#if daily}
                <DayTasks tasks={tasks} {startPeriodDay} {setDates} {deleteTask} {updateTask} />
            {:else if weekly}
                <WeekTasks tasks={tasks} {startPeriodDay} {setDates} {deleteTask} {updateTask} />
            {:else}
                <MonthTasks tasks={tasks} {startPeriodDay} {setDates} {deleteTask} {updateTask} />
            {/if}
        </div>
    {/key}
{/if}

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
