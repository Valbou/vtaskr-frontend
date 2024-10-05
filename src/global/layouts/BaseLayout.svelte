<script>
    import { Link } from 'svelte-routing'

    import VTaskrLogo from '@/global/components/vTaskrLogo.svelte'
    import VTaskrMenu from '@/global/components/VTaskrMenu.svelte'
    import Footer from '@/global/components/Footer.svelte'

    export let isAuth
</script>

<header>
    <figure>
        {#if isAuth}
            <Link slot="menuLogo" class="navlink" to="/dashboard">
                <VTaskrLogo />
            </Link>
        {:else}
            <Link slot="menuLogo" class="navlink" to="/">
                <VTaskrLogo />
            </Link>
        {/if}
    </figure>
    <VTaskrMenu />
</header>

<section>
    <slot />
</section>

<footer>
    <Footer />
</footer>
