// @ts-nocheck
import { redirect } from '@sveltejs/kit';


export const load = async ({ cookies }) => {






    const productValues = await fetch('http://localhost:1323/inventory/products/yak', {

        headers: { 'Authorization': cookies.get('Auth-token') }
    })
    if (productValues.status !== 200) {
        throw redirect(302, "/login");
    }


    //FIX THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS in backend
    // const prodcutAttribites = ?????????????????????????????
    //STILL NEED TO DO THIS
    const prodcutAttribiteNames = await fetch('http://localhost:1323/inventory/products-attribute-names/yak', {
        headers: { 'Authorization': cookies.get('Auth-token') }
    })
    let products = (await prodcutAttribiteNames.json()).productAttributeName.map((element, index) => {
        return { index: element }
    })




    return {
        attributes: products,
        values: (await productValues.json()).products
    }
};


