<script>
    import { getAllUserTenants } from '../../domain/auth/service.js'

    import Spinner from '../generics/Spinner.svelte'

    let { value = $bindable(), name } = $props()

    let allTenants = getAllUserTenants()
</script>

{#await allTenants}
    <Spinner />
{:then tenants}
    {#if tenants.isOk}
        <select id={name} {name} bind:value={value}>
            <option value="" disabled>-- Group --</option>
            {#each tenants.data as tenant}
                <option value={tenant.id}>{tenant.name}</option>
            {/each}
        </select>
    {:else}
        <p style="color: red">{tenants.error}</p>
    {/if}
{/await}
