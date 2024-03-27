import { expect, test } from 'vitest'
import { required, minLength, maxLength, sameAs, validateEmail } from '/src/utils/api/validators.js'
import { check, checks } from '/src/utils/api/validators.js'

test('Value required ok', () => {
    expect(required('myvalue')).toStrictEqual([ true, 'Value required' ])
})

test('Value required fail', () => {
    expect(required('')).toStrictEqual([ false, 'Value required' ])
})

test('Test min length ok', () => {
    expect(minLength('test', 3)).toStrictEqual([ true, 'Min 3 characters' ])
})

test('Test min length fail', () => {
    expect(minLength('test', 5)).toStrictEqual([ false, 'Min 5 characters' ])
})

test('Test max length ok', () => {
    expect(maxLength('test', 5)).toStrictEqual([ true, 'Max 5 characters' ])
})

test('Test max length fail', () => {
    expect(maxLength('test', 3)).toStrictEqual([ false, 'Max 3 characters' ])
})

test('Test same as ok', () => {
    expect(sameAs('test', 'test')).toStrictEqual([ true, 'Value mismatch' ])
})

test('Test same as fail', () => {
    expect(sameAs('test', 'foo')).toStrictEqual([ false, 'Value mismatch' ])
})

test('Test same as fail override default message', () => {
    expect(sameAs('test', 'foo', 'Value strongly mismatch')).toStrictEqual([ false, 'Value strongly mismatch' ])
})

test('Test validate email ok', () => {
    expect(validateEmail('test@example.com')).toStrictEqual([ true, 'Invalid email' ])
})

test('Test validate email fail', () => {
    expect(validateEmail('test@example')).toStrictEqual([ false, 'Invalid email' ])
})

test('Test check ok', () => {
    expect(check(validateEmail('test@example.com'))).toBe(null)
})

test('Test check fail', () => {
    expect(check(validateEmail('test@example'))).toBe('Invalid email')
})

test('Test many check all ok', () => {
    expect(checks([
        validateEmail('test@example.com'),
        sameAs('test', 'test'),
    ])).toBe(null)
})

test('Test many check some fail', () => {
    expect(checks([
        validateEmail('test@example.com'),
        sameAs('test', 'bar'),
    ])).toBe('Value mismatch')
})
