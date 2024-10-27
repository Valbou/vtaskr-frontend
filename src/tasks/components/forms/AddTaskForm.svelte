<script>
    import { createEventDispatcher } from 'svelte'

    import { createTasks } from '../../api/tasks_api.js'
    import { TaskDTO } from '../../api/tasks_dto.js'

    import SelectTenant from '@/lib/iam/SelectTenant.svelte'
    import Toast from '@/lib/components/Toast.svelte'

    let { addTask } = $props()

    let task = new TaskDTO('', '', '', false, false, '', '', null)

    let validatedTask = $state(null)
    let taskState = $state(false)

    let taskResult = $state(null)
    let showMessage = $state(false)
    let more = $state(false)

    async function extendForm() {
        more = !more
    }

    async function handleSubmit(e) {
        e.preventDefault()
        ;[taskState, validatedTask] = task.getValidatedObjectFields()
        showMessage = true

        if (taskState) {
            ;taskResult = await createTasks(task)
            if (taskResult.isOk && taskResult.data.title == task.title) {
                addTask(taskResult.data)
                e.target.reset()
            }
        }
    }
</script>

{#if taskResult != null && !taskResult.isOk}
    <Toast typeMessage="error" bind:showMessage {message} />
    {#snippet message()}
        <p>
            {taskResult.error}
        </p>
    {/snippet}
{/if}

<form
    class="form create-task"
    method="post"
    action="#"
    onsubmit={(e) => handleSubmit(e)}
>
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
            tabindex="0"
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
        {#if more}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <span
                onclick={extendForm}
                role="button"
                aria-expanded="true"
                title="Reduce form size to add task quickly"
                tabindex="0"
            >
                less
            </span>
        {:else}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <span
                onclick={extendForm}
                role="button"
                aria-expanded="false"
                title="Increase fields number to complete task"
                tabindex="0"
            >
                more
            </span>
        {/if}
        <hr />
    </div>
    {#if more}
        <div class="subgroup">
            {#if validatedTask && validatedTask.description}
                <p class="error">{validatedTask.description}</p>
            {/if}
            <label for="description">Description</label>
            <textarea cols="30" rows="5" id="description" bind:value={task.description}></textarea>
        </div>
        <div class="subgroup">
            {#if validatedTask && validatedTask.scheduled_at}
                <p class="error">{validatedTask.scheduled_at}</p>
            {/if}
            <label for="scheduledtask">Schedule Start</label>
            <input type="datetime-local" id="scheduledtask" bind:value={task.scheduled_at} />
        </div>
        <div class="subgroup">
            {#if validatedTask && validatedTask.duration}
                <p class="error">{validatedTask.duration}</p>
            {/if}
            <label for="durationtask" title="Duration max 24h">Duration</label>
            <input type="time" id="durationtask" bind:value={task.duration} />
        </div>
    {/if}
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
        margin: 5px 0;
    }

    .subgroup hr {
        min-width: 30%;
    }

    .subgroup > span {
        cursor: pointer;
    }
</style>
