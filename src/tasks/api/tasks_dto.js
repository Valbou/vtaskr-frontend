import { BaseDTO } from '../../utils/api/base_dto'
import { checks, minLength, maxLength, required } from '../../utils/api/validators'

export class TaskDTO extends BaseDTO {
    title
    tenant_id
    description
    emergency
    important
    scheduled_at
    duration
    done

    constructor(
        title,
        tenant_id,
        description = '',
        emergency = false,
        important = false,
        scheduled_at = null,
        duration = null,
        done = null,
    ) {
        super()
        this.title = title
        this.tenant_id = tenant_id
        this.description = description
        this.emergency = emergency
        this.important = important
        this.scheduled_at = scheduled_at
        this.duration = duration
        this.done = done
    }

    getValidatedObject() {
        return {
            title: checks([required(this.title), minLength(this.title, 5), maxLength(this.title, 150)]),
            tenant_id: checks([required(this.tenant_id), minLength(this.tenant_id, 32), maxLength(this.tenant_id, 32)]),
            description: checks([minLength(this.title, 10), maxLength(this.description, 500)])
        }
    }
}
