<script>
    import { getStartOfDay, getStartOfWeek, getPreviousStartOfWeek, getNextStartOfWeek } from '../../utils/time'
    import { filterTasksByDate } from '../utils/tasks.js'

    import TaskList from './TaskList.svelte'

    let { tasks, startPeriodDay, setDates, deleteTask, updateTask } = $props()

    let start = $derived(getStartOfWeek(startPeriodDay))
    let end = $derived(getNextStartOfWeek(start))

    let periodTasks = $derived(filterTasksByDate(tasks, start, end))

    async function goNextWeek() {
        let newStart = getNextStartOfWeek(start)
        let newEnd = getNextStartOfWeek(end)
        await setDates(newStart, newEnd)
    }

    async function goPreviousWeek() {
        let newStart = getPreviousStartOfWeek(start)
        let newEnd = getPreviousStartOfWeek(end)
        await setDates(newStart, newEnd)
    }
</script>

<h2 title="from {start.toLocaleDateString()} {start.toLocaleTimeString()} to {end.toLocaleDateString()} {end.toLocaleTimeString()}">Week {start.toLocaleDateString()} - {end.toLocaleDateString()}</h2>
<div>
    <button onclick={(e) => goPreviousWeek(e)}>Prev</button>
    <button onclick={(e) => goNextWeek(e)}>Next</button>
</div>

<TaskList tasks={periodTasks} {deleteTask} {updateTask} />
