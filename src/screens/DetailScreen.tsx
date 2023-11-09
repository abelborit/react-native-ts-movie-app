import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParams} from '../navigators/StackNavigator';
import {useMoviesDetails} from '../hooks/useMovieDetails';
import {Loader} from '../components/Loader';
import {MovieCardDetails} from '../components/MovieCardDetails';

interface DetailScreenProps
  extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

export const DetailScreen = ({navigation, route}: DetailScreenProps) => {
  const dimensions = useWindowDimensions();

  const params = route.params;
  /* https://developer.themoviedb.org/docs/image-basics */
  const uriImage = `https://image.tmdb.org/t/p/w500${params.poster_path}`;

  const {moviesMoreInfoState, isLoading} = useMoviesDetails(params.id);

  return (
    <>
      {/* se coloca aquí afuera del <ScrollView></ScrollView> para que no se vea afeacto por el scroll y se quede fijo en esa posición así esté scrolleando hacia arriba o abajo */}
      <TouchableOpacity
        style={styles.btnBack}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Icon name="chevron-back-outline" size={30} color="#fff" />
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.container}>
          <View
            style={{...styles.imageContainer, height: dimensions.height * 0.7}}>
            <Image
              source={{
                uri: uriImage,
              }}
              style={styles.image}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.subTitle}>{params.original_title}</Text>
            <Text style={styles.title}>{params.title}</Text>
          </View>

          <View style={{marginTop: 8}}>
            {isLoading ? (
              <Loader globalView={false} size={60} />
            ) : (
              <MovieCardDetails
                movieDetails={moviesMoreInfoState.movieDetails!}
                movieCast={moviesMoreInfoState.cast!}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  btnBack: {
    backgroundColor: 'rgba(180, 0, 0, 1)',
    position: 'absolute',
    top: 15,
    left: 15,
    width: 35,
    height: 35,
    borderRadius: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    elevation: 99, // como el z-index pero para Android
  },

  container: {
    marginBottom: 50,
  },
  imageContainer: {
    flex: 1, // para que tome todo el largo y ancho de su padre
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 15,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 30,
    letterSpacing: 0.5,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200, 200, 200, 1)',
  },
});
