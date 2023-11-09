import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {RootStackParams} from '../navigators/StackNavigator';
import {useMoviesInfo} from '../hooks/useMoviesInfo';
import {Loader} from '../components/Loader';
import {MovieCard} from '../components/MovieCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HorizontalSlider} from '../components/HorizontalSlider';

interface HomeScreenProps
  extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({}: HomeScreenProps) => {
  const {moviesState, isLoading} = useMoviesInfo();
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();

  if (isLoading.now_playing) {
    return <Loader />;
  }

  return (
    /* <ScrollView></ScrollView> para permitir hacer scroll en la pantalla */
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
          />
        </View>

        <HorizontalSlider title="Popular" moviesData={moviesState.popular} />
        <HorizontalSlider
          title="Top Rated"
          moviesData={moviesState.top_rated}
        />
        <HorizontalSlider title="Upcoming" moviesData={moviesState.upcoming} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // flex: 1,
  },
});
