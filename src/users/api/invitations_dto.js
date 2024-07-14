import { BaseDTO } from '../../utils/api/base_dto'
import {
    checks,
    validateEmail,
    minLength,
    maxLength,
    required
} from '../../utils/api/validators'

export class InvitationDTO extends BaseDTO {
    to_user_email
    in_group_id
    with_roletype_id

    constructor(to_user_email, in_group_id, with_roletype_id) {
        super()
        this.to_user_email = to_user_email
        this.in_group_id = in_group_id
        this.with_roletype_id = with_roletype_id
    }

    getValidatedObject() {
        return {
            to_user_email: checks([
                required(this.to_user_email),
                validateEmail(this.to_user_email),
                minLength(this.to_user_email, 3),
                maxLength(this.to_user_email, 250),
            ]),
            in_group_id: checks([
                required(this.in_group_id),
                minLength(this.in_group_id, 30),
                maxLength(this.in_group_id, 40),
            ]),
            with_roletype_id: checks([
                required(this.with_roletype_id),
                minLength(this.with_roletype_id, 30),
                maxLength(this.with_roletype_id, 40),
            ])
        }
    }
}
