<script>
    import { onMount } from 'svelte'

    import { getStartOfDay, getTomorrow } from '../../utils/time'
    import { getUserNotScheduledTasks, getGroupNotScheduledTasks } from '../api/tasks_api.js'

    import TaskList from './TaskList.svelte'

    let { user } = $props()

    let tasks = $state([])
    let isLoading = $state(true)
    let error = $state(null)

    let start = getStartOfDay(new Date())

    // Keep only tasks not done or done before today
    let notScheduledTasks = $derived(tasks.filter((t) => {
            let taskDone = !!t.done ? new Date(t.done) : null
            return !t.done || start <= taskDone
        })
    )

    async function loadTasks() {
        let resTasks = null

        if (user) {
            resTasks = await getUserNotScheduledTasks(user.id)
        } else if (group) {
            resTasks = await getGroupNotScheduledTasks(group.id)
        }

        if (resTasks.isOk) {
            tasks = [...resTasks.data]
            isLoading = false
        } else {
            error = resTasks.error
        }
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

    onMount(async () => {
        await loadTasks()
    })
</script>

{#if notScheduledTasks && notScheduledTasks.length > 0}
    <h2>Not Scheduled</h2>
    <TaskList tasks={notScheduledTasks} {deleteTask} {updateTask} />
{/if}
