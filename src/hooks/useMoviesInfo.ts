import {useEffect, useState} from 'react';
import {movieAPI} from '../apis/movieAPI';
import {
  MovieDataInterface,
  MovieResponseInterface,
} from '../interfaces/movieInterface';

type MovieDataState = {
  now_playing: MovieDataInterface[];
  popular: MovieDataInterface[];
  top_rated: MovieDataInterface[];
  upcoming: MovieDataInterface[];
};

type LoadingMovieState = {
  now_playing: boolean;
  popular: boolean;
  top_rated: boolean;
  upcoming: boolean;
};

type ErrorMovieState = {
  now_playing: string | boolean;
  popular: string | boolean;
  top_rated: string | boolean;
  upcoming: string | boolean;
};

export const useMoviesInfo = () => {
  const [moviesState, setMoviesState] = useState<MovieDataState>({
    now_playing: [],
    popular: [],
    top_rated: [],
    upcoming: [],
  });

  const [isLoading, setIsLoading] = useState<LoadingMovieState>({
    now_playing: true,
    popular: true,
    top_rated: true,
    upcoming: true,
  });

  const [movieErrors, setMovieErrors] = useState<ErrorMovieState>({
    now_playing: false,
    popular: false,
    top_rated: false,
    upcoming: false,
  });

  useEffect(() => {
    /* mantener la comprobación de que si el componente está montado para evitar actualizaciones de estado innecesarias después de que el componente se desmonte */
    let isMounted = true;

    /* pathUrl: keyof MovieDataState para sacar los path que se necesitan para hacer el llamado a las API y hacerlo más dinámino y escalable */
    const getFetchMovies = async (pathUrl: keyof MovieDataState) => {
      setIsLoading(prevState => ({...prevState, [pathUrl]: true}));

      try {
        const response = await movieAPI.get<MovieResponseInterface>(
          `/${pathUrl}`,
        );

        return {pathUrl, dataFetch: response.data.results};
      } catch (error) {
        return {
          pathUrl,
          errorFetch:
            error instanceof Error // es como un throw new Error("")
              ? error.message
              : '❌ An unknown error occurred in the request',
          // errorFetch: error,
        };
      }
    };

    /* colocar los path que necesito para hacer las peticiones */
    /* En este código, se realizan las llamadas a la API utilizando Promise.allSettled. Se hace una verificación de cada resultado para verificar si está fulfilled o rejected. Luego, se manejan los resultados de acuerdo con el estado de la promesa y se actualizan los estados correspondientes. Específicamente, se accede a las propiedades pathUrl, dataFetch, y errorFetch dentro del bloque if y else if para poder usarlas sin errores de tipo. */
    Promise.allSettled([
      getFetchMovies('now_playing'),
      getFetchMovies('popular'),
      getFetchMovies('top_rated'),
      getFetchMovies('upcoming'),
    ])
      .then(resultsFetch => {
        if (isMounted) {
          /* resultsFetch es un arreglo con las respuestas (resueltas y/o rechazadas) de las peticiones */
          resultsFetch.forEach(resultElement => {
            const result = resultElement as PromiseSettledResult<{
              pathUrl: keyof MovieDataState;
              dataFetch?: MovieDataInterface[];
              errorFetch?: string;
            }>;

            if (result.status === 'fulfilled' && 'dataFetch' in result.value) {
              setMoviesState(prevState => ({
                ...prevState,
                [result.value.pathUrl]: result.value.dataFetch,
              }));

              setMovieErrors(prevState => ({
                ...prevState,
                [result.value.pathUrl]: false,
              }));
            } else if (
              result.status === 'rejected' &&
              'errorFetch' in result.reason
            ) {
              setMovieErrors(prevState => ({
                ...prevState,
                [result.reason.pathUrl]: result.reason.errorFetch,
              }));
            }
          });
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(prevState => ({
            ...prevState,
            now_playing: false,
            popular: false,
            top_rated: false,
            upcoming: false,
          }));
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    moviesState,
    isLoading,
    movieErrors,
  };
};
