<script>
    import { getStartOfDay, getStartOfWeek, getPreviousStartOfWeek, getNextStartOfWeek } from '../../utils/time'

    import TaskList from './TaskList.svelte'

    let { day = new Date(), tasks, deleteTask, updateTask } = $props()

    let today = $state(getStartOfDay(day))
    let start = $derived(getStartOfWeek(today))
    let end = $derived(getNextStartOfWeek(today))

    // Keep only tasks scheduled at the given day (today by default)
    let todayTasks = $derived(reFilterTasks())

    function reFilterTasks() {
        return tasks.filter((t) => {
                let taskDate = new Date(t.scheduled_at)
                return start <= taskDate && taskDate < end
            }
        )
    }

    function goNextWeek() {
        today = getNextStartOfWeek(today)
    }

    function goPreviousWeek() {
        today = getPreviousStartOfWeek(today)
    }
</script>

<h2 title="from {start.toLocaleDateString()} {start.toLocaleTimeString()} to {end.toLocaleDateString()} {end.toLocaleTimeString()}">Week {start.toLocaleDateString()} - {end.toLocaleDateString()}</h2>
<div><button onclick={(e) => goPreviousWeek(e)}>Prev</button> <button onclick={(e) => goNextWeek(e)}>Next</button></div>
<TaskList tasks={todayTasks} {deleteTask} {updateTask} />
