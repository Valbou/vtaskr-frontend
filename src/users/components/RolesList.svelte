<script>
    import Role from './Role.svelte'

    export let roles

    function handleDeletedRole(event) {
        let deletedRole = event.detail.role
        roles = roles.filter((i) => i.id != deletedRole.id)
    }
</script>

<ul>
    {#each roles as role}
        <li><Role {role} /></li>
    {/each}
</ul>
