<script>
	// @ts-nocheck

	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let showEditModal;
	export let attributes;
	export let itemToEdit;
	let dialog;
	let formElement;

	$: if (dialog && showEditModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showEditModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="w-[30rem] h-fit-content pl-3 pt-4 pb-8 bg-white flex flex-col"
		on:click|stopPropagation
	>
		<h2 class="font-bold text-3xl">Edit Item</h2>
		<form
			class="flex flex-col"
			method="POST"
			action="?/editItem"
			use:enhance={({ formElement }) => {
				formElement.reset();
				return async ({ result }) => {
					await invalidateAll();
					await applyAction(result);
				};
			}}
		>
			<!-- Convert this to use attrs to determine how many inputs to use -->
			{#each attributes as item}
				{#each Object.entries(item) as [_, value]}
					<div>
						<input bind:value={itemToEdit[value]} class="border w-[50%] mt-2" name={value} />
						<span>{value}</span>
					</div>
				{/each}
			{/each}
			<input
				hidden
				bind:value={itemToEdit['productNumber']}
				class="border w-[50%] mt-2"
				name="productNumber"
			/>
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus class="border w-[25%] mt-2" on:click={() => dialog.close()}
				>Edit Item</button
			>
		</form>
	</div>
</dialog>
