import { BaseDTO } from '../../utils/api/base_dto'
import { checks, min, minLength, max, maxLength, required } from '../../utils/api/validators'
import { timeToSeconds } from '@/utils/time'

export class TaskDTO extends BaseDTO {
    title
    tenant_id
    description
    emergency
    important
    scheduled_at
    duration
    done
    assigned_to

    constructor(
        title,
        tenant_id,
        description = '',
        emergency = false,
        important = false,
        scheduled_at = null,
        duration = null,
        done = null,
        assigned_to = null,
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
        this.assigned_to = assigned_to
    }

    getValidatedObject() {
        return {
            title: checks([
                required(this.title),
                minLength(this.title, 5),
                maxLength(this.title, 150)
            ]),
            tenant_id: checks([
                required(this.tenant_id),
                minLength(this.tenant_id, 32), 
                maxLength(this.tenant_id, 32)
            ]),
            description: checks([
                minLength(this.description, 10),
                maxLength(this.description, 500)
            ]),
            duration: checks([
                min(timeToSeconds(this.duration), 60),
                max(timeToSeconds(this.duration), 86_400, "Max is 24h duration (beyond it's not just a task)")
            ]),
            assigned_to: checks([
                required(this.assigned_to),
            ]),
        }
    }
}
