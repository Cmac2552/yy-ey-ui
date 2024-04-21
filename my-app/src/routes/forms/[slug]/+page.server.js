// @ts-nocheck
import { redirect } from '@sveltejs/kit';


export const load = async ({ cookies, params }) => {

    const productNamesRequest = await fetch('http://localhost:1323/inventory/product-names', {

        headers: { 'Authorization': cookies.get('Auth-token') }
    })

    const productValuesRequest = await fetch(`http://localhost:1323/inventory/products/${params.slug}`, {

        headers: { 'Authorization': cookies.get('Auth-token') }
    })

    if (productValuesRequest.status !== 200) {
        throw redirect(302, "/login");
    }

    const productAttribiteNamesRequest = await fetch(`http://localhost:1323/inventory/products-attribute-names/${params.slug}`, {
        headers: { 'Authorization': cookies.get('Auth-token') }
    })

    const attributes = (await productAttribiteNamesRequest.json()).productAttributeName.map((element) => {
        return { element }
    })
    const values = (await productValuesRequest.json()).products
    console.log(values)

    return {
        productNames: (await productNamesRequest.json()).productNames,
        attributes: attributes,
        values: values,
        slug: params.slug,
        auth: cookies.get('Auth-token')
    }
};

export const actions = {
    addItem: async (event) => {
        const data = await event.request.formData();
        const attrValues = {}

        for (let field of data) {
            const [key, value] = field
            attrValues[key] = value
        }

        const api_url = 'http://localhost:1323';
        await fetch(`${api_url}/inventory/product-and-attribute-values`, {
            method: "POST",
            headers: { 'Authorization': event.cookies.get('Auth-token'), 'content-type': 'application/json' },
            body: JSON.stringify({ 'productTypeName': event.params.slug, attrValues })
        })
    },
    editItem: async (event) => {
        const data = await event.request.formData();
        const attrValues = {}

        for (let field of data) {
            const [key, value] = field
            if (key !== 'productNumber') {
                attrValues[key] = value
            }
        }
        console.log(data)

        const api_url = 'http://localhost:1323';
        await fetch(`${api_url}/inventory/product-and-attribute-values`, {
            method: "PATCH",
            headers: { 'Authorization': event.cookies.get('Auth-token'), 'content-type': 'application/json' },
            body: JSON.stringify({
                'productTypeName': event.params.slug, productNumber: data.get('productNumber'), attrValues
            })
        })
    },
    getProducts: async (event) => {
        const data = await event.request.formData()
        throw redirect(302, `/forms/${data.get('productSelection')}`);
    },
    addTable: async (event) => {
        const data = await event.request.formData()
        const attributes = []
        for (let field of data) {
            const [key, _] = field
            if (key !== 'tableName') {
                attributes.push(data.get(key))
            }
        }

        const api_url = 'http://localhost:1323';
        const resp = await fetch(`${api_url}/inventory/product-and-attributes`, {
            method: "POST",
            headers: { 'Authorization': event.cookies.get('Auth-token'), 'content-type': 'application/json' },
            body: JSON.stringify({ 'productTypeName': data.get('tableName'), attributes })
        })

        if (resp.status === 200) {
            redirect(302, `/forms/${data.get('tableName')}`)
        }

    },
    addColumn: async (event) => {
        const data = await event.request.formData()
        const columnName = data.get("column-name")

        const api_url = 'http://localhost:1323';
        fetch(`${api_url}/inventory/add-product-attribute`, {
            method: "POST",
            headers: { 'Authorization': event.cookies.get('Auth-token'), 'content-type': 'application/json' },
            body: JSON.stringify({ 'productTypeName': data.get('table-name'), 'attributeName': columnName })
        })
    }


};