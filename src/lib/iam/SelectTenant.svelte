<script>
    import { getAllUserTenants } from '@/lib/iam/authentication.js'

    import Spinner from '@/lib/components/Spinner.svelte'

    export let value
    export let name

    let allTenants = getAllUserTenants()
</script>

{#await allTenants}
    <Spinner />
{:then tenants}
    <select id={name} {name} bind:value>
        <option value="" disabled>-- Group --</option>
        {#each tenants as tenant}
            <option value={tenant.id}>{tenant.name}</option>
        {/each}
    </select>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<style>
    select {
        font-size: 1em;
        padding: 5px 8px;
    }
</style>
