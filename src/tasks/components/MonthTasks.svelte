<script>
    import { getStartOfDay, getStartOfMonth, getNextStartOfMonth, getPreviousStartOfMonth } from '../../utils/time'

    import TaskList from '../components/TaskList.svelte'

    let { day = new Date(), tasks, deleteTask, updateTask } = $props()

    let today = $state(getStartOfDay(day))
    let start = $derived(getStartOfMonth(today))
    let end = $derived(getNextStartOfMonth(today))

    // Keep only tasks scheduled at the given day (today by default)
    let todayTasks = $derived(reFilterTasks())

    function reFilterTasks() {
        return tasks.filter((t) => {
                let taskDate = new Date(t.scheduled_at)
                return start <= taskDate && taskDate < end
            }
        )
    }

    function nextMonth() {
        today = getNextStartOfMonth(today)
    }

    function prevMonth() {
        today = getPreviousStartOfMonth(today)
    }
</script>

<h2 title="from {start.toLocaleDateString()} {start.toLocaleTimeString()} to {end.toLocaleDateString()} {end.toLocaleTimeString()}">{today.toLocaleDateString().slice(3)}</h2>
<div><button onclick={(e) => prevMonth(e)}>Prev</button> <button onclick={(e) => nextMonth(e)}>Next</button></div>
<TaskList tasks={todayTasks} {deleteTask} {updateTask} />
