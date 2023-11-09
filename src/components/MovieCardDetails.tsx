import React from 'react';
import {/* FlatList, */ ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MovieDetailsInterface} from '../interfaces/movieInterface';
import {
  // CastInterface,
  MovieCreditsInterface,
} from '../interfaces/creditsInterface';
import {ActorCard} from './ActorCard';

interface MovieCardDetailsProps {
  movieDetails: MovieDetailsInterface;
  movieCast: MovieCreditsInterface;
}

export const MovieCardDetails = ({
  movieDetails,
  movieCast,
}: MovieCardDetailsProps) => {
  const budgetFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(movieDetails.budget);

  return (
    <View>
      <View style={styles.ratingContainer}>
        <Icon name="star-outline" size={22} color="#666" />
        <Text style={styles.ratingText}>{movieDetails.vote_average}</Text>
        <Text style={styles.genres}>
          /{' '}
          {movieDetails.genres
            .map(genreElement => genreElement.name)
            .join(', ')}
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.releaseData}>
          <Text style={{fontWeight: 'bold'}}>Fecha de lanzamiento: </Text>
          {String(movieDetails.release_date)}
        </Text>

        <Text style={styles.title}>Historia</Text>
        <Text style={styles.description}>
          {movieDetails.overview ? movieDetails.overview : 'No hay descripción'}
        </Text>
        <Text style={styles.title}>Presupuesto</Text>

        {movieDetails.budget !== 0 ? (
          <Text style={styles.description}>{budgetFormat}</Text>
        ) : (
          <Text style={styles.description}>
            No se dio a conocer el presupuesto
          </Text>
        )}

        <Text style={styles.title}>Actores</Text>
        {/* HORIZONTAL */}
        {/* <FlatList
          style={styles.movieCastContainerFlatList}
          data={movieCast.cast}
          renderItem={({item}: any) => (
            <ActorCard actorInfo={item} heightProp={60} isHorizontal />
          )}
          keyExtractor={(item: CastInterface) =>
            item.id.toString() + item.cast_id?.toString() + item.credit_id
          } // el keyExtractor es como el key de los map pero este keyExtractor tiene que ser un string
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        /> */}

        {/* VERTICAL */}
        <ScrollView
          style={styles.movieCastContainer}
          contentContainerStyle={{padding: 10}}
          nestedScrollEnabled>
          {movieCast.cast.map(actorElement => (
            <ActorCard
              key={
                actorElement.id.toString() +
                actorElement.cast_id?.toString() +
                actorElement.credit_id
              }
              actorInfo={actorElement}
              heightProp={70}
              isHorizontal={false}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingText: {
    fontSize: 17,
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  genres: {
    fontSize: 15,
    letterSpacing: 0.5,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 6,
    marginHorizontal: 20,
    marginTop: 8,
    alignItems: 'center',
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginTop: 8,
  },
  releaseData: {
    fontSize: 15,
    marginBottom: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 4,
  },
  description: {
    textAlign: 'justify',
    fontSize: 18,
    color: '#333',
  },
  movieCastContainerFlatList: {
    marginHorizontal: '-30%',
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(220, 220, 220, 0.8)',
    marginBottom: 40,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  movieCastContainer: {
    maxHeight: 480,
    borderRadius: 15,
    backgroundColor: 'rgba(220, 220, 220, 0.8)',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
});
