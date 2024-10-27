<script>
    import { mfa as mfaCall } from '../../api/users_api.js'
    import { MFADTO } from '../../api/users_dto.js'
    import { updateToken } from '../../store/auth.js'

    import Toast from '@/lib/components/Toast.svelte'

    let mfa = new MFADTO('')
    let attempts = 0

    let validatedUser = null
    let userState = false

    let mfaResult = null
    let showMessage = false

    async function handleSubmit(e) {
        e.preventDefault()
        attempts++
        ;[userState, validatedUser] = mfa.getValidatedObjectFields()
        showMessage = true

        if (userState) {
            ;mfaResult = await mfaCall(mfa)

            if (mfaResult.data) {
                window.location.replace('/dashboard')
            }
            else if (attempts > 3) {
                window.location.replace('/')
            }
        }
    }
</script>

{#if mfaResult && !mfaResult.isOk}
    <Toast typeMessage="error" bind:showMessage>
        <p slot="message">
            {mfaResult.error}
        </p>
    </Toast>
{/if}

<form class="form mfa" method="post" onsubmit={(e) => handleSubmit(e)}>
    <div>
        <label for="code">Code</label>
        {#if validatedUser && validatedUser.code_2FA}
            <p class="error">{validatedUser.code_2FA}</p>
        {/if}
        <input type="text" id="code" name="code" bind:value={mfa.code_2FA} />
    </div>
    <div>
        <button>Send</button>
    </div>
</form>
