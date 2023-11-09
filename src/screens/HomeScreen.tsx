import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {RootStackParams} from '../navigators/StackNavigator';
import {useMoviesInfo} from '../hooks/useMoviesInfo';
import {Loader} from '../components/Loader';
import {MovieCard} from '../components/MovieCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
import {getColorsHelper} from '../helpers/getColorsHelper';
import {GradientContext} from '../context/GradientContext';
import {useEffect} from 'react';

interface HomeScreenProps
  extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({}: HomeScreenProps) => {
  const {moviesState, isLoading} = useMoviesInfo();
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const {setMainColors} = useContext(GradientContext);

  const getCardMovieColors = async (index: number) => {
    const currentMovie = moviesState.now_playing[index];
    const uriImage = `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`;

    const {primaryColor = 'red', secondaryColor = 'blue'} =
      await getColorsHelper(uriImage);

    setMainColors({primaryColor, secondaryColor});
  };

  /* para obtener los colores del primer elemento */
  useEffect(() => {
    if (moviesState.now_playing.length > 0) {
      getCardMovieColors(0);
    }
    /* solo quiero que se dispare este useEffect() cuando cambia moviesState.now_playing porque si se hace lo que piden el array de dependencias sale esto: "Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."

    También surgirá la duda de que si cambia el moviesState.now_playing y el moviesState.now_playing.length > 0 entonces dispararía la función getCardMovieColors(0); con el índice en 0 pero recordar que para el moviesState.now_playing solo se hace una vez la petición y entonces cuando se monta el componente es la única vez que dispara este useEffect() ya que no cambia el moviesState.now_playing sino solo cambian los índices de de la movie enfocada */
  }, [moviesState.now_playing]);

  if (isLoading.now_playing) {
    return <Loader />;
  }

  return (
    <GradientBackground>
      {/* <ScrollView></ScrollView> para permitir hacer scroll en la pantalla */}
      <ScrollView>
        <View style={{...styles.container, marginTop: insets.top}}>
          {/* <MovieCard movie={moviesState[0]} /> */}

          {/* CARRUSEL PRINCIPAL */}
          {/* se coloca el View para que pueda tomar bien la sombra ya que se corta un poco y puede afectar lo visual */}
          <View
            style={{
              height: dimensions.width > dimensions.height ? 265 : 440,
              alignSelf: 'center',
            }}>
            <Carousel
              data={moviesState.now_playing}
              renderItem={({item}) => (
                <MovieCard
                  movie={item}
                  widthProp={dimensions.width > dimensions.height ? 250 : 300}
                  heightProp={dimensions.width > dimensions.height ? 250 : 440}
                />
              )}
              style={{
                width: dimensions.width,
                justifyContent: 'center',
                alignContent: 'center',
              }}
              width={340}
              height={dimensions.width > dimensions.height ? 265 : 440}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9, // How the "main" item will look
                parallaxScrollingOffset:
                  dimensions.width > dimensions.height ? 140 : 70, // How separate the adjacent items will be
                parallaxAdjacentItemScale:
                  dimensions.width > dimensions.height ? 0.65 : 0.7, // How big the adjacent items will look compared to the "main" item
              }}
              loop
              autoPlay={true}
              scrollAnimationDuration={1000}
              pagingEnabled={false} // false permite hace scroll largo y true solo puede pasar de uno en uno
              windowSize={dimensions.width > dimensions.height ? 4 : 2}
              snapEnabled // the snap helps to stop exactly in 1 item, no in the middle of two
              onSnapToItem={index => getCardMovieColors(index)} // saber en qué elemento me encuentro
            />
          </View>

          <HorizontalSlider title="Popular" moviesData={moviesState.popular} />
          <HorizontalSlider
            title="Top Rated"
            moviesData={moviesState.top_rated}
          />
          <HorizontalSlider
            title="Upcoming"
            moviesData={moviesState.upcoming}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {},
});
