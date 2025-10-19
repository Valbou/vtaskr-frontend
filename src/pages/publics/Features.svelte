<script>
    import { Link } from 'svelte-routing'

    import { getText } from "../../libs/i18n/services/translation.js"

    import Trans from "../../libs/i18n/components/Trans.svelte"
</script>

<section class="features">
    <h1><Trans textKey="global:features:title" /></h1>
    <p><Trans textKey="global:features:help_you" /></p>
    <p><Trans textKey="global:features:collaborative_project" /></p>
    <div>
        <ul>
            <li><Trans textKey="global:features:create_and_manage" /></li>
            <li><Trans textKey="global:features:eisenhower_matrix" /></li>
            <li><Trans textKey="global:features:groups_and_collaborators" /></li>
            <li><Trans textKey="global:features:use_tags" /></li>
            <li><Trans textKey="global:features:use_reminder" /></li>
            <li><Trans textKey="global:features:privacy_by_design" /></li>
            <li><Trans textKey="global:features:many_others_features" /> <a href="https://github.com/Valbou/vtaskr-frontend" title={getText("global:features:title_github")} target="_blank" rel="external"><Trans textKey="global:features:follow_us" /></a></li>
        </ul>
        <p><Trans textKey="global:features:free_for_all" /></p>
    </div>
    <p class="center"><Link class="button" to="/register"><Trans textKey="global:register" /></Link> <Trans textKey="global:about:or" /> <Link class="button" to="/login"><Trans textKey="global:login" /></Link> <Trans textKey="global:features:for_free" /></p>
    <p><Trans textKey="global:features:more_features" /> <a href="https://github.com/Valbou/vtaskr-frontend/issues" target="_blank" rel="external"><Trans textKey="global:features:create_issues" /></a></p>
</section>
