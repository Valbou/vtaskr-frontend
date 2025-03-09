<script>
    import { Link } from 'svelte-routing'

    import { getText } from "../../i18n/services/translation.js"

    import DarkTasksDesktop from '/post-it-background-blue.jpg'
    import Trans from "../../i18n/components/Trans.svelte"
</script>

<section class="presentation">
    <figure>
        <div>
            <img src={ DarkTasksDesktop } alt="Desktop with many task sheets." />
        </div>
        <figcaption>
            <h1><Trans textKey="global:presentation:title" /></h1>
            <p><Trans textKey="global:presentation:paragraph" /></p>
        </figcaption>
    </figure>

    <p class="center">
        <Link class="button" to="/register"><Trans textKey="global:register" /></Link>
        <Trans textKey="global:about:or" />
        <Link class="button" to="/login"><Trans textKey="global:login" /></Link>
    </p>
</section>
