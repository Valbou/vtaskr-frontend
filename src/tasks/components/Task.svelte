<script>
    import { deleteTasks } from '../api/tasks_api.js'

    import Picto from '@/global/components/Picto.svelte'
    import Chips from '@/global/components/Chips.svelte'
    import Tag from './Tag.svelte'

    export let task
    $: eisenhower = task.emergency
        ? task.important
            ? 'Do it'
            : 'Delegate it'
        : task.important
          ? 'Schedule it'
          : 'Delete it'
    $: isDone = !!task.done

    const important = 'Important'
    const emergency = 'Emergency'

    function changeDoneState() {
        task.done = !task.done
    }

    function deleteTask(event) {
        item = event.currentTarget().parent().parent()
        let result = confirm(`Confirm delete task: ${item.dataset.title}`)
        if (result) {
            deleteTasks(item.dataset.id)
        }
    }
</script>

<div class="task">
    <div class="tasktitle">
        <label>
            <input type="checkbox" on:change={changeDoneState} value={task.done} />
            <h4 class={isDone ? 'done' : ''}>{task.title}</h4>
        </label>
    </div>
    <div>
        <span class="schedule"><Picto name="schedule" /> {task.scheduled_at || '--/--/--'}</span>
        <span class="duration"><Picto name="duration" /> {task.duration || '--:--'}</span>
        <span
            class="eisenhower"
            title="{task.emergency ? emergency : ''} {task.important ? important : ''}"
            ><Chips content={eisenhower} /></span
        >
    </div>
    {#if task.tags}
        <div>
            {#each task.tags as tag}
                <Tag {tag} />
            {/each}
        </div>
    {/if}
    <div class="actions" data-id={task.id} data-title={task.title}>
        {#if task.groups}
            {#each task.groups as group}
                <span><Picto name="groups" /> group</span>
            {/each}
        {/if}
        <span><Picto name="edit" /></span>
        <span on:click={deleteTask}><Picto name="delete" /></span>
    </div>
</div>

<style>
    h4 {
        margin: 10px 0px;
    }

    .task {
        border: 1px dashed var(--db);
        padding: 20px;
        position: relative;
    }

    .task input {
        width: 1rem;
    }

    .task > div {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .task .tasktitle label {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
    }

    .task .tasktitle .done {
        text-decoration: line-through;
        color: var(--mb);
    }

    .task .actions {
        position: absolute;
        top: 5px;
        right: 5px;
    }

    .actions span {
        cursor: pointer;
    }
</style>
