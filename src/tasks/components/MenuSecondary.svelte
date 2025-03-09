<script>
    import { Link } from 'svelte-routing'

    import Trans from "../../i18n/components/Trans.svelte"
</script>

<nav>
    <ul>
        <li><Link to="/dashboard"><Trans textKey="global:dashboard" /></Link></li>
        <li><Link to="/groups"><Trans textKey="tasks:all_groups" /></Link></li>
        <!-- Favorite Groups list - Membership -->
    </ul>
</nav>
