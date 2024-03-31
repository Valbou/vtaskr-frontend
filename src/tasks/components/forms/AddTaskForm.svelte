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

<form class="form create-task" method="post" on:submit|preventDefault={() => handleSubmit()}>
    <div>
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
    <div class="subgroup">
        <div>
            <label><input type="checkbox" bind:checked={task.important} /> Important</label>
        </div>
        <div>
            <label><input type="checkbox" bind:checked={task.emergency} /> Emergency</label>
        </div>
    </div>
    <div class="subgroup">
        <hr />
        <span>more</span>
        <hr />
    </div>
    <div class="subgroup">
        <div>
            <label for="group">Group</label>
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
