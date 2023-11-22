<script setup>
    import { reactive, ref, computed } from 'vue'
    import useValidate from '@vuelidate/core'
    import { required, minLength, maxLength } from '@vuelidate/validators'

    import { confirm2fa as api_confirm2fa } from '../../persistence/api/user'
    import { delay } from '../../services/utils_service'

    const state = reactive({
        confirm2fa: '',
        api_error: '',
        api_success: '',
    })
    const $externalResults = ref({})

    const rules = computed(() => {
        return {
            confirm2fa: { required, minLength: minLength(6), maxLength: maxLength(6) },
        }
    })

    const v = useValidate(rules, state)

    async function validate() {
        if (await v.value.$validate()) {
            return true
        }
        $externalResults.value = {
            email: 'error',
            password: 'error'
        }
        return false
    }

    async function handleSubmit() {
        let result = await validate()

        if(result) {
            console.log("Form submitted !");
            const data = await api_confirm2fa(state.confirm2fa)

            if (data.email) {
                state.api_success = "Confirm ok"

                await delay(1000);
                this.$router.push('/')
            }
            else if(data.error) {
                state.api_error = "Error "+ data.status +": "+ data.error
            }
        }
        else {
            console.log("Invalid form data");
        }
    }
</script>

<template>
    <form class="form confirm2fa" method="post" @submit.prevent="handleSubmit">
        <div v-if="state.api_error || state.api_success">
            <p v-if="state.api_success" class="success">
                {{ state.api_success }}
            </p>
            <p v-if="state.api_error" class="error">
                {{ state.api_error }}
            </p>
        </div>
        <div>
            <label for="confirm2fa">Code 2FA (sent by email)</label>
            <p class="error" v-if="v.confirm2fa.$error">{{ v.confirm2fa.$errors[0].$message }}</p>
            <input type="text" id="confirm2fa" name="confirm2fa" v-model="state.confirm2fa" />
        </div>
        <div>
            <button>Confirm</button>
        </div>
    </form>
</template>
