<script>
    import { Link } from 'svelte-routing'

    import Spinner from '@/lib/components/Spinner.svelte'

    export let group
</script>

<div>
    <h3>{ group.name }</h3>
    <p>{ group.description }</p>

    <Link class="button" to="/group/{group.id}">Go</Link>
</div>
