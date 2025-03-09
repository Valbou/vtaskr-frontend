<script>
    import { Link } from 'svelte-routing'
    import { isUserAuthenticated } from '../../lib/iam/authentication.js'

    import Trans from "../../i18n/components/Trans.svelte"
    import Menu from '../../lib/components/Menu.svelte'
</script>

<Menu {menu} />

{#snippet menu()}
    <ul>
        {#if isUserAuthenticated()}
            <li>
                <Link to="/dashboard"><Trans textKey="global:dashboard" /></Link>
            </li>
        {:else}
            <li><Link to="/login"><Trans textKey="global:login" /></Link></li>
            <li><Link to="/register"><Trans textKey="global:register" /></Link></li>
        {/if}
    </ul>

    <div>
        <ul>
            <li>
                <Link to="/"><Trans textKey="global:home" /></Link>
            </li>
            <li>
                <Link to="/features"><Trans textKey="global:features" /></Link>
            </li>
            <li>
                <Link to="/about"><Trans textKey="global:about" /></Link>
            </li>
            {#if isUserAuthenticated()}
                <li><Link to="/logout"><Trans textKey="global:logout" /></Link></li>
            {/if}
        </ul>
    </div>
{/snippet}
