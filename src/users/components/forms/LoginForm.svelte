<script>
    import { authenticate } from '../../api/users_api.js'
    import { LoginDTO } from '../../api/users_dto.js'
    import { updateToken } from '../../store/auth.js'

    import Toast from '@/lib/components/Toast.svelte'

    let user = new LoginDTO('', '')

    let validatedUser = null
    let userState = false

    let loginResult = null
    let loginError = null
    let showMessage = false

    async function handleSubmit() {
        [userState, validatedUser] = user.getValidatedObjectFields()
        showMessage = true

        if(userState) {
            [loginResult, loginError] = await authenticate(user)

            updateToken(loginResult.token)

            if (loginResult) {
                window.location.replace('/mfa')
            }
        }
    }
</script>

{#if loginError}
<Toast typeMessage="error" bind:showMessage={ showMessage }>
    <p slot="message">
        { loginError }
    </p>
</Toast>
{/if}

<form class="form login" method="post" on:submit|preventDefault={() => handleSubmit()}>
    <div>
        <label for="email">Email (User)</label>
        {#if validatedUser && validatedUser.email}
            <p class="error">{ validatedUser.email }</p>
        {/if}
        <input type="email" id="email" name="email" bind:value={ user.email } />
    </div>
    <div>
        <label for="pass">Password</label>
        {#if validatedUser && validatedUser.password}
            <p class="error">{ validatedUser.password }</p>
        {/if}
        <input type="password" id="pass" name="pass" bind:value={ user.password } />
    </div>
    <div>
        <button>Connection</button>
    </div>
</form>