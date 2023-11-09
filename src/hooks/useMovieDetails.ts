import {useCallback, useEffect, useState} from 'react';
import {movieAPI} from '../apis/movieAPI';
import {MovieDetailsInterface} from '../interfaces/movieInterface';
import {MovieCreditsInterface} from '../interfaces/creditsInterface';

type MovieMoreInfoState = {
  movieDetails?: MovieDetailsInterface;
  cast?: MovieCreditsInterface;
};

type ErrorMovieState = {
  movieDetailsError: string | boolean;
  castError: string | boolean;
};

export const useMoviesDetails = (movieId: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [moviesMoreInfoState, setMoviesMoreInfoState] =
    useState<MovieMoreInfoState>({
      movieDetails: undefined,
      cast: undefined,
    });

  const [movieErrors, setMovieErrors] = useState<ErrorMovieState>({
    movieDetailsError: false,
    castError: false,
  });

  /* si se quiere trabajar por separado se podrían hacer dos funciones para cada petición */

  const getFetchMovieMoreInfo = useCallback(
    async (movieId: number, isDetail: boolean) => {
      setIsLoading(true);

      try {
        if (isDetail) {
          const response = await movieAPI.get<MovieDetailsInterface>(
            `/${movieId}`,
          );
          return {dataFetchDetails: response.data};
        } else {
          const response = await movieAPI.get<MovieCreditsInterface>(
            `/${movieId}/credits`,
          );
          return {dataFetchCast: response.data};
        }
      } catch (error) {
        return {
          errorFetchDetails:
            error instanceof Error // es como un throw new Error("")
              ? error.message
              : '❌ An unknown error occurred in the request',
          // errorFetch: error,
        };
      }
    },
    [],
  );

  useEffect(() => {
    /* mantener la comprobación de que si el componente está montado para evitar actualizaciones de estado innecesarias después de que el componente se desmonte */
    let isMounted = true;
    /* En lugar de llamar a setState múltiples veces en cada bloque if, podrías reunir las actualizaciones de estado y llamar a setState una sola vez al final de cada operación, así se reducirían los cambios en el estado y, por ende, las actualizaciones en la interfaz gráfica */
    const updatedMovieState = {...moviesMoreInfoState};
    const updatedErrorState = {...movieErrors};

    /* colocar los path que necesito para hacer las peticiones */
    /* En este código, se realizan las llamadas a la API utilizando Promise.allSettled. Se hace una verificación de cada resultado para verificar si está fulfilled o rejected. Luego, se manejan los resultados de acuerdo con el estado de la promesa y se actualizan los estados correspondientes. Específicamente, se accede a las propiedades pathUrl, dataFetch, y errorFetch dentro del bloque if y else if para poder usarlas sin errores de tipo. */
    Promise.allSettled([
      getFetchMovieMoreInfo(movieId, true), // detalles de la película
      getFetchMovieMoreInfo(movieId, false), // cast o elenco
    ])
      .then(resultsFetch => {
        if (isMounted) {
          /* resultsFetch es un arreglo con las respuestas (resueltas y/o rechazadas) de las peticiones */
          resultsFetch.forEach(resultElement => {
            const result = resultElement as PromiseSettledResult<{
              dataFetchDetails?: MovieDetailsInterface;
              dataFetchCast?: MovieCreditsInterface;
              errorFetchDetails?: string;
              errorFetchCast?: string;
            }>;

            if (result.status === 'fulfilled') {
              if ('dataFetchDetails' in result.value) {
                /* respuesta aceptada para detalles */
                updatedMovieState.movieDetails = result.value.dataFetchDetails;
                updatedErrorState.movieDetailsError = false;
              } else if ('dataFetchCast' in result.value) {
                /* respuesta aceptada para cast o elenco */
                updatedMovieState.cast = result.value.dataFetchCast;
                updatedErrorState.castError = false;
              }
            } else if (result.status === 'rejected') {
              if ('errorFetchDetails' in result.reason) {
                /* respuesta rechazada para detalles */
                updatedErrorState.movieDetailsError =
                  result.reason.errorFetchDetails;
              } else if ('errorFetchCast' in result.reason) {
                /* respuesta rechazada para cast o elenco */
                updatedErrorState.castError = result.reason.errorFetchCast;
              }
            }

            // Actualización de estado una vez en cada bloque
            setMoviesMoreInfoState(updatedMovieState);
            setMovieErrors(updatedErrorState);
          });
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
    /* solo se coloca el movieId porque si se colocan las dependencias que solicita se crearía un bucle infinito, en este caso solo necesito que se dispare en useEffect() cuando el movieId cambia */
  }, [movieId]);

  return {
    moviesMoreInfoState,
    isLoading,
    movieErrors,
  };
};

/* ***** OTRA FORMA DE HACERLO ***** */
// import {useEffect, useState} from 'react';
// import {movieAPI} from '../apis/movieAPI';
// import {MovieDetailsInterface} from '../interfaces/movieInterface';
// import {CastInterface} from '../interfaces/creditsInterface';

// type MovieMoreInfoState = {
//   movieDetails?: MovieDetailsInterface;
//   cast: CastInterface[]; // elenco de la película
// };

// type LoadingMovieState = {
//   movieDetailsLoading: boolean;
//   castLoading: boolean;
// };

// type ErrorMovieState = {
//   movieDetailsError: string | boolean;
//   castError: string | boolean;
// };

// export const useMoviesDetails = (movieId: number) => {
//   const [moviesMoreInfoState, setMoviesMoreInfoState] =
//     useState<MovieMoreInfoState>({
//       movieDetails: undefined,
//       cast: [],
//     });

//   const [isLoading, setIsLoading] = useState<LoadingMovieState>({
//     movieDetailsLoading: true,
//     castLoading: true,
//   });

//   const [movieErrors, setMovieErrors] = useState<ErrorMovieState>({
//     movieDetailsError: false,
//     castError: false,
//   });

//   /* si se quiere trabajar por separado se podrían hacer dos funciones para cada petición */
//   const getFetchMovieMoreInfo = async (movieId: number, isDetail: boolean) => {
//     setIsLoading(prevState => ({
//       ...prevState,
//       movieDetailsLoading: true,
//       castLoading: true,
//     }));

//     try {
//       if (isDetail) {
//         const response = await movieAPI.get<MovieDetailsInterface>(
//           `/${movieId}`,
//         );
//         return {movieId, dataFetchDetails: response.data};
//       } else {
//         const response = await movieAPI.get<CastInterface>(
//           `/${movieId}/credits`,
//         );
//         return {movieId, dataFetchCast: response.data};
//       }
//     } catch (error) {
//       return {
//         errorFetchDetails:
//           error instanceof Error // es como un throw new Error("")
//             ? error.message
//             : '❌ An unknown error occurred in the request',
//         // errorFetch: error,
//       };
//     }
//   };

//   useEffect(() => {
//     /* mantener la comprobación de que si el componente está montado para evitar actualizaciones de estado innecesarias después de que el componente se desmonte */
//     let isMounted = true;

//     /* colocar los path que necesito para hacer las peticiones */
//     /* En este código, se realizan las llamadas a la API utilizando Promise.allSettled. Se hace una verificación de cada resultado para verificar si está fulfilled o rejected. Luego, se manejan los resultados de acuerdo con el estado de la promesa y se actualizan los estados correspondientes. Específicamente, se accede a las propiedades pathUrl, dataFetch, y errorFetch dentro del bloque if y else if para poder usarlas sin errores de tipo. */
//     Promise.allSettled([
//       getFetchMovieMoreInfo(movieId, true), // detalles de la película
//       getFetchMovieMoreInfo(movieId, false), // cast o elenco
//     ])
//       .then(resultsFetch => {
//         if (isMounted) {
//           /* resultsFetch es un arreglo con las respuestas (resueltas y/o rechazadas) de las peticiones */
//           resultsFetch.forEach(resultElement => {
//             const result = resultElement as PromiseSettledResult<{
//               movieId: number;
//               dataFetchDetails?: MovieDetailsInterface;
//               dataFetchCast?: CastInterface[];
//               errorFetchDetails?: string;
//               errorFetchCast?: string;
//             }>;

//             if (result.status === 'fulfilled') {
//               if ('dataFetchDetails' in result.value) {
//                 /* respuesta aceptada para detalles */
//                 setMoviesMoreInfoState(prevState => ({
//                   ...prevState,
//                   movieDetails: result.value.dataFetchDetails,
//                 }));
//                 setMovieErrors(prevState => ({
//                   ...prevState,
//                   movieDetailsError: false,
//                 }));
//               } else if ('dataFetchCast' in result.value) {
//                 /* respuesta aceptada para cast o elenco */
//                 setMoviesMoreInfoState(prevState => ({
//                   ...prevState,
//                   cast: result.value.dataFetchCast || [],
//                 }));
//                 setMovieErrors(prevState => ({
//                   ...prevState,
//                   castError: false,
//                 }));
//               }
//             } else if (result.status === 'rejected') {
//               if ('errorFetchDetails' in result.reason) {
//                 /* respuesta rechazada para detalles */
//                 setMovieErrors(prevState => ({
//                   ...prevState,
//                   movieDetailsError: result.reason.errorFetchDetails,
//                 }));
//               } else if ('errorFetchCast' in result.reason) {
//                 /* respuesta rechazada para cast o elenco */
//                 setMovieErrors(prevState => ({
//                   ...prevState,
//                   castError: result.reason.errorFetchCast,
//                 }));
//               }
//             }
//           });
//         }
//       })
//       .finally(() => {
//         if (isMounted) {
//           setIsLoading(prevState => ({
//             ...prevState,
//             movieDetailsLoading: false,
//             castLoading: false,
//           }));
//         }
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [movieId]);

//   return {
//     moviesMoreInfoState,
//     isLoading,
//     movieErrors,
//   };
// };
