<script>
    import Trans from "../../../libs/i18n/components/Trans.svelte"
    import MFAForm from '../../../components/users/forms/MFAForm.svelte'
    import LoginRequired from './LoginRequired.svelte'
</script>

<LoginRequired />

<h1><Trans textKey="users:mfa:title" /></h1>
<MFAForm />
