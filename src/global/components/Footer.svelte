<script>
    import { Link } from 'svelte-routing'
    import { isUserAuthenticated } from '@/lib/iam/authentication.js'
</script>

<nav>
    {#if isUserAuthenticated()}
        <Link to="/logout">Logout</Link>
        <Link to="/dashboard">Dashboard</Link>
    {:else}
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    {/if}
        <Link to="/about">About</Link>
</nav>
