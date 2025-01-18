<script>
    import Task from './Task.svelte'

    let { tasks = [], deleteTask, updateTask } = $props()
</script>

{#if tasks.length > 0}
    <ul>
        {#each tasks as task}
            <li>
                <Task {task} {deleteTask} {updateTask} />
            </li>
        {/each}
    </ul>
{:else}
    <p>Actually no tasks are waiting to be done.<br />Good job ! You could take a break.</p>
{/if}

<style>
    ul {
        list-style-type: none;
        margin: 20px 0px;
        padding: 0;
    }

    p {
        text-align: center;
        font-size: 1.2rem;
    }
</style>
