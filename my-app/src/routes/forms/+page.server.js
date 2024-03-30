// @ts-nocheck
import { redirect } from '@sveltejs/kit';


export const load = async ({ cookies }) => {

    const productValues = await fetch('http://localhost:1323/inventory/products/yak', {

        headers: { 'Authorization': cookies.get('Auth-token') }
    })
    if (productValues.status !== 200) {
        throw redirect(302, "/login");
    }

    const prodcutAttribiteNames = await fetch('http://localhost:1323/inventory/products-attribute-names/yak', {
        headers: { 'Authorization': cookies.get('Auth-token') }
    })
    let products = (await prodcutAttribiteNames.json()).productAttributeName.map((element) => {
        return { element }
    })



    return {
        attributes: products,
        values: (await productValues.json()).products
    }
};

export const actions = {
    addItem: async ({ request, cookies }) => {
        const data = await request.formData();
        const item = {}
        for (let field of data) {
            const [key, value] = field
            item[key] = value
        }

        const api_url = 'http://localhost:1323';
        await fetch(`${api_url}/inventory/product-and-attribute-values`, {
            method: "POST",
            headers: { 'Authorization': cookies.get('Auth-token'), 'content-type': 'application/json' },
            body: JSON.stringify({ 'productTypeName': 'yak', 'attrValues': item })
        })



    }
};

