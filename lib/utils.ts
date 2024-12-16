import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { githubApi } from './axios';

const username = 'minhduc5a15';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getStarsAndCommits = async () => {
    const reposResponse = await githubApi.get(`/users/${username}/repos`);
    console.log(reposResponse.data)
    const repos = reposResponse.data;

    let totalStars = 0;

    for (const repo of repos) {
        totalStars += repo.stargazers_count;
    }

    return {
        totalStars,
    }
};
