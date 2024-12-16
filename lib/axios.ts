import axios from 'axios';

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export const githubApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
});
