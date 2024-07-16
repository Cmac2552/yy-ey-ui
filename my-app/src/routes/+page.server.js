// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    await fetch('http://localhost:1323/restricted', { headers: { 'Authorization': cookies.get('Auth-token') } }).catch(() => {
        throw redirect(302, "/error");
    })


    throw redirect(302, "/login");


};

