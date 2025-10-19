export function filterTasksByDate(tasks, start, end) {
    return tasks.filter((t) => {
            let taskDate = new Date(t.scheduled_at)
            return start <= taskDate && taskDate < end
        }
    )
}
