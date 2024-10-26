<script>
    import { getAllTasks } from '../api/tasks_api.js'

    import Spinner from '@/lib/components/Spinner.svelte'
    import TaskList from '../components/TaskList.svelte'

    import LateTasks from '../components/LateTasks.svelte'
    import DayTasks from '../components/DayTasks.svelte'
    import NotScheduledTasks from '../components/NotScheduledTasks.svelte'
    import MenuSecondary from '../components/MenuSecondary.svelte'

    let allTasks = getAllTasks()
</script>

<section>
    <h1>Dashboard</h1>
    
    <LateTasks />
    <DayTasks />
    <NotScheduledTasks />
</section>
