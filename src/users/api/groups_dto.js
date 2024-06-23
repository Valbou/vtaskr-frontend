import { BaseDTO } from '../../utils/api/base_dto'
import {
    checks,
    validateEmail,
    minLength,
    maxLength,
    sameAs,
    required
} from '../../utils/api/validators'

export class GroupDTO extends BaseDTO {
    name
    description

    constructor(name, description) {
        super()
        this.name = name
        this.description = description
    }

    getValidatedObject() {
        return {
            name: checks([required(this.name), minLength(this.name, 3), maxLength(this.name, 90)]),
            description: checks([minLength(this.description, 0), maxLength(this.description, 500)])
        }
    }
}
