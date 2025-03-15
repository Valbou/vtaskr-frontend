<script>
    import Trans from "../../i18n/components/Trans.svelte"
    import MFAForm from '../components/forms/MFAForm.svelte'
    import LoginRequired from '../components/LoginRequired.svelte'
</script>

<LoginRequired />

<h1><Trans textKey="users:mfa:title" /></h1>
<MFAForm />
