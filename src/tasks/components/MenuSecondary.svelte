<script>
    import { Link } from 'svelte-routing'
</script>

<nav>
    <ul>
        <li><Link to="/groups">All Groups</Link></li>
        <li>
            <Link to="/dashboard">New Group</Link>
        </li>
        <!-- Favorite Groups list - Membership -->
    </ul>
    <ul>
        <li><Link to="/dashboard">All Tags</Link></li>
        <li>
            <Link to="/dashboard">New Tag</Link>
        </li>
        <!-- Favorite Tag list -->
    </ul>
</nav>
