<script>
    import { getStartOfDay, getTomorrow } from '@/utils/time'

    import TaskList from '../components/TaskList.svelte'

    let { day = new Date(), tasks, deleteTask, updateTask } = $props()

    let start = getStartOfDay(day)
    let end = getTomorrow(start)

    // Keep only tasks scheduled at the given day (today by default)
    let todayTasks = tasks.filter((t) => {
            let taskDate = new Date(t.scheduled_at)
            return start <= taskDate && taskDate < end
        }
    )
</script>

<h2>{day.toLocaleDateString()}</h2>
<TaskList tasks={todayTasks} {deleteTask} {updateTask} />
