<div class="spinner"></div>

<style>
    .spinner {
        width: 60px;
        height: 60px;
    }

    .spinner:after {
        content: ' ';
        display: block;
        width: 50px;
        height: 50px;
        margin: 10px;
        border-radius: 50%;
        border: 5px solid var(--light);
        border-color: var(--light) transparent var(--light) transparent;
        animation: spinner 1.5s linear infinite;
    }

    @keyframes spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
