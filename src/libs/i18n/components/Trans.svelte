<script>
    import { getText } from "../services/translation.js"

    let { textKey, vars = {} } = $props()
</script>

{@html getText(textKey, vars) }
