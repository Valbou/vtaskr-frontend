<script>
    import TaskList from './TaskList.svelte'

    let { tasks, deleteTask, updateTask } = $props()

    let now = new Date()

    // Keep only tasks not done and scheduled in the past
    let lateTasks = tasks.filter((t) => {
            let taskDate = !!t.scheduled_at ? new Date(t.scheduled_at) : null
            return taskDate && taskDate < now && !t.done
        }
    )
</script>

{#if lateTasks && lateTasks.length > 0}
    <h2>Late Tasks</h2>
    <TaskList tasks={lateTasks} {deleteTask} {updateTask} />
{/if}
