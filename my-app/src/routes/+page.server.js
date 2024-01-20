// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    const response = await fetch('http://localhost:1323/restricted', { headers: { 'Authorization': cookies.get('Auth-token') } })

    if (response.status !== 200) {
        throw redirect(302, "/login");
    }
};

