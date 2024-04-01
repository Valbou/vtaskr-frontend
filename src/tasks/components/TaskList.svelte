<script>
    import Task from './Task.svelte'

    import AddTaskForm from './forms/AddTaskForm.svelte'

    export let tasks = []
    export let withAddForm = true

    function handleNewTask(event) {
        let newTask = event.detail.task
        tasks = [...tasks, newTask]
    }

    function handleDeletedTask(event) {
        let deletedTask = event.detail.task
        tasks = tasks.filter((t) => t.id != deletedTask.id)
    }
</script>

{#if withAddForm}
    <AddTaskForm on:message={handleNewTask} />
{/if}

{#if tasks.length > 0}
    <ul>
        {#each tasks as task}
            <li><Task {task} on:message={handleDeletedTask} /></li>
        {/each}
    </ul>
{:else}
    <p>Actually no tasks are waiting to be done.</p>
{/if}

<style>
    ul {
        list-style-type: none;
        margin: 20px 0px;
        padding: 0;
    }
</style>
