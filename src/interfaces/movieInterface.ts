// Generated by https://quicktype.io

/* Interfaces para las respuestas de las peticiones de las películas con información general según si están en cine, populares, por llegar, etc... */
export interface MovieResponseInterface {
  dates?: Dates;
  page: number;
  results: MovieDataInterface[];
  total_pages: number;
  total_results: number;
}

export interface Dates {
  maximum: Date;
  minimum: Date;
}

export interface MovieDataInterface {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum OriginalLanguage {
  En = 'en',
  Es = 'es',
  Uk = 'uk',
}

/* Interfaces para las respuestas de las peticiones de las películas con información detallada */
export interface MovieDetailsInterface {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: GenreInterface[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanyInterface[];
  production_countries: ProductionCountryInterface[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguageInterface[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GenreInterface {
  id: number;
  name: string;
}

export interface ProductionCompanyInterface {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountryInterface {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguageInterface {
  english_name: string;
  iso_639_1: string;
  name: string;
}