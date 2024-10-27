<script>
    import { onMount } from 'svelte'

    import { getAllTasks } from '../api/tasks_api.js'

    import Spinner from '@/lib/components/Spinner.svelte'
    
    import AddTaskForm from '@/tasks/components/forms/AddTaskForm.svelte'
    import LateTasks from '@/tasks/components/LateTasks.svelte'
    import DayTasks from '@/tasks/components/DayTasks.svelte'
    import NotScheduledTasks from '@/tasks/components/NotScheduledTasks.svelte'
    import MenuSecondary from '@/tasks/components/MenuSecondary.svelte'

    let tasks = $state([])
    let isLoading = $state(true)
    let error = $state(null)

    async function loadTasks() {
        let resTasks = await getAllTasks()

        if (resTasks.isOk) {
            tasks = [...resTasks.data]
            isLoading = false
        } else {
            error = resTasks.error
        }
    }

    onMount(async () => {
        await loadTasks()
    })

    function addTask(task) {
        tasks.push(task)

        return true
    }

    function deleteTask(task, confirm=true) {
        tasks = tasks.filter((t) => t.id != task.id)

        return true
    }

    function updateTask(task) {
        let index = tasks.map((e) => e.id).indexOf(task.id);
        tasks[index] = task

        return true
    }
</script>

<section>
    <h1>Dashboard</h1>

    <AddTaskForm {addTask} />

    {#if error}
        <p style="color: red">{error}</p>
    {:else if isLoading}
        <Spinner />
    {:else}
        {#key tasks.length}
            <LateTasks tasks={tasks} {deleteTask} {updateTask} />
            <DayTasks tasks={tasks} {deleteTask} {updateTask} />
            <NotScheduledTasks tasks={tasks} {deleteTask} {updateTask} />
        {/key}
    {/if}
</section>
