<script>
    import { onMount } from 'svelte'
    import { init_matomo } from '../services/tracking.js'

    onMount(() => {
        init_matomo()
    })
</script>
