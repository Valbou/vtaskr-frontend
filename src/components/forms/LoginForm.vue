<script setup>
    import { reactive, ref, computed } from 'vue'
    import useValidate from '@vuelidate/core'
    import { required, email, minLength } from '@vuelidate/validators'

    // https://test-utils.vuejs.org/guide/essentials/forms.html#interacting-with-form-elements
    // https://vuejs.org/api/composition-api-dependency-injection.html#provide
    // https://vueschool.io/articles/vuejs-tutorials/options-api-vs-composition-api/

    const state = reactive({
        email: '',
        password: ''
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
        console.log("result: " + result)
        if(result) {
            console.log("Form submitted to "+ state.email +" - "+ state.password +" !");
            // Call to backend API
        }
        else {
            console.log("Form blocked ! (invalid)");
        }
    }
</script>

<template>
    <form class="form login" method="post" @submit.prevent="handleSubmit">
        <div>
            <label for="user">Identifiant</label>
            <p class="error" v-if="v.email.$error">{{ v.email.$errors[0].$message }}</p>
            <input type="email" id="user" name="user" v-model="state.email" />
        </div>
        <div>
            <label for="pass">Mot de Passe</label>
            <p class="error" v-if="v.password.$error">{{ v.password.$errors[0].$message }}</p>
            <input type="password" id="pass" name="pass" v-model="state.password" />
        </div>
        <div>
            <button>Se Connecter</button>
        </div>
    </form>
</template>

