<script>
    import { Link } from 'svelte-routing'
    import DarkTasksDesktop from '/post-it-background-blue.jpg'
</script>

<section class="presentation">
    <figure>
        <div>
            <img src={ DarkTasksDesktop } alt="Desktop with many task sheets." />
        </div>
        <figcaption>
            <h1>Free your Mind with vTaskr !</h1>
            <p>
                Make your life easier and less stressful with a free open-source task manager.
            </p>
        </figcaption>
    </figure>

    <p class="center">
        <Link class="button" to="/register">Register</Link>
        or <Link class="button" to="/login">Login</Link>
    </p>
</section>
