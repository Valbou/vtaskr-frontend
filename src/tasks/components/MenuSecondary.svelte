<script>
    import { Link } from 'svelte-routing'
</script>

<nav>
    <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/groups">All Groups</Link></li>
        <!-- Favorite Groups list - Membership -->
    </ul>
    <ul>
        <li><Link to="/">All Tags</Link></li>
        <li>
            <Link to="/">New Tag</Link>
        </li>
        <!-- Favorite Tag list -->
    </ul>
</nav>
