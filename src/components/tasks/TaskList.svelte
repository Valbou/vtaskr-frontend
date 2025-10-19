<script>
    import Task from './Task.svelte'
    import Trans from "../../libs/i18n/components/Trans.svelte"

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
    <p>
        <Trans textKey="tasks:all_done_1" /><br />
        <Trans textKey="tasks:all_done_2" />
    </p>
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
