<script>
    import { getAllUserTenants } from '@/lib/iam/authentication.js'

    import Spinner from '@/lib/components/Spinner.svelte'

    let { value = $bindable(), name } = $props()

    let allTenants = getAllUserTenants()
</script>

{#await allTenants}
    <Spinner />
{:then tenants}
    {#if tenants.isOk}
        <select id={name} {name} bind:value>
            <option value="" disabled>-- Group --</option>
            {#each tenants.data as tenant}
                <option value={tenant.id}>{tenant.name}</option>
            {/each}
        </select>
    {:else}
        <p style="color: red">{tenants.error}</p>
    {/if}
{/await}
