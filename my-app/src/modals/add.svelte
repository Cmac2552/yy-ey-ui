<script>
	// @ts-nocheck

	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let showAddModal;
	export let attributes;
	export let filterStore;
	let dialog;

	$: if (dialog && showAddModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showAddModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="w-[30rem] h-fit-content pl-3 pt-4 pb-8 bg-white flex flex-col"
		on:click|stopPropagation
	>
		<h2 class="font-bold text-3xl">Add Item</h2>
		<form
			class="flex flex-col"
			method="POST"
			action="?/addItem"
			use:enhance={({ formElement }) => {
				formElement.reset();
				return async ({ result }) => {
					console.log(result);
					$filterStore.addItem = result.data.attrValues;
					await invalidateAll();
					await applyAction(result);
				};
			}}
		>
			{#each attributes as item}
				{#each Object.entries(item) as [_, value]}
					<div>
						<input class="border w-[50%] mt-2" name={value} />
						<span>{value}</span>
					</div>
				{/each}
			{/each}<!-- svelte-ignore a11y-autofocus -->
			<button autofocus class="border w-[25%] mt-2" on:click={() => dialog.close()}>Add Item</button
			>
		</form>
	</div>
</dialog>
