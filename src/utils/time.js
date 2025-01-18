export const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export function timeToSeconds(duration) {
    return +duration.split(':').reduce((acc, t) => 60 * acc + +t) * 60
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

export function getDistantDayOf(refDay, offset) {
    let newDay = new Date(refDay)
    newDay.setDate(newDay.getDate() + offset)

    return newDay
}

export function getWeekDay(day) {
    // Start week Monday == 0 and Sunday == 6
    return day.getDay() ? day.getDay() - 1 : 6
}

export function getStartOfWeek(day) {
    let currentDay = getWeekDay(day)
    let newDay = getDistantDayOf(day, 0 - currentDay)

    return newDay
}

export function getNextStartOfWeek(day) {
    let currentDay = getWeekDay(day)
    let delta = 7 - currentDay
    let newDay = getDistantDayOf(day, delta)

    return newDay
}

export function getPreviousStartOfWeek(day) {
    let startWeek = getStartOfWeek(day)
    let newDay = getDistantDayOf(startWeek, -7)

    return newDay
}

export function getStartOfMonth(day) {
    let monthDay = day.getDate()
    let newDay = getDistantDayOf(day, 0 - (monthDay - 1))

    return newDay
}

export function getDistantDayMonth(refDay, offset) {
    let newDay = new Date(refDay)
    newDay.setMonth(newDay.getMonth() + offset)

    return newDay
}

export function getNextStartOfMonth(day) {
    let nextMonth = getDistantDayMonth(day, 1)
    let newDay = getStartOfMonth(nextMonth)

    return newDay
}

export function getPreviousStartOfMonth(day) {
    let prevMonth = getDistantDayMonth(day, -1)
    let newDay = getStartOfMonth(prevMonth)

    return newDay
}
