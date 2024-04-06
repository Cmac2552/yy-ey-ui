<script>
	// @ts-nocheck

	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import '../../app.css';

	export let data;
	let dialog; // HTMLDialogElement
	let dialog2;
	export let showModal = false; // boolean
	export let showModal2 = false;
	let itemToEdit = {};
	function editItem(item) {
		console.log(item);
		itemToEdit = item;
		dialog2.showModal();
	}
</script>

<div class="w-full h-full">
	<div class="flex justify-between">
		<h1 class="font-bold text-3xl my-2 mx-4">YY-EY</h1>
		<div class="bg-gray-300 w-10 h-10 my-2 mx-3 rounded-full flex justify-center items-center">
			CM
		</div>
	</div>
	<hr class="bg-black my-1 w-screen" />
	<h2 class="text-2xl my-2 mx-4">Inventory Table</h2>
	<div class="w-full h-full my-12 flex">
		<div style="width: 12.5%">
			<h3 class="text-xl mx-4">Filters</h3>
			<div class=" h-full mx-4">
				<div class="bg-slate-600" style="height:40rem"></div>
			</div>
		</div>
		<div class="w-3/4 justify-between mx-8">
			<div class="flex justify-between mx-8">
				<h3 class="text-lg">Yaks</h3>
				<button
					on:click={() => dialog.showModal()}
					class="bg-black py-2 px-4 h-8 rounded-md text-white flex justify-center items-center"
					>Add Item</button
				>
			</div>
			<div class="flex justify-around">
				{#each data.attributes as item}
					{#each Object.entries(item) as [_, value]}
						<span class="w-5">{value}</span>
					{/each}
				{/each}
			</div>
			<hr class="border-t-2" />
			<div>
				{#each data.values as item}
					<div class="flex justify-around">
						{#each data.attributes as attribute}
							{#each Object.entries(attribute) as [_, value]}
								{#if item[value]}
									<span class="w-5">{item[value]}</span>
								{:else}
									<span class="w-5"></span>
								{/if}
							{/each}
						{/each}
					</div>
					<button on:click={() => editItem(item)}>EDIT</button>
					<hr class="border-t-2" />
				{/each}
			</div>
		</div>
	</div>
</div>
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->\
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
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
					await invalidateAll();
					await applyAction(result);
				};
			}}
		>
			{#each data.attributes as item}
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
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->\
<dialog
	bind:this={dialog2}
	on:close={() => (showModal2 = false)}
	on:click|self={() => dialog2.close()}
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
			{#each data.attributes as item}
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
			<!-- {#each itemToEdit as [name, value]}
				{#if name !== 'productNumber'}
					<div>
						<input bind:value class="border w-[50%] mt-2" {name} />
						<span>{name}</span>
					</div>
				{:else}
					<div>
						<input
							bind:value
							type="number"
							class=" w-[50%] mt-2 pointer-events-none focus-within:border-none"
							{name}
						/>

						<span>{name}</span>
					</div>
				{/if}
			{/each} -->
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus class="border w-[25%] mt-2" on:click={() => dialog2.close()}
				>Edit Item</button
			>
		</form>
	</div>
</dialog>
