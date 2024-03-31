<script>
    import { onMount } from 'svelte'
    import { getAllUserTenants } from '@/lib/iam/authentication.js'

    import Spinner from '@/global/components/Spinner.svelte'

    export let value
    export let name

    let allTenants = getAllUserTenants()

    let tenantsResult = null
    let tenantsError = null
</script>


{#await allTenants}
    <Spinner />
{:then tenants}
    <select id={name} {name} bind:value>
        {#each tenants as tenant}
            <option value={tenant.id}>{tenant.name}</option>
        {/each}
    </select>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
