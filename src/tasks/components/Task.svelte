<script>
    import Picto from '@/global/components/Picto.svelte'

    export let task
    let eisenhower = ''
    const important = 'Important'
    const emergency = 'Emergency'

    $: if (task.important && task.emergency) {
        eisenhower = 'Do it'
    }
    $: if (task.important && !task.emergency) {
        eisenhower = 'Schedule it'
    }
    $: if (!task.important && task.emergency) {
        eisenhower = 'Delegate it'
    }
    $: if (!task.important && !task.emergency) {
        eisenhower = 'Delete it'
    }
</script>

<div class="task">
    <div>
        <input type="checkbox" value={task.done} />
        <h4>{task.title}</h4>
    </div>
    <div>
        <span class="schedule"><Picto name="schedule" /> {task.scheduled_at}</span>
        <span class="duration"><Picto name="duration" /> {task.duration}</span>
        <span
            class="eisenhower"
            title="{task.emergency ? emergency : ''} {task.important ? important : ''}"
            >{eisenhower}</span
        >
    </div>
    <div>
        {#each task.tags as tag}
            <span class="tag">{tag}</span>
        {/each}
    </div>
    <div class="actions">
        {#each task.groups as group}
            <span><Picto name="groups" /> group</span>
        {/each}
        <span><Picto name="edit" /></span>
        <span><Picto name="delete" /></span>
    </div>
</div>

<style>
</style>
