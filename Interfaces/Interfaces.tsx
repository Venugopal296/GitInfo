export interface ConstantInterface {
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface DropdownInterface {
  searchBy: string;
  setSearchBy: (a: string) => void;
}

export interface GitInfoInterface {
  name?: string;
  bio?: string;
  avatar_url?: string;
  email?: string;
  html_url?: string;
  login?: string;
  public_repos?: number;
  repos_url?: string;
}

export interface NavigationInterface {
  navigation: any;
}
