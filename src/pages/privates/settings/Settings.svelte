<script>
    import Trans from "../../../libs/i18n/components/Trans.svelte"
    import Email from "../../../components/settings/Email.svelte"
    import Password from "../../../components/settings/Password.svelte"
    import Notifications from "../../../components/settings/Notifications.svelte"
</script>

<section id="settingsPage">
    <div>
        <h1><Trans textKey="users:settings:title" /></h1>
        <p><Trans textKey="users:settings:paragraph" /></p>
    </div>
    <Email />
    <Password />
    <Notifications />
</section>
