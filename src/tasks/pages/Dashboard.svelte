<script>
    import { onMount } from 'svelte'
    import { getAllTasks } from '../api/tasks_api.js'

    import Spinner from '@/global/components/Spinner.svelte'
    import TaskList from '../components/TaskList.svelte'

    let allTasks = getAllTasks()
</script>

<h1>Dashboard</h1>

{#await allTasks}
    <Spinner />
{:then tasks}
    <TaskList {tasks} withAddForm={true} />
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
