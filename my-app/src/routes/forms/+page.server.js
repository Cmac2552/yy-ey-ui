// @ts-nocheck
import { redirect } from '@sveltejs/kit';


export const load = async ({ cookies }) => {

    //FIX THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS in backend
    // const prodcutAttribites = ?????????????????????????????





    const productValues = await fetch('http://localhost:1323/inventory/products/yak', {

        headers: { 'Authorization': cookies.get('Auth-token') }
    })

    if (productValues.status !== 200) {
        throw redirect(302, "/login");
    }





    return {
        values: (await productValues.json()).products
    }
};


