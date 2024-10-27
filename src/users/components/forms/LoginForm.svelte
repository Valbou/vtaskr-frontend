<script>
    import { authenticate } from '../../api/users_api.js'
    import { LoginDTO } from '../../api/users_dto.js'
    import { updateToken } from '../../store/auth.js'

    import Toast from '@/lib/components/Toast.svelte'

    let user = new LoginDTO('', '')

    let validatedUser = null
    let userState = false

    let loginResult = null
    let showMessage = false

    async function handleSubmit(e) {
        e.preventDefault()
        ;[userState, validatedUser] = user.getValidatedObjectFields()
        showMessage = true

        if (userState) {
            ;loginResult = await authenticate(user)

            updateToken(loginResult.data.token)

            if (loginResult.data && loginResult.data.token) {
                window.location.replace('/mfa')
            }
        }
    }
</script>

{#if loginResult && !loginResult.isOk}
    <Toast typeMessage="error" bind:showMessage>
        <p slot="message">
            {loginResult.error}
        </p>
    </Toast>
{/if}

<form class="form login" method="post" onsubmit={(e) => handleSubmit(e)}>
    <div>
        <label for="email">Email (User)</label>
        {#if validatedUser && validatedUser.email}
            <p class="error">{validatedUser.email}</p>
        {/if}
        <input type="email" id="email" name="email" bind:value={user.email} />
    </div>
    <div>
        <label for="pass">Password</label>
        {#if validatedUser && validatedUser.password}
            <p class="error">{validatedUser.password}</p>
        {/if}
        <input type="password" id="pass" name="pass" bind:value={user.password} />
    </div>
    <div>
        <button>Connection</button>
    </div>
</form>
