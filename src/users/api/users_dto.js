import { BaseDTO } from "../../utils/api/base_dto"
import { checks, validateEmail, minLength, maxLength, sameAs } from "../../utils/api/validators"


export class UserDTO extends BaseDTO {
    email
    first_name
    last_name
    password

    constructor(email, first_name, last_name, password) {
        super()
        this.email = email
        this.first_name = first_name
        this.last_name = last_name
        this.password = password
    }

    getValidatedObject(password2) {
        return {
            email: checks([validateEmail(this.email)]),
            first_name: checks([minLength(this.first_name, 3), maxLength(this.first_name, 90)]),
            last_name: checks([minLength(this.last_name, 3), maxLength(this.last_name, 90)]),
            password: checks([minLength(this.password, 12), maxLength(this.password, 90), sameAs(this.password, password2)]),
        }
    }
}

export class LoginDTO extends BaseDTO {
    email
    password

    constructor(email, password) {
        super()
        this.email = email
        this.password = password
    }

    getValidatedObject() {
        return {
            email: checks([validateEmail(this.email)]),
            password: checks([minLength(this.password, 12), maxLength(this.password, 90)]),
        }
    }
}

export class MFADTO extends BaseDTO {
    code_2FA

    constructor(code) {
        super()
        this.code_2FA = code
    }

    getValidatedObject() {
        return {
            code: checks([minLength(this.code_2FA, 6), maxLength(this.code_2FA, 12)]),
        }
    }
}
