// @ts-nocheck
import { writable } from "svelte/store"

export const createFilterStore = (/** @type {any} */ data) => {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: data,
        totalFiltered: data,
        filters: [],
        deleteItem: null,
        addItem: null,
        page: 0,
        nextPage: false,
        prevPage: false,
        hasNextPage: false,
        hasPrevPage: false
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
        store.filtered = store.totalFiltered.slice(store.page * 15, (store.page + 1) * 15)
        store.nextPage = false
        store.hasNextPage = store.totalFiltered.length > (store.page + 1) * 15
        store.hasPrevPage = (store.page - 1) * 15 > 0
    }
    if (store.prevPage) {
        store.page = store.page - 1
        store.filtered = store.totalFiltered.slice((store.page - 1) * 15, store.page * 15)
        store.prevPage = false
        store.hasNextPage = store.totalFiltered.length > (store.page + 1) * 15
        store.hasPrevPage = (store.page - 1) * 15 > 0

    }
    if (store.filters.length !== 0) {
        store.filtered = []
        store.totalFiltered = []
        filters.forEach((filterValue) => {
            store.totalFiltered = store.totalFiltered.concat(store.data.filter((data) => {
                return Object.keys(data).find((key) =>
                    key === filterValue[0] && data[key] === filterValue[1]
                    && !store.filtered.find((product) => product.productNumber === data.productNumber)
                );
            }))
        })
        store.hasNextPage = store.totalFiltered.length > (store.page + 1) * 15
        store.hasPrevPage = (store.page) * 15 > 0
        store.filtered = store.totalFiltered.slice(store.page * 15, (store.page + 1) * 15)
    } else {
        store.filtered = store.data.slice(store.page * 15, (store.page + 1) * 15)
        store.hasNextPage = store.data.length > (store.page + 1) * 15
        store.hasPrevPage = (store.page) * 15 > 0
    }
}

