export interface CountryNames {
  common: string;
}

export interface CountryCodes {
  alpha_2: string;
}

export interface CountryFlag {
  url_svg?: string | null;
  description?: string | null;
}

export interface CountryCapital {
  name: string;
}

export interface Country {
  names: CountryNames;
  codes: CountryCodes;
  flag?: CountryFlag | null;
  population?: number | null;
  region?: string | null;
  capitals?: CountryCapital[] | null;
}
