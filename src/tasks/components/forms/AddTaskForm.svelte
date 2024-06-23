<script>
    import { createEventDispatcher } from 'svelte'

    import { createTasks } from '../../api/tasks_api.js'
    import { TaskDTO } from '../../api/tasks_dto.js'

    import SelectTenant from '@/lib/iam/SelectTenant.svelte'
    import Toast from '@/lib/components/Toast.svelte'

    const dispatch = createEventDispatcher()

    let task = new TaskDTO('', '', '', false, false, '', '')

    let validatedTask = null
    let taskState = false

    let taskResult = null
    let taskError = null
    let showMessage = false

    async function handleSubmit() {
        ;[taskState, validatedTask] = task.getValidatedObjectFields()
        showMessage = true

        if (taskState) {
            ;[taskResult, taskError] = await createTasks(task)
            if (taskResult && taskResult.title == task.title) {
                sendTask(taskResult)
            }
        }
    }

    function sendTask(taskResult) {
        dispatch('message', {
            task: taskResult
        })
    }
</script>

{#if taskError}
    <Toast typeMessage="error" bind:showMessage>
        <p slot="message">
            {taskError}
        </p>
    </Toast>
{/if}

<form class="form create-task" method="post" action="#" on:submit|preventDefault={() => handleSubmit()}>
    <div class="tasktitle">
        {#if validatedTask && validatedTask.title}
            <p class="error">{validatedTask.title}</p>
        {/if}
        <input
            type="text"
            id="title"
            name="title"
            placeholder="Task title - What to do ?"
            bind:value={task.title}
        />
    </div>
    <div class="subgroup eisenhower">
        <div class="subgroup">
            <input type="checkbox" id="importanttask" bind:checked={task.important} />
            <label for="importanttask">Important</label>
        </div>
        <div class="subgroup">
            <input type="checkbox" id="emergencytask" bind:checked={task.emergency} />
            <label for="emergencytask">Emergency</label>
        </div>
    </div>
    <div class="subgroup">
        <hr />
        <span>more</span>
        <hr />
    </div>
    <div class="subgroup">
        <div class="subgroup">
            {#if validatedTask && validatedTask.tenant_id}
                <p class="error">{validatedTask.tenant_id}</p>
            {/if}
            <SelectTenant bind:value={task.tenant_id} name="group" />
        </div>
        <div>
            <button>Add</button>
        </div>
    </div>
</form>

<style>
    .form {
        padding: 10px;
        border: 1px solid var(--light);
        border-radius: 10px;
    }

    .form div {
        margin: 0;
    }

    .form .subgroup {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .subgroup hr {
        min-width: 30%;
    }
</style>
