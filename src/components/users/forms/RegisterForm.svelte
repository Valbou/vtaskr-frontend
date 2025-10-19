<script>
    import { register } from '../../../domain/users/api/users_api.js'
    import { UserDTO } from '../../../domain/users/dto/users_dto.js'
    import { delay } from '../../../utils/time.js'

    import Trans from "../../../libs/i18n/components/Trans.svelte"
    import Toast from '../../components/generics/Toast.svelte'

    let user = $state(new UserDTO('', '', '', ''))
    let password2 = $state('')

    let validatedUser = $state(null)
    let userState = $state(false)

    let registerResult = $state(null)

    function cleanResult() {
        registerResult = null
    }

    async function handleSubmit(e) {
        e.preventDefault()
        ;[userState, validatedUser] = user.getValidatedObjectFields(password2)

        if (userState) {
            registerResult = await register(user)
        }
    }
</script>

{#snippet message(registerResult)}
    {#if registerResult.isOk}
        <p>
            <Trans textKey="users:register:success" />
        </p>
    {:else if registerResult && !registerResult.isOk}
        <p>
            {registerResult.error}
        </p>
    {/if}
{/snippet}

{#if registerResult}
    <Toast {message} result={registerResult} clean={cleanResult} />
{/if}

<form class="form register" method="post" onsubmit={(e) => handleSubmit(e)}>
    <div>
        <label for="email"><Trans textKey="users:register:email" /></label>
        {#if validatedUser && validatedUser.email}
            <p class="error">{validatedUser.email}</p>
        {/if}
        <input type="email" id="email" name="email" bind:value={user.email} />
    </div>
    <div>
        <label for="first_name"><Trans textKey="users:register:first_name" /></label>
        {#if validatedUser && validatedUser.first_name}
            <p class="error">{validatedUser.first_name}</p>
        {/if}
        <input type="text" id="first_name" name="first_name" bind:value={user.first_name} />
    </div>
    <div>
        <label for="last_name"><Trans textKey="users:register:last_name" /></label>
        {#if validatedUser && validatedUser.last_name}
            <p class="error">{validatedUser.last_name}</p>
        {/if}
        <input type="text" id="last_name" name="last_name" bind:value={user.last_name} />
    </div>
    <div>
        <label for="pass"><Trans textKey="users:register:password" /></label>
        {#if validatedUser && validatedUser.password}
            <p class="error">{validatedUser.password}</p>
        {/if}
        <input type="password" id="pass" name="pass" bind:value={user.password} />
    </div>
    <div>
        <label for="pass2"><Trans textKey="users:register:password_bis" /></label>
        {#if validatedUser && validatedUser.password2}
            <p class="error">{validatedUser.password2}</p>
        {/if}
        <input type="password" id="pass2" name="pass2" bind:value={password2} />
    </div>
    <div>
        <button><Trans textKey="users:register:register" /></button>
    </div>
</form>
