<script>
    import { Link } from 'svelte-routing'

    import VTaskrLogo from '@/global/components/vTaskrLogo.svelte'
    import VTaskrMenu from '@/global/components/VTaskrMenu.svelte'
    import Footer from '@/global/components/Footer.svelte'

    let { isAuth, children } = $props();
</script>

<header>
    <figure>
        {#if isAuth}
            <Link class="navlink" to="/dashboard">
                <VTaskrLogo />
            </Link>
        {:else}
            <Link class="navlink" to="/">
                <VTaskrLogo />
            </Link>
        {/if}
    </figure>
    <VTaskrMenu />
</header>

<section>
    {@render children()}
</section>

<footer>
    <Footer />
</footer>
