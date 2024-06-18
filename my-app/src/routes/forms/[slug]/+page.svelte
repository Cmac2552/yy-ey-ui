<script>
	// @ts-nocheck

	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import '../../../app.css';
	import Plus from '../../../plus.svelte';
	import TrashCan from '../../../trashCan.svelte';
	import Gear from '../../../gear.svelte';
	import Pencil from '../../../pencil.svelte';
	import Column from '../../../modals/column.svelte';
	import Table from '../../../modals/table.svelte';
	import Edit from '../../../modals/edit.svelte';
	import Add from '../../../modals/add.svelte';
	import { createFilterStore, filterHandler } from '$lib/stores/filter';
	import { onDestroy } from 'svelte';

	export let data;
	let items = [];
	export let showAddModal = false;
	export let showEditModal = false;
	export let showAddTableModal = false;
	export let showAddColumn = false;
	let itemToEdit = {};
	function editItem(item) {
		itemToEdit = item;
		showEditModal = true;
	}
	let filterStore = createFilterStore(items);
	let unsubscribe = filterStore.subscribe((model) => filterHandler(model));
	$: unsubscribe(),
		(filterStore = createFilterStore(data.values)),
		(unsubscribe = filterStore.subscribe((model) => filterHandler(model)));

	onDestroy(() => {
		unsubscribe();
	});

	function filterStuff(category, value) {
		if ($filterStore.filters.find((filter) => filter[0] === category && filter[1] === value)) {
			$filterStore.filters = $filterStore.filters.filter(
				(filter) => filter[0] !== category || filter[1] !== value
			);
		} else {
			$filterStore.filters = $filterStore.filters.concat([[category, value]]);
		}
	}

	let formElement;
</script>

<div class="w-full h-full">
	<div class="flex justify-between">
		<h1 class="font-bold text-3xl my-2 mx-4">YY-EY</h1>
		<div class="bg-gray-300 w-10 h-10 my-2 mx-3 rounded-full flex justify-center items-center">
			CM
		</div>
	</div>
	<hr class="bg-black my-1" />
	<div class="flex items-center">
		<h2 class="text-2xl my-2 mx-4">Inventory Table</h2>
		<button
			on:click={() => (showAddTableModal = true)}
			class="bg-gray-400 flex items-center justify-center rounded-md h-6 w-6"
			><span class="bg-gray-400 flex items-center justify-center rounded-full h-4 w-4"
				><Plus></Plus></span
			></button
		>
	</div>

	<div class="w-full h-full my-12 flex">
		<div style="width: 12.5%">
			<h3 class="text-xl mx-4">Filters</h3>
			<div class=" h-full mx-4">
				{#each Object.entries(data.filters) as [category, values]}
					{category}
					<div class="flex flex-col mb-4">
						{#each values as value}
							<div>
								<input type="checkbox" name={value} on:click={() => filterStuff(category, value)} />
								<label for={value}>{value}</label>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
		<div class="w-3/4 justify-between mx-8">
			<div class="flex justify-between items-center mx-8">
				<div class="flex">
					<form
						method="POST"
						action="?/getProducts"
						use:enhance={({}) => {
							return async ({ result }) => {
								await invalidateAll();
								await applyAction(result);
							};
						}}
						bind:this={formElement}
					>
						<select
							class="border-0"
							name="productSelection"
							bind:value={data.slug}
							on:change={() => {
								formElement.requestSubmit();
							}}
							>{#each data.productNames as item}
								<option class="w-5" value={item}>{item}</option>
							{/each}</select
						>
					</form>
					<button on:click={() => (showAddColumn = true)}><Gear></Gear></button>
				</div>

				<button
					on:click={() => (showAddModal = true)}
					class="bg-black py-2 px-4 h-8 rounded-md text-white flex justify-center items-center"
					>Add Item</button
				>
			</div>
			<div class="flex">
				{#each data.attributes as item}
					{#each Object.entries(item) as [_, value]}
						<div class="w-[12rem] mr-4 overflow-hidden text-ellipsis">
							<span class="overflow-hidden text-ellipsis">{value}</span>
						</div>
					{/each}
				{/each}
			</div>
			<hr class="border-t-2" />
			<div>
				{#each $filterStore.filtered as item}
					<div class="group flex py-2">
						<div class="flex">
							{#each data.attributes as attribute}
								{#each Object.entries(attribute) as [_, value]}
									{#if item[value]}
										<div class="w-[12rem] mr-4 overflow-hidden text-ellipsis">
											<span class="">{item[value]}</span>
										</div>
									{:else}
										<span class="w-5 mr-[11rem]"></span>
									{/if}
								{/each}
							{/each}
						</div>

						<div class="opacity-0 group-hover:opacity-100">
							<button on:click={() => editItem(item)}><Pencil></Pencil></button>

							<button
								on:click={async (e) => {
									const resp = await fetch(
										`http://localhost:1323/inventory/product/${data.slug}/${item['productNumber']}`,
										{
											method: 'DELETE',
											headers: { Authorization: data.auth }
										}
									);

									if (resp.status === 200) {
										$filterStore.deleteItem = item;
									}
								}}><TrashCan></TrashCan></button
							>
						</div>
					</div>

					<hr class="border-t-2" />
				{/each}
			</div>
			<button
				on:click={() => {
					$filterStore.prevPage = true;
				}}><Gear></Gear></button
			>
			<button
				on:click={() => {
					$filterStore.nextPage = true;
				}}><TrashCan></TrashCan></button
			>
		</div>
	</div>
</div>
<Add bind:showAddModal attributes={data.attributes} {filterStore}></Add>
<Edit bind:showEditModal {itemToEdit} attributes={data.attributes}></Edit>
<Table bind:showAddTableModal></Table>
<Column bind:showAddColumn tableName={data.slug}></Column>
