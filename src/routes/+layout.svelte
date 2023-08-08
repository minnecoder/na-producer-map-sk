<script>
	import Header from './Header.svelte';
	import '@fontsource/poppins';
</script>

<Header />

<main>
	<slot />
</main>

<style>
	* {
		/* margin: 0;
		padding: 0; */
		font-family: 'Poppins';
	}
</style>
