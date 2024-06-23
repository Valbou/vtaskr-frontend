<script>
    import { Link } from 'svelte-routing'

    export let group
</script>

<div>
    <h3>{ group.name }</h3>
    <p>{ group.description }</p>
    <!--
        <span>{ group.members } group members</span>
        <span>{ tasks } tasks left</span>
    -->
    <Link class="button" to="/group/{group.id}">Go</Link>
</div>
