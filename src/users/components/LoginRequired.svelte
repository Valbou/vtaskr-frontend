<script>
    import { onMount } from 'svelte'
    import { isAuthenticated } from '../services/authService.js'

    onMount(() => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }
    })
</script>
