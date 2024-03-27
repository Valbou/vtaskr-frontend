export function required(data, message=null) {
    return [!!data, message || 'Value required']
}

export function minLength(data, value, message=null) {
    return [data.length >= value, message || `Min ${value} characters`]
}

export function maxLength(data, value, message=null) {
    return [data.length <= value, message || `Max ${value} characters`]
}

export function sameAs(data, value, message=null) {
    return [data == value, message || `Value mismatch`]
}

export function validateEmail(email, message=null) {
    return [
        String(email)
        .toLowerCase()
        .match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) != null, 
        message || 'Invalid email'
    ]
}

export function check(value) {
    return value[0] ? null: value[1]
}

export function checks(tabValue) {
    for (let value of tabValue) {
        const result = check(value)
        if (result) {
            return result
        }
    }
    return null
}
