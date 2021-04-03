export type ConstantVariableType = {
  primary: string;
  secondary: string;
  tertiary: string;
}

export type GitInfoInterface = {
  id: number;
  name: string;
  bio: string;
  avatar_url: string;
  email: string;
  html_url: string;
  login: string;
  public_repos: number;
  repos_url: string;
}

export type RepoDetailParams = {
  id: number;
  name: string;
  description: string;
  language: string;
  created_at: Date;
  archived: boolean;
  private: boolean;
  size: number;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
}

export type GitDetailParams = {
  url: string
}

export type SearchNavigatorParamList = {
  GitSearch: undefined;
  GitDetail: GitDetailParams;
};

export type HistoryNavigatorParamList = {
  History: undefined;
  GitDetail: GitDetailParams;
};
