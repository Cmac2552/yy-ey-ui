// @ts-nocheck
import { writable } from "svelte/store"

export const createFilterStore = (/** @type {any} */ data) => {
    const { subscribe, set, update } = writable({
        data: data, filtered: data, filters: [], deleteItem: null, addItem: null
    })

    return {
        subscribe,
        set,
        update
    }
}

export const filterHandler = (store) => {
    const filters = store.filters
    if (store.deleteItem) {
        store.data = store.data.filter((value) => {
            return value['productNumber'] !== store.deleteItem['productNumber'];
        });
        store.deleteItem = null
    }
    if (store.addItem) {
        store.data = store
        store.addItem = null
    }
    if (store.filters.length !== 0) {
        store.filtered = []
        filters.forEach((filterValue) => {
            store.filtered = store.filtered.concat(store.data.filter((data) => {
                return Object.keys(data).find((key) =>
                    key === filterValue[0] && data[key] === filterValue[1]
                    && !store.filtered.find((product) => product.productNumber === data.productNumber)
                );
            }))
        })
    } else {
        store.filtered = store.data
    }

}

export const deleteHandler = (store) => {

}

