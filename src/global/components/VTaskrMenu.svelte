<script>
    import { Link } from 'svelte-routing'
    import { isUserAuthenticated } from '@/lib/iam/authentication.js'

    import Menu from '@/lib/components/Menu.svelte'
</script>

<Menu {menu} />

{#snippet menu()}
    <ul>
        {#if isUserAuthenticated()}
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
        {:else}
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        {/if}
    </ul>

    <div>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/features">Features</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            {#if isUserAuthenticated()}
                <li><Link to="/logout">Logout</Link></li>
            {/if}
        </ul>
    </div>
{/snippet}
