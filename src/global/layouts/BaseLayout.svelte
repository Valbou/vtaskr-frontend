<script>
    import { Link } from 'svelte-routing'

    import VTaskrLogo from '../components/vTaskrLogo.svelte'
    import VTaskrMenu from '../components/VTaskrMenu.svelte'
    import Footer from '../components/Footer.svelte'

    let { isAuth, content, secondary } = $props();
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

<div class="horizontalLayout">
    {#if secondary}
        <aside>
            {@render secondary()}
        </aside>
    {/if}
    <section>
        {@render content()}
    </section>
</div>

<footer>
    <Footer />
</footer>
