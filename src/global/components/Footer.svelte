<script>
    import { Link } from 'svelte-routing'
    import { isUserAuthenticated } from '../../lib/iam/authentication.js'
    import Trans from "../../i18n/components/Trans.svelte"
</script>

<nav>
    {#if isUserAuthenticated()}
        <Link to="/logout"><Trans textKey="global:logout" /></Link>
        <Link to="/dashboard"><Trans textKey="global:dashboard" /></Link>
    {:else}
        <Link to="/login"><Trans textKey="global:login" /></Link>
        <Link to="/register"><Trans textKey="global:register" /></Link>
    {/if}

    <Link to="/about"><Trans textKey="global:about" /></Link>
</nav>
