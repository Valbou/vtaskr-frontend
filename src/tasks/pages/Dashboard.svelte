<script>
    import { onMount } from 'svelte'

    import { getAllTasks } from '../api/tasks_api.js'

    import Spinner from '@/lib/components/Spinner.svelte'
    import TaskList from '@/tasks/components/TaskList.svelte'
    
    import AddTaskForm from '@/tasks/components/forms/AddTaskForm.svelte'
    import LateTasks from '@/tasks/components/LateTasks.svelte'
    import DayTasks from '@/tasks/components/DayTasks.svelte'
    import NotScheduledTasks from '@/tasks/components/NotScheduledTasks.svelte'
    import MenuSecondary from '@/tasks/components/MenuSecondary.svelte'

    let tasks = $state([])
    let isChanged = $state(0)

    async function loadTasks() {
        let resTasks = await getAllTasks()
        tasks = [...resTasks.data]
        isChanged += 1

        console.log(tasks.length)
    }

    onMount(async () => {
        await loadTasks()
    })

    function addTask(task) {
        tasks.push(task)

        console.log(`Add (total ${tasks.length})`)
        isChanged += 1
        return true
    }

    function deleteTask(task, confirm=true) {
        tasks = tasks.filter((t) => t.id != task.id)

        console.log(`Delete (left ${tasks.length})`)
        isChanged += 1
        return true
    }

    function updateTask(task) {
        let index = tasks.map((e) => e.id).indexOf(task.id);
        tasks[index] = task

        console.log(`Update (total ${tasks.length})`)
        isChanged += 1
        return true
    }
</script>

<section>
    <h1>Dashboard</h1>

    <AddTaskForm {addTask} />

    {#if isChanged == 0}
        <Spinner />
    {/if}

    {#if isChanged > 0}
        {#key tasks.length}
            <LateTasks tasks={tasks} {deleteTask} {updateTask} />
            <DayTasks tasks={tasks} {deleteTask} {updateTask} />
            <NotScheduledTasks tasks={tasks} {deleteTask} {updateTask} />
        {/key}
    {/if}
</section>
