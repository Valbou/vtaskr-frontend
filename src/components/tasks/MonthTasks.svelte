<script>
    import { getStartOfMonth, getNextStartOfMonth, getPreviousStartOfMonth } from '../../utils/time'
    import { filterTasksByDate } from '../../domain/tasks/service.js'
    import { getText } from "../../libs/i18n/services/translation.js"

    import Trans from "../../libs/i18n/components/Trans.svelte"
    import TaskList from '../components/TaskList.svelte'

    let { tasks, startPeriodDay, setDates, deleteTask, updateTask } = $props()

    let start = $derived(getStartOfMonth(startPeriodDay))
    let end = $derived(getNextStartOfMonth(start))

    let periodTasks = $derived(filterTasksByDate(tasks, start, end))

    async function nextMonth() {
        let newStart = getNextStartOfMonth(start)
        let newEnd = getNextStartOfMonth(end)
        await setDates(newStart, newEnd)
    }

    async function prevMonth() {
        let newStart = getPreviousStartOfMonth(start)
        let newEnd = getPreviousStartOfMonth(end)
        await setDates(newStart, newEnd)
    }
</script>

<h2 title="{getText("tasks:from_date")} {start.toLocaleDateString()} {start.toLocaleTimeString()} {getText("tasks:to_date")} {end.toLocaleDateString()} {end.toLocaleTimeString()}">{start.toLocaleDateString().slice(3)}</h2>
<div>
    <button onclick={(e) => prevMonth(e)}><Trans textKey="tasks:prev" /></button>
    <button onclick={(e) => nextMonth(e)}><Trans textKey="tasks:next" /></button>
</div>

<TaskList tasks={periodTasks} {deleteTask} {updateTask} />
