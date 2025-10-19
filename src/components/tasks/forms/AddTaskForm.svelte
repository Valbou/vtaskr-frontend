<script>
    import { createTasks } from '../../../domain/tasks/api/tasks_api.js'
    import { TaskDTO } from '../../../domain/tasks/dto/tasks_dto.js'
    import { getText } from "../../../libs/i18n/services/translation.js"

    import Trans from "../../../libs/i18n/components/Trans.svelte"
    import SelectTenant from '../../auth/SelectTenant.svelte'
    import Toast from '../../components/generics/Toast.svelte'

    let { addTask, defaultGroupId = '', members = [], currentUserId = '' } = $props()

    let task = $state(new TaskDTO('', defaultGroupId, '', false, false, '', '', null, currentUserId))

    let validatedTask = $state(null)
    let taskState = $state(false)

    let taskResult = $state(null)
    let more = $state(false)

    async function extendForm() {
        more = !more
    }

    function cleanResult() {
        taskResult = null
    }

    async function handleSubmit(e) {
        e.preventDefault()
        ;[taskState, validatedTask] = task.getValidatedObjectFields()

        if (taskState) {
            ;taskResult = await createTasks(task)
            if (taskResult.isOk && taskResult.data.title == task.title) {
                addTask(taskResult.data)
                e.target.reset()

                task = new TaskDTO('', defaultGroupId, '', false, false, '', '', null, currentUserId)
            }
        }
    }
</script>

{#snippet message(taskResult)}
    {#if taskResult && !taskResult.isOk}
        <p>
            {taskResult.error}
        </p>
    {/if}
{/snippet}

{#if taskResult}
    <Toast {message} result={taskResult} clean={cleanResult} />
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
            placeholder="{getText("tasks:forms:placeholder:task_title")}"
            bind:value={task.title}
            tabindex="0"
        />
    </div>
    <div class="subgroup eisenhower">
        <div class="subgroup">
            <input type="checkbox" id="importanttask" bind:checked={task.important} />
            <label for="importanttask"><Trans textKey="tasks:important" /></label>
        </div>
        <div class="subgroup">
            <input type="checkbox" id="emergencytask" bind:checked={task.emergency} />
            <label for="emergencytask"><Trans textKey="tasks:emergency" /></label>
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
                title={getText("tasks:forms:less_button")}
                tabindex="0"
            >
                <Trans textKey="tasks:forms:less" />
            </span>
        {:else}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <span
                onclick={extendForm}
                role="button"
                aria-expanded="false"
                title={getText("tasks:forms:more_button")}
                tabindex="0"
            >
                <Trans textKey="tasks:forms:more" />
            </span>
        {/if}
        <hr />
    </div>
    {#if more}
        <div class="subgroup">
            {#if validatedTask && validatedTask.description}
                <p class="error">{validatedTask.description}</p>
            {/if}
            <label for="description"><Trans textKey="tasks:forms:task_description" /></label>
            <textarea cols="30" rows="5" id="description" bind:value={task.description}></textarea>
        </div>
        <div class="subgroup">
            {#if validatedTask && validatedTask.scheduled_at}
                <p class="error">{validatedTask.scheduled_at}</p>
            {/if}
            <label for="scheduledtask"><Trans textKey="tasks:forms:task_schedule_start" /></label>
            <input type="datetime-local" id="scheduledtask" bind:value={task.scheduled_at} />
        </div>
        <div class="subgroup">
            {#if validatedTask && validatedTask.duration}
                <p class="error">{validatedTask.duration}</p>
            {/if}
            <label for="durationtask" title="Duration max 24h"><Trans textKey="tasks:forms:task_duration" /></label>
            <input type="time" id="durationtask" bind:value={task.duration} />
        </div>
    {/if}
    <div class="subgroup">
        {#if validatedTask && validatedTask.tenant_id}
            <p class="error">{validatedTask.tenant_id}</p>
        {/if}
        <label for="group" title="Task associated to this group"><Trans textKey="tasks:forms:task_group" /></label>
        <SelectTenant bind:value={task.tenant_id} name="group" />
    </div>
    <div class="subgroup">
        <label for="member" title="Assigned to member"><Trans textKey="tasks:forms:task_assigned_to" /></label>
        {#if members.length > 0}
            {#if validatedTask && validatedTask.assigned_to}
                <p class="error">{validatedTask.assigned_to}</p>
            {/if}
            <select id="member" bind:value={task.assigned_to}>
                {#each members as member}
                    <option value={member.id}>{member.first_name} {member.last_name}</option>
                {/each}
            </select>
        {:else}
            <input type="hidden" id="member" bind:value={task.assigned_to} />
            <input type="text" value="You" disabled />
        {/if}
    </div>
    <div class="subgroup">
        <div>
            <button><Trans textKey="tasks:forms:add" /></button>
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
