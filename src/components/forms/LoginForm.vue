<script setup>
    import { reactive, ref, computed } from 'vue'
    import useValidate from '@vuelidate/core'
    import { required, email, minLength } from '@vuelidate/validators'

    import { login } from '../../persistence/api/user'
    import { delay } from '../../services/utils_service'

    const state = reactive({
        email: '',
        password: '',
        api_error: '',
        api_success: '',
    })
    const $externalResults = ref({})

    const rules = computed(() => {
        return {
            email: { required, email },
            password: { required, minLength: minLength(8) }
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
            const data = await login(state.email, state.password)

            if (data.email) {
                state.api_success = "Login ok"

                await delay(1000);
                this.$router.push('/2fa')
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
    <form class="form login" method="post" @submit.prevent="handleSubmit">
        <div v-if="state.api_error || state.api_success">
            <p v-if="state.api_success" class="success">
                {{ state.api_success }}
            </p>
            <p v-if="state.api_error" class="error">
                {{ state.api_error }}
            </p>
        </div>
        <div>
            <label for="user">User</label>
            <p class="error" v-if="v.email.$error">{{ v.email.$errors[0].$message }}</p>
            <input type="email" id="user" name="user" v-model="state.email" />
        </div>
        <div>
            <label for="pass">Password</label>
            <p class="error" v-if="v.password.$error">{{ v.password.$errors[0].$message }}</p>
            <input type="password" id="pass" name="pass" v-model="state.password" />
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
</template>
