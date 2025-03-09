<script>
    import { getText } from "../services/translation.js"

    let { textKey } = $props()
</script>

{ getText(textKey) }
