// @ts-nocheck
import { invalid, redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();

        const name = data.get('username');
        const password = data.get('password');

        const api_url = 'http://localhost:1323';
        const response = await fetch(`${api_url}/login`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'username': name, 'password': password })
            }
        )

        let token = await response.json();

        if (response.status === 200) {
            cookies.set('Auth-token', 'Bearer ' + token.token, {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
            })

            throw redirect(302, "/");
        } else {
            return invalid(422, { errors: await token });
        }
    },
    signUp: async ({ request, cookies }) => {
        const data = await request.formData();

        const name = data.get('username');
        const password = data.get('password');

        const api_url = 'http://localhost:1323';
        const response = await fetch(`${api_url}/sign-up`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'username': name, 'password': password })
            }
        )

        let token = await response.json();

        if (response.status === 200) {
            cookies.set('Auth-token', 'Bearer ' + token.token, {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
            })

            throw redirect(302, "/");
        } else if (response.status === 409) {
            throw redirect(302, "/login")
        }
        else {
            return invalid(422, { errors: await token });
        }
    }

};