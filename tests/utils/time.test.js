import { expect, test } from 'vitest'
import { timeToSeconds, getStartOfDay, getTomorrow, getYesterday, getDistantDayOf } from '/src/utils/time.js'
import { getWeekDay, getStartOfWeek, getNextStartOfWeek, getPreviousStartOfWeek } from '/src/utils/time.js'
import { getStartOfMonth, getDistantDayMonth, getNextStartOfMonth, getPreviousStartOfMonth } from '/src/utils/time.js'

test('Time 00:01 string to 60 seconds', () => {
    expect(timeToSeconds('00:01')).toStrictEqual(60)
})

test('Time 01:30 string to 5 400 seconds', () => {
    expect(timeToSeconds('01:30')).toStrictEqual(5_400)
})

test('Time 24:00 string to 86 400 seconds', () => {
    expect(timeToSeconds('24:00')).toStrictEqual(86_400)
})

test('Return a starting day', () => {
    let day = getStartOfDay(new Date())

    expect(day.getHours()).toStrictEqual(0)
    expect(day.getMinutes()).toStrictEqual(0)
    expect(day.getSeconds()).toStrictEqual(0)
    expect(day.getMilliseconds()).toStrictEqual(0)
})

test('Return tomorrow', () => {
    let today = new Date()
    let tomorrow = getTomorrow(today)

    expect(today < tomorrow).toStrictEqual(true)
    if (tomorrow.getDate() == 1) {
        expect(today.getDate()).toBeOneOf([28, 29, 30, 31])
    }
    else {
        expect(today.getDate()).toStrictEqual(tomorrow.getDate() - 1)
    }
})

test('Return yesterday', () => {
    let today = new Date()
    let yesterday = getYesterday(today)

    expect(yesterday < today).toStrictEqual(true)
    if (today.getDate() == 1) {
        expect(yesterday.getDate()).toBeOneOf([28, 29, 30, 31])
    }
    else {
        expect(today.getDate()).toStrictEqual(yesterday.getDate() + 1)
    }
})

test('Move n days from a reference date', () => {
    let today = new Date()

    expect(getDistantDayOf(today, 0)).toStrictEqual(today)
    expect(getDistantDayOf(today, -1)).toStrictEqual(getYesterday(today))
    expect(getDistantDayOf(today, 1)).toStrictEqual(getTomorrow(today))
})

test('Return day of week, starting at monday indexed 0', () => {
    let today = new Date()
    let weekDay = getWeekDay(today)

    if (today.getDay() == 0) {
        expect(weekDay).toStrictEqual(6)
    }
    else {
        expect(weekDay).toStrictEqual(today.getDay() - 1)
    }
})

test('Return the first day of the current week', () => {
    let today = new Date()
    let startOfWeek = getStartOfWeek(today)

    expect(startOfWeek.getDay()).toStrictEqual(1)
    expect(startOfWeek <= today).toStrictEqual(true)
})

test('Return the next week start', () => {
    let today = new Date()
    let startOfWeek = getStartOfWeek(today)
    let nextStartOfWeek = getNextStartOfWeek(today)

    expect(nextStartOfWeek).toStrictEqual(getDistantDayOf(startOfWeek, 7))
})

test('Return the previous week start', () => {
    let today = new Date()
    let startOfWeek = getStartOfWeek(today)
    let prevStartOfWeek = getPreviousStartOfWeek(today)

    expect(prevStartOfWeek).toStrictEqual(getDistantDayOf(startOfWeek, -7))
})

test('Return the first day of the current month', () => {
    let today = new Date()
    let startOfMonth = getStartOfMonth(today)

    expect(startOfMonth.getDate()).toStrictEqual(1)
})

test('Return the distant day with months offset', () => {
    let today = new Date()

    let nbMonths = 5
    let distantDay = getDistantDayMonth(today, nbMonths)
    expect(distantDay.getMonth()).toStrictEqual((today.getMonth() + nbMonths) % 12)

    nbMonths = -5
    distantDay = getDistantDayMonth(today, nbMonths)
    expect(distantDay.getMonth()).toStrictEqual((today.getMonth() + nbMonths + 12) % 12)
})

test('Return the next first month day', () => {
    let today = new Date()
    let startOfMonth = getNextStartOfMonth(today)

    expect(startOfMonth.getDate()).toStrictEqual(1)
    expect(startOfMonth.getMonth()).toStrictEqual((today.getMonth() + 1) % 12)
})

test('Return the previous first month day', () => {
    let today = new Date()
    let startOfMonth = getPreviousStartOfMonth(today)

    expect(startOfMonth.getDate()).toStrictEqual(1)
    expect(startOfMonth.getMonth()).toStrictEqual((today.getMonth() - 1 + 12) % 12)
})
