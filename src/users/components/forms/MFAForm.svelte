<script>
    import { mfa as mfaCall } from '../../api/users_api.js'
    import { MFADTO } from '../../api/users_dto.js'
    import { updateToken } from '../../store/auth.js'

    import Toast from '@/lib/components/Toast.svelte'

    let mfa = new MFADTO('')

    let validatedUser = null
    let userState = false

    let mfaResult = null
    let mfaError = null
    let showMessage = false

    async function handleSubmit() {
        ;[userState, validatedUser] = mfa.getValidatedObjectFields()
        showMessage = true

        if (userState) {
            ;[mfaResult, mfaError] = await mfaCall(mfa)

            if (mfaResult) {
                window.location.replace('/')
            }
        }
    }
</script>

{#if mfaError}
    <Toast typeMessage="error" bind:showMessage>
        <p slot="message">
            {mfaError}
        </p>
    </Toast>
{/if}

<form class="form mfa" method="post" on:submit|preventDefault={() => handleSubmit()}>
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
