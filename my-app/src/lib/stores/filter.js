// @ts-nocheck
import { writable } from "svelte/store"

export const createFilterStore = (/** @type {any} */ data) => {
    const { subscribe, set, update } = writable({
        data: data, filtered: data, filters: [], deleteItem: null, addItem: null, page: 0, nextPage: false, prevPage: false
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
        store.data = [store.addItem, ...store.data,]
        store.addItem = null
    }
    if (store.nextPage) {
        store.page = store.page + 1
        store.filtered = store.data.slice(store.page * 15, (store.page + 1) * 15)
        store.nextPage = false
    }
    if (store.prevPage) {
        store.page = store.page - 1
        store.filtered = store.data.slice((store.page - 1) * 15, store.page * 15)
        store.prevPage = false

    }
    if (store.filters.length !== 0) {
        store.filtered = []
        filters.forEach((filterValue) => {
            store.filtered = store.filtered.concat(store.data.filter((data) => {
                return Object.keys(data).find((key) =>
                    key === filterValue[0] && data[key] === filterValue[1]
                    && !store.filtered.find((product) => product.productNumber === data.productNumber)
                );
            })).slice(store.page * 15, (store.page + 1) * 15)
        })
    } else {
        store.filtered = store.data.slice(store.page * 15, (store.page + 1) * 15)
    }
}

