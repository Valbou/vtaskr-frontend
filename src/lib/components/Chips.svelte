<script>
    const { content } = $props()
</script>

<span>{content}</span>

<style>
    span {
        display: inline-block;
        padding: 5px 8px;
        border-radius: 20px;
        background-color: var(--lb);
        color: var(--dark);
    }
</style>
