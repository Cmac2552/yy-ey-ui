// @ts-nocheck
import { redirect } from '@sveltejs/kit';


export const load = async ({ cookies }) => {

    //get the first one and go there
    const productNamesRequest = await fetch('http://localhost:1323/inventory/productNames', {

        headers: { 'Authorization': cookies.get('Auth-token') }
    })

    const productName = (await productNamesRequest.json()).productNames[0]

    throw redirect(302, `/forms/${productName}`);

    //or tell the person they need to create one
};


