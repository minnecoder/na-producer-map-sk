<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const producer = JSON.parse(data.data);
</script>

<main>
	<h1>{producer.name}</h1>
	<div class="container">
		<div class="left">
			<div class="item-field">
				<p class="item-title">Email</p>
				<p class="item-text">{producer.email}</p>
			</div>
			<div class="item-field">
				<p class="item-title">Peerage Name</p>
				<p class="item-text">{producer.peerage || 'Not Available'}</p>
			</div>
			<div class="item-field">
				<p class="item-title">Phone Number</p>
				<p class="item-text">{producer.phone || 'Not Available'}</p>
			</div>
			<div class="item-field">
				<p class="item-title">NA Social</p>
				<p class="item-text">{producer.nasocial || 'Not Available'}</p>
			</div>
			<div class="item-field">
				<p class="item-title">Personal Website</p>
				<p class="item-text">{producer.website || 'Not Available'}</p>
			</div>
		</div>
		<div class="right">
			<div class="item-field">
				<p class="item-title">Facebook</p>
				<p class="item-text">{producer.facebook || 'Not Available'}</p>
			</div>
			<div class="item-field">
				<p class="item-title">X / Twitter</p>
				<p class="item-text">{producer.twitter || 'Not Available'}</p>
			</div>
			<div class="item-field">
				<p class="item-title">Instagram</p>
				<p class="item-text">{producer.instagram || 'Not Available'}</p>
			</div>
			<div class="item-field">
				<p class="item-title">LinkedIn</p>
				<p class="item-text">{producer.linkedin || 'Not Available'}</p>
			</div>
			<div class="item-field">
				<p class="item-title">YouTube</p>
				<p class="item-text">{producer.youtube || 'Not Available'}</p>
			</div>
		</div>
	</div>
</main>

<style>
	.container {
		display: flex;
	}

	.left {
		margin-right: 4rem;
	}
	.item-field {
		margin-top: 2rem;
		width: 20rem;
		border: solid 1px #707070;
		border-radius: 5px;
	}

	.item-title {
		margin: 1rem 0;
		font-weight: bold;
		color: dimgray;
		padding-left: 1rem;
	}

	.item-text {
		margin: 1rem 0;
		font-size: 20px;
		text-align: center;
	}

	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	h1 {
		margin: 2rem 0;
	}

	@media only screen and (max-width: 710px) {
		.container {
			display: flex;
			flex-direction: column;
		}
	}
</style>
