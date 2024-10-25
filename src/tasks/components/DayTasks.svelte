<script>
    import { getOneDayTasks } from '../api/tasks_api.js'

    import Spinner from '@/lib/components/Spinner.svelte'
    import TaskList from '../components/TaskList.svelte'

    export let day = new Date()

    let allTasks = getOneDayTasks(day)
</script>


{#await allTasks}
    <Spinner />
{:then tasks}
    <h1>{day.toLocaleDateString()}</h1>
    <TaskList {tasks} withAddForm={true} />
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
