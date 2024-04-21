<script>
	// @ts-nocheck

	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let showAddColumn;
	export let tableName;
	let dialog;

	$: if (dialog && showAddColumn) dialog.showModal();
	function addColumns() {
		console.log(tableName, 1);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showAddColumn = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="w-[30rem] h-fit-content pl-3 pt-4 pb-8 bg-white flex flex-col"
		on:click|stopPropagation
	>
		<form
			class="flex flex-col"
			method="POST"
			action="/forms/[slug]?/addColumn"
			use:enhance={({ formElement }) => {
				formElement.reset();
				document.getElementById('table-name').value = tableName;
				return async ({ result }) => {
					await invalidateAll();
					await applyAction(result);
				};
			}}
		>
			<!-- Convert this to use attrs to determine how many inputs to use -->
			<h2 class="font-bold text-3xl mb-4">Add Column</h2>
			<input class="border w-3/4 mb-2" name="column-name" />
			<input
				hidden
				class="border w-3/4 mb-2"
				bind:value={tableName}
				id="table-name"
				name="table-name"
			/>
			<button type="button" on:click={() => addColumns()}>Stuff</button>
			<button class="border w-1/4 mt-2" on:click={() => dialog.close()}>Add Column</button>
		</form>
	</div>
</dialog>
