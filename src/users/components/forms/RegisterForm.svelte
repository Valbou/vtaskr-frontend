<script>
    import { register } from '../../api/users_api.js'
    import { UserDTO } from '../../api/users_dto.js'
    import { delay } from '@/utils/time.js'

    import Toast from '@/lib/components/Toast.svelte'

    let user = new UserDTO('', '', '', '')
    let password2 = ''

    let validatedUser = null
    let userState = false

    let registerResult = null
    let registerError = null

    async function handleSubmit() {
        [userState, validatedUser] = user.getValidatedObjectFields(password2)

        if(userState) {
            [registerResult, registerError] = await register(user)
        }
    }
</script>

{#if registerResult}
<Toast typeMessage="success">
    <p slot="message">
        Welcome { registerResult.first_name } !<br />
        Go <a href="/login" title="Go to login page">login</a> to enjoy !
    </p>
</Toast>
{:else if registerError}
<Toast typeMessage="error">
    <p slot="message">
        { registerError }
    </p>
</Toast>
{/if}

<form class="form register" method="post" on:submit|preventDefault={() => handleSubmit()}>
    <div>
        <label for="email">Email (User)</label>
        {#if validatedUser && validatedUser.email}
            <p class="error">{ validatedUser.email }</p>
        {/if}
        <input type="email" id="email" name="email" bind:value={ user.email } />
    </div>
    <div>
        <label for="first_name">First name</label>
        {#if validatedUser && validatedUser.first_name}
            <p class="error">{ validatedUser.first_name }</p>
        {/if}
        <input type="text" id="first_name" name="first_name" bind:value={ user.first_name } />
    </div>
    <div>
        <label for="last_name">Last Name</label>
        {#if validatedUser && validatedUser.last_name}
            <p class="error">{ validatedUser.last_name }</p>
        {/if}
        <input type="text" id="last_name" name="last_name" bind:value={ user.last_name } />
    </div>
    <div>
        <label for="pass">Password</label>
        {#if validatedUser && validatedUser.password}
            <p class="error">{ validatedUser.password }</p>
        {/if}
        <input type="password" id="pass" name="pass" bind:value={ user.password } />
    </div>
    <div>
        <label for="pass2">Password (repeat)</label>
        {#if validatedUser && validatedUser.password2}
            <p class="error">{ validatedUser.password2 }</p>
        {/if}
        <input type="password" id="pass2" name="pass2" bind:value={ password2 } />
    </div>
    <div>
        <button>Register</button>
    </div>
</form>
