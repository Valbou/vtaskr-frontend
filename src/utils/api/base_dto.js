
export class BaseDTO {
    constructor() {
        if (this.constructor == BaseDTO) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    getObjectState(validatedObject) {
        for (let attr in validatedObject) {
            if (validatedObject[attr] != null) {
                return false
            }
        }
        return true
    }

    getValidatedObject(args) {
        throw new Error("Method 'getValidatedObject()' must be implemented.");
    }

    getValidatedObjectFields(args = null) {
        let validatedObject = this.getValidatedObject(args)
        let userState = this.getObjectState(validatedObject)

        return [userState, validatedObject]
    }
}
