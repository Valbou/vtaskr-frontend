<script>
    import { Link } from 'svelte-routing'
    import { isUserAuthenticated } from '@/lib/iam/authentication.js'

    import Menu from '@/lib/components/Menu.svelte'
</script>

<Menu>
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

    {#if isUserAuthenticated()}
    <ul>
        <li><Link to="/dashboard">All Groups</Link></li>
        <li>
            <Link to="/dashboard">New Group</Link>
        </li>
        <!-- Favorite Groups list - Membership -->
    </ul>
    {/if}

    {#if isUserAuthenticated()}
    <ul>
        <li><Link to="/dashboard">All Tags</Link></li>
        <li>
            <Link to="/dashboard">New Tag</Link>
        </li>
        <!-- Favorite Tag list -->
    </ul>
    {/if}

    <div>
        {#if isUserAuthenticated()}
            <h6>Username</h6>
        {/if}
        <ul>
            {#if isUserAuthenticated()}
                <li><Link to="/logout">Logout</Link></li>
            {/if}
            <li>
                <Link to="/about">About</Link>
            </li>
        </ul>
    </div>
</Menu>
