export const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export function timeToSeconds(duration) {
    return +duration.split(':').reduce((acc, t) => 60 * acc + +t)
}

export function getStartOfDay(day) {
    let startDay = new Date(day)
    startDay.setHours(0)
    startDay.setMinutes(0)
    startDay.setSeconds(0)
    startDay.setMilliseconds(0)

    return startDay
}

export function getTomorrow(day) {
    let tomorrow = new Date(day)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return tomorrow
}

export function getYesterday(day) {
    let tomorrow = new Date(day)
    tomorrow.setDate(tomorrow.getDate() - 1)

    return tomorrow
}
