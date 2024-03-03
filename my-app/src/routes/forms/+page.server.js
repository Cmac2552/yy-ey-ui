import { redirect } from '@sveltejs/kit';

// @ts-ignore
export const load = async ({ cookies }) => {
    // const response = await fetch('http://localhost:1323/restricted', { headers: { 'Authorization': cookies.get('Auth-token') } })

    const response = await fetch('http://localhost:1323/inventory/products/yak', {
        headers: { 'Authorization': cookies.get('Auth-token') }
    })
    console.log(await response.json())

    if (response.status !== 200) {
        throw redirect(302, "/login");
    }
};


