<script>
    import { getLateTasks } from '../api/tasks_api.js'

    import Spinner from '@/lib/components/Spinner.svelte'
    import TaskList from './TaskList.svelte'

    let allTasks = getLateTasks()
</script>


{#await allTasks}
    <Spinner />
{:then tasks}
    {#if tasks.length > 0}
        <h2>Late Tasks</h2>
        <TaskList {tasks} withAddForm={false} />
    {/if}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
