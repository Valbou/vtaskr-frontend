<script>
    import { createEventDispatcher } from 'svelte'

    import { deleteRole } from '../../domain/users/api/roles_api.js'

    import Picto from '../generics/Picto.svelte'

    const dispatch = createEventDispatcher()

    export let role

    async function removeUserAccess() {
        let result = confirm(`Confirm delete ${role.user.first_name} ${role.user.last_name} group acces`)
        if (result) {
            await deleteRole(role.id)
            sendDelete()
        }
    }

    function sendDelete() {
        dispatch('message', {
            role: role
        })
    }
</script>

<p>
    { role.user.first_name } { role.user.last_name } ({ role.roletype.name })
    <button on:click={removeUserAccess} title="Remove user access">
        <Picto name="delete" />
    </button>
</p>
