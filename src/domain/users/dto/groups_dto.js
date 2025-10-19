import { BaseDTO } from '../../../utils/api/base_dto'
import {
    checks,
    minLength,
    maxLength,
    required
} from '../../../utils/api/validators'

export class GroupDTO extends BaseDTO {
    name
    description
    is_private

    constructor(name, description, is_private = true) {
        super()
        this.name = name
        this.description = description
        this.is_private = is_private
    }

    getValidatedObject() {
        return {
            name: checks([required(this.name), minLength(this.name, 3), maxLength(this.name, 90)]),
            description: checks([minLength(this.description, 0), maxLength(this.description, 500)])
        }
    }
}
