<script>
    import { getStartOfMonth, getNextStartOfMonth, getPreviousStartOfMonth } from '../../utils/time'
    import { filterTasksByDate } from '../utils/tasks.js'

    import TaskList from '../components/TaskList.svelte'

    let { tasks, startPeriodDay, setDates, deleteTask, updateTask } = $props()

    let start = $derived(getStartOfMonth(startPeriodDay))
    let end = $derived(getNextStartOfMonth(start))

    let periodTasks = $derived(filterTasksByDate(tasks, start, end))

    async function nextMonth() {
        let newStart = getNextStartOfMonth(start)
        let newEnd = getNextStartOfMonth(end)
        await setDates(newStart, newEnd)
    }

    async function prevMonth() {
        let newStart = getPreviousStartOfMonth(start)
        let newEnd = getPreviousStartOfMonth(end)
        await setDates(newStart, newEnd)
    }
</script>

<h2 title="from {start.toLocaleDateString()} {start.toLocaleTimeString()} to {end.toLocaleDateString()} {end.toLocaleTimeString()}">{start.toLocaleDateString().slice(3)}</h2>
<div>
    <button onclick={(e) => prevMonth(e)}>Prev</button>
    <button onclick={(e) => nextMonth(e)}>Next</button>
</div>

{#key periodTasks.length }
    <TaskList tasks={periodTasks} {deleteTask} {updateTask} />
{/key}
