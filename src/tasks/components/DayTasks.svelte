<script>
    import { getStartOfDay, getTomorrow, getYesterday } from '@/utils/time'

    import TaskList from '../components/TaskList.svelte'

    let { day = new Date(), tasks, deleteTask, updateTask } = $props()

    let today = $state(day)
    let start = $derived(getStartOfDay(today))
    let end = $derived(getStartOfDay(getTomorrow(today)))

    // Keep only tasks scheduled at the given day (today by default)
    let todayTasks = $derived(reFilterTasks())

    function reFilterTasks() {
        return tasks.filter((t) => {
                let taskDate = new Date(t.scheduled_at)
                return start <= taskDate && taskDate < end
            }
        )
    }

    function goTomorrow() {
        today = getStartOfDay(getTomorrow(today))
    }

    function goYesterday() {
        today = getStartOfDay(getYesterday(today))
    }
</script>

<h2 title="from {start.toLocaleDateString()} {start.toLocaleTimeString()} to {end.toLocaleDateString()} {end.toLocaleTimeString()}">{today.toLocaleDateString()}</h2>
<div><button onclick={(e) => goYesterday(e)}>Prev</button> <button onclick={(e) => goTomorrow(e)}>Next</button></div>
<TaskList tasks={todayTasks} {deleteTask} {updateTask} />
