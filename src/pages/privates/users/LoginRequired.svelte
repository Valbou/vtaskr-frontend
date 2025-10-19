<script>
    import { onMount } from 'svelte'
    import { isAuthenticated } from '../../../domain/users/service.js'

    onMount(() => {
        if (!isAuthenticated()) {
            window.location.replace('/login')
        }
    })
</script>
