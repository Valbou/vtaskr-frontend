<script>
    import { getStartOfDay, getStartOfWeek, getPreviousStartOfWeek, getNextStartOfWeek } from '../../utils/time'
    import { filterTasksByDate } from '../utils/tasks.js'
    import { getText } from "../../i18n/services/translation.js"

    import Trans from "../../i18n/components/Trans.svelte"
    import TaskList from './TaskList.svelte'

    let { tasks, startPeriodDay, setDates, deleteTask, updateTask } = $props()

    let start = $derived(getStartOfWeek(startPeriodDay))
    let end = $derived(getNextStartOfWeek(start))

    let periodTasks = $derived(filterTasksByDate(tasks, start, end))

    async function goNextWeek() {
        let newStart = getNextStartOfWeek(start)
        let newEnd = getNextStartOfWeek(end)
        await setDates(newStart, newEnd)
    }

    async function goPreviousWeek() {
        let newStart = getPreviousStartOfWeek(start)
        let newEnd = getPreviousStartOfWeek(end)
        await setDates(newStart, newEnd)
    }
</script>

<h2 title="{getText("tasks:from_date")} {start.toLocaleDateString()} {start.toLocaleTimeString()} {getText("tasks:to_date")} {end.toLocaleDateString()} {end.toLocaleTimeString()}"><Trans textKey="tasks:week" /> {start.toLocaleDateString()} - {end.toLocaleDateString()}</h2>
<div>
    <button onclick={(e) => goPreviousWeek(e)}><Trans textKey="tasks:prev" /></button>
    <button onclick={(e) => goNextWeek(e)}><Trans textKey="tasks:next" /></button>
</div>

<TaskList tasks={periodTasks} {deleteTask} {updateTask} />
