<script>
	// @ts-nocheck

	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import '../../app.css';

	let signUp = false;
</script>

<div class="w-full max-w-xs">
	<form
		class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
		method="POST"
		action="?/login"
		use:enhance={() => {
			return async ({ result }) => {
				await invalidateAll();
				await applyAction(result);
			};
		}}
	>
		<div>
			<label for="username">Username:</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				name="username"
				type="text"
			/>
		</div>

		<div>
			<label for="password">Password:</label>
			<input
				name="password"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				type="password"
			/>
		</div>
		{#if !signUp}
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>Login</button
			>
			<button class="hover:text-blue-500" on:click={() => (signUp = !signUp)}>Sign Up</button>
		{/if}
		{#if signUp}
			<div>
				<label for="Org">Organization:</label>
				<input
					name="org"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
				/>
			</div>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				formaction="?/signUp">Sign Up</button
			>
		{/if}
	</form>
</div>
