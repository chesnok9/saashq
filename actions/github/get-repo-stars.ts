import axios, { AxiosResponse } from 'axios';

export default async function getGithubRepoStars(): Promise<number> {
  try {
    const response: AxiosResponse<any> = await axios.get(
      process.env.NEXT_PUBLIC_GITHUB_REPO_API ||
        'https://api.github.com/repos/saashqdev/saashq'
    );
    const stars = response.data;

    return stars.stargazers_count;
  } catch (error) {
    console.error('Error fetching commits:', error);
    return 0;
  }
}
