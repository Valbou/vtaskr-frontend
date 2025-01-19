<script>
    import { getStartOfDay, getTomorrow, getYesterday } from '../../utils/time'
    import { filterTasksByDate } from '../utils/tasks.js'

    import TaskList from '../components/TaskList.svelte'

    let { tasks, startPeriodDay, setDates, deleteTask, updateTask } = $props()

    let start = $derived(startPeriodDay)
    let end = $derived(getTomorrow(startPeriodDay))

    let periodTasks = $derived(filterTasksByDate(tasks, start, end))

    async function goTomorrow() {
        let newStart = getTomorrow(start)
        let newEnd = getTomorrow(end)
        await setDates(newStart, newEnd)
    }

    async function goYesterday() {
        let newStart = getYesterday(start)
        let newEnd = getYesterday(end)
        await setDates(newStart, newEnd)
    }
</script>

<h2 title="from {start.toLocaleDateString()} {start.toLocaleTimeString()} to {end.toLocaleDateString()} {end.toLocaleTimeString()}">{start.toLocaleDateString()}</h2>
<div>
    <button onclick={(e) => goYesterday(e)}>Prev</button>
    <button onclick={(e) => goTomorrow(e)}>Next</button>
</div>

<TaskList tasks={periodTasks} {deleteTask} {updateTask} />
