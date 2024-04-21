<script>
	// @ts-nocheck
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Plus from '../plus.svelte';

	export let showAddTableModal;

	let dialog;
	let columns = [];
	function addColumns() {
		columns = [...columns, columns.length.toString()];
	}

	$: if (dialog && showAddTableModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showAddTableModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="w-[30rem] h-fit-content pl-3 pt-4 pb-8 bg-white flex flex-col"
		on:click|stopPropagation
	>
		<h2 class="font-bold text-3xl mb-4">Create Table</h2>
		<form
			class="flex flex-col"
			method="POST"
			action="?/addTable"
			use:enhance={({ formElement }) => {
				formElement.reset();
				columns = [];
				return async ({ result }) => {
					await invalidateAll();
					await applyAction(result);
				};
			}}
		>
			<!-- Convert this to use attrs to determine how many inputs to use -->
			<div><span>Table Name</span><input class="border w-[50%] ml-2" name="tableName" /></div>
			<h3 class="font-bold text-xl mt-2">Add Columns</h3>
			{#each columns as name, index}
				<input class="border w-3/4 mb-2" name={index} />{/each}
			<button
				type="button"
				class="w-5 h-5 rounded-md flex items-center justify-center bg-gray-400"
				on:click={() => addColumns('temp')}
				><Plus></Plus>
			</button>

			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus class="border w-1/4 mt-2" on:click={() => dialog.close()}
				>Create Table
			</button>
		</form>
	</div>
</dialog>
