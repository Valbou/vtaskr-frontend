<script>
    import { deleteTasks, updateTasks } from '../api/tasks_api.js'

    import Picto from '../../lib/components/Picto.svelte'
    import Chips from '../../lib/components/Chips.svelte'
    import Tag from './Tag.svelte'

    let { task, deleteTask, updateTask } = $props()

    let eisenhower = $derived.by(() => {
        return task.emergency
            ? task.important
                ? 'Do it'
                : 'Delegate it'
            : task.important
            ? 'Schedule it'
            : 'Delete it'
    })

    let isDone = $derived(!!task.done)
    let isLate = $derived(task.scheduled_at ? (new Date(task.scheduled_at)) < (new Date()) : false)
    let checked = $derived(isDone ? "checked" : "")

    const important = 'Important'
    const emergency = 'Emergency'

    async function changeDoneState() {
        task.done = !task.done

        if (task.done) {
            task.done = (new Date()).toISOString()
        }
        else {
            task.done = null
        }

        await updateTasks(task)
        updateTask(task)
    }

    async function removeTask() {
        let rm_confirm = confirm(`Confirm delete task: ${task.title}`)
        if (rm_confirm) {
            const result = await deleteTasks(task.id)
            console.log(result)
            if (result.isOk) {
                deleteTask(task)
            }
        }
    }
</script>

<div class="task{isLate ? ' late' : ''}{isDone ? ' done' : ''}">
    <div class="tasktitle">
        <label>
            <input type="checkbox" onchange={() => changeDoneState()} {checked} />
            <h4>{task.title}</h4>
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
    <div class="actions">
        {#if task.groups}
            {#each task.groups as group}
                <span><Picto name="groups" /> group</span>
            {/each}
        {/if}
        <button><Picto name="edit" /></button>
        <button onclick={() => removeTask()}><Picto name="delete" /></button>
    </div>
</div>

<style>
    h4 {
        margin: 10px 0px;
    }

    .task {
        border: 1px dashed var(--db);
        padding: 5px 20px;
        position: relative;
    }

    .task.late {
        border: 1px dashed var(--error);
    }

    .task.done {
        border: 1px dashed var(--success);
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

    .task.done .tasktitle {
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

    .task button {
        background-color: transparent;
        padding: 2px 10px;
    }

    .task button:hover {
        background-color: transparent;
        color: var(--lb);
    }
</style>
