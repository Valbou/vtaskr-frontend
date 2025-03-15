<script>
    import { authenticate } from '../../api/users_api.js'
    import { LoginDTO } from '../../api/users_dto.js'
    import { updateToken } from '../../store/auth.js'

    import Trans from "../../../i18n/components/Trans.svelte"
    import Toast from '../../../lib/components/Toast.svelte'

    let user = $state(new LoginDTO('', ''))

    let validatedUser = $state(null)
    let userState = $state(false)

    let loginResult = $state(null)

    function cleanResult() {
        loginResult = null
    }

    async function handleSubmit(e) {
        e.preventDefault()
        ;[userState, validatedUser] = user.getValidatedObjectFields()

        if (userState) {
            ;loginResult = await authenticate(user)

            updateToken(loginResult.data.token)

            if (loginResult.data && loginResult.data.token) {
                window.location.replace('/mfa')
            }
        }
    }
</script>

{#snippet message(loginResult)}
    {#if loginResult && !loginResult.isOk}
        <p>
            {loginResult.error}
        </p>
    {/if}
{/snippet}

{#if loginResult}
    <Toast {message} result={loginResult} clean={cleanResult} />
{/if}

<form class="form login" method="post" onsubmit={(e) => handleSubmit(e)}>
    <div>
        <label for="email"><Trans textKey="users:login:email" /></label>
        {#if validatedUser && validatedUser.email}
            <p class="error">{validatedUser.email}</p>
        {/if}
        <input type="email" id="email" name="email" bind:value={user.email} />
    </div>
    <div>
        <label for="pass"><Trans textKey="users:login:password" /></label>
        {#if validatedUser && validatedUser.password}
            <p class="error">{validatedUser.password}</p>
        {/if}
        <input type="password" id="pass" name="pass" bind:value={user.password} />
    </div>
    <div>
        <button><Trans textKey="users:login:connection" /></button>
    </div>
</form>
