<script>
    import { Link } from 'svelte-routing'

    import VTaskrLogo from '@/global/components/vTaskrLogo.svelte'
    import VTaskrMenu from '@/global/components/VTaskrMenu.svelte'
    import Footer from '@/global/components/Footer.svelte'
</script>

<header>
    <figure>
        <Link slot="menuLogo" class="navlink" to="/">
            <VTaskrLogo />
        </Link>
    </figure>
    <VTaskrMenu />
</header>

<section>
    <slot />
</section>

<footer>
    <Footer />
</footer>
