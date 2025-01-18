<script>
    import { getStartOfDay, getTomorrow } from '../../utils/time'

    import TaskList from './TaskList.svelte'

    let { tasks, deleteTask, updateTask } = $props()

    let today = new Date()
    let start = getStartOfDay(today)
    let end = getTomorrow(start)

    // Keep only tasks not done and scheduled in the past
    let notScheduledTasks = tasks.filter((t) => {
            let taskDone = !!t.done ? new Date(t.done) : null
            return !t.scheduled_at && (!t.done || (start <= taskDone && taskDone < end))
        }
    )
</script>

{#if notScheduledTasks && notScheduledTasks.length > 0}
    <h2>Not Scheduled</h2>
    <TaskList tasks={notScheduledTasks} {deleteTask} {updateTask} />
{/if}
