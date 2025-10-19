<script>
    import { mfa as mfaCall } from '../../../domain/users/api/users_api.js'
    import { MFADTO } from '../../../domain/users/dto/users_dto.js'

    import Trans from "../../../libs/i18n/components/Trans.svelte"
    import Toast from '../../components/generics/Toast.svelte'

    const MAX_ATTEMPT = 3

    let mfa = $state(new MFADTO(''))
    let attempts = $state(0)

    let validatedUser = $state(null)
    let userState = $state(false)

    let mfaResult = $state(null)

    function cleanResult() {
        mfaResult = null
    }

    async function handleSubmit(e) {
        e.preventDefault()
        attempts++
        ;[userState, validatedUser] = mfa.getValidatedObjectFields()

        if (userState) {
            ;mfaResult = await mfaCall(mfa)

            if (mfaResult.data) {
                window.location.replace('/dashboard')
            }
            else if (attempts > MAX_ATTEMPT) {
                window.location.replace('/')
            }
        }
    }
</script>

{#snippet message(mfaResult)}
    {#if mfaResult && !mfaResult.isOk}
        <p>
            {mfaResult.error}<br />
            <Trans textKey="users:mfa:error" /> {attempts} / {MAX_ATTEMPT}
        </p>
    {/if}
{/snippet}

{#if mfaResult}
    <Toast {message} result={mfaResult} clean={cleanResult} />
{/if}

<form class="form mfa" method="post" onsubmit={(e) => handleSubmit(e)}>
    <div>
        <label for="code"><Trans textKey="users:mfa:code" /></label>
        {#if validatedUser && validatedUser.code_2FA}
            <p class="error">{validatedUser.code_2FA}</p>
        {/if}
        <input type="text" id="code" name="code" bind:value={mfa.code_2FA} />
    </div>
    <div>
        <button><Trans textKey="users:mfa:send" /></button>
    </div>
</form>
