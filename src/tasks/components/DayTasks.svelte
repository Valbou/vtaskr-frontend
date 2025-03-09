<script>
    import { getStartOfDay, getTomorrow, getYesterday } from '../../utils/time'
    import { filterTasksByDate } from '../utils/tasks.js'
    import { getText } from "../../i18n/services/translation.js"

    import Trans from "../../i18n/components/Trans.svelte"
    import TaskList from '../components/TaskList.svelte'

    let { tasks, startPeriodDay, setDates, deleteTask, updateTask } = $props()

    let start = $derived(startPeriodDay)
    let end = $derived(getTomorrow(startPeriodDay))

    let periodTasks = $derived(filterTasksByDate(tasks, start, end))

    async function goTomorrow() {
        let newStart = getTomorrow(start)
        let newEnd = getTomorrow(end)
        await setDates(newStart, newEnd)
    }

    async function goYesterday() {
        let newStart = getYesterday(start)
        let newEnd = getYesterday(end)
        await setDates(newStart, newEnd)
    }
</script>

<h2 title="{getText("tasks:from_date")} {start.toLocaleDateString()} {start.toLocaleTimeString()} {getText("tasks:to_date")} {end.toLocaleDateString()} {end.toLocaleTimeString()}">{start.toLocaleDateString()}</h2>
<div>
    <button onclick={(e) => goYesterday(e)}><Trans textKey="tasks:prev" /></button>
    <button onclick={(e) => goTomorrow(e)}><Trans textKey="tasks:next" /></button>
</div>

<TaskList tasks={periodTasks} {deleteTask} {updateTask} />
