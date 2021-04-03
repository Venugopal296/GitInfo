import { GitInfoInterface } from '../Interfaces/Interfaces';

class GitInfoData implements GitInfoInterface {
  constructor(
    public id: number,
    public name: string,
    public bio: string,
    public avatar_url: string,
    public email: string,
    public html_url: string,
    public login: string,
    public public_repos: number,
    public repos_url: string
  ) {}
}

export default GitInfoData;
