<script>
    import Trans from "../../i18n/components/Trans.svelte"
    import { getText } from "../../i18n/services/translation.js"
</script>

<section class="about">
    <h1><Trans textKey="global:about" /></h1>
    <p>
        <Trans textKey="global:about:hosting" /> <a href="https://www.valbou.fr/?from=vtaskr" title="Valbou" rel="external" target="_blank">Valbou</a>
    </p>
    <p><Trans textKey="global:about:you_want_help_us" /></p>
    <ul>
        <li><Trans textKey="global:about:define_roadmap" /></li>
        <li><Trans textKey="global:about:translate" /></li>
        <li><Trans textKey="global:about:develop" /></li>
        <li><Trans textKey="global:about:design" /></li>
        <li><Trans textKey="global:about:ergonomy" /></li>
        <li><Trans textKey="global:about:documentation" /></li>
        <li><Trans textKey="global:about:etc" /></li>
    </ul>
    <p><Trans textKey="global:about:join_us" /> <a href="https://github.com/Valbou/vtaskr-backend" title={getText('global:about:title_github')} target="_blank" rel="external"><Trans textKey="global:about:backend" /></a> <Trans textKey="global:about:and" /> <a href="https://github.com/Valbou/vtaskr-frontend" title="Link to Github vTaskr" target="_blank" rel="external"><Trans textKey="global:about:frontend" /></a></p>
</section>
