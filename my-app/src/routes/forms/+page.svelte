<script>
	// @ts-nocheck

	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import '../../app.css';

	export let data;
	console.log(data);
	//Merge the object into an array and then work with that
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
					<hr class="border-t-2" />
				{/each}
			</div>
		</div>
	</div>
</div>
