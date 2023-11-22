<script setup>
    import { reactive, ref, computed } from 'vue'
    import useValidate from '@vuelidate/core'
    import { required, email, minLength, sameAs } from '@vuelidate/validators'

    import { register } from '../../persistence/api/user'
    import { delay } from '../../services/utils_service'

    const state = reactive({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        password2: '',
        locale: window.navigator.languages[0],
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        api_error: '',
        api_success: '',
    })
    const $externalResults = ref({})

    const rules = computed(() => {
        return {
            email: { required, email },
            firstName: { required, minLength: minLength(1) },
            lastName: { required, minLength: minLength(1) },
            password: { required, minLength: minLength(8) },
            password2: { required, sameAsPassword: sameAs(state.password)},
        }
    })

    const v = useValidate(rules, state)

    async function validate() {
        if (await v.value.$validate()) {
            return true
        }
        $externalResults.value = {
            email: 'error',
            firstName: 'error',
            lastName: 'error',
            password2: 'error',
            password: 'error',
        }
        return false
    }

    async function handleSubmit() {
        let result = await validate()

        if(result) {
            console.log("Form submitted !");
            const data = await register(state.email, state.firstName, state.lastName, state.password, state.locale, state.timezone)

            if (data.email) {
                state.api_success = "Registration completed !"

                await delay(2000);
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
    <form class="form register" method="post" @submit.prevent="handleSubmit">
        <div v-if="state.api_error || state.api_success">
            <p v-if="state.api_success" class="success">
                {{ state.api_success }}
            </p>
            <p v-if="state.api_error" class="error">
                {{ state.api_error }}
            </p>
        </div>
        <div>
            <label for="email">Email (User)</label>
            <p class="error" v-if="v.email.$error">{{ v.email.$errors[0].$message }}</p>
            <input type="email" id="email" name="email" v-model="state.email" />
        </div>
        <div>
            <label for="firstname">First name</label>
            <p class="error" v-if="v.firstName.$error">{{ v.firstName.$errors[0].$message }}</p>
            <input type="text" id="firstname" name="firstname" v-model="state.firstName" />
        </div>
        <div>
            <label for="lastname">Last Name</label>
            <p class="error" v-if="v.lastName.$error">{{ v.lastName.$errors[0].$message }}</p>
            <input type="text" id="lastname" name="lastname" v-model="state.lastName" />
        </div>
        <div>
            <label for="pass">Password</label>
            <p class="error" v-if="v.password.$error">{{ v.password.$errors[0].$message }}</p>
            <input type="password" id="pass" name="pass" v-model="state.password" />
        </div>
        <div>
            <label for="pass2">Password (repeat)</label>
            <p class="error" v-if="v.password2.$error">{{ v.password2.$errors[0].$message }}</p>
            <input type="password" id="pass2" name="pass2" v-model="state.password2" />
        </div>
        <div>
            <button>Register</button>
        </div>
    </form>
</template>
