import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {CastInterface} from '../interfaces/creditsInterface';

interface ActorCardProps {
  actorInfo: CastInterface;
  heightProp: number;
  isHorizontal: boolean;
}

// export const ActorCard: React.FC<ActorCardProps> = ({}) => {
export const ActorCard = ({
  actorInfo,
  heightProp,
  isHorizontal,
}: ActorCardProps) => {
  const uriImage = `https://image.tmdb.org/t/p/w500${actorInfo.profile_path}`;
  const withoutImage =
    'https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg';

  return (
    <View
      style={{
        ...styles.container,
        height: heightProp,
        marginHorizontal: isHorizontal ? 10 : 0,
      }}>
      {actorInfo.profile_path ? (
        <Image
          source={{uri: uriImage}}
          style={{...styles.image, width: heightProp, height: heightProp}}
        />
      ) : (
        <Image
          source={{uri: withoutImage}}
          style={{...styles.image, width: heightProp, height: heightProp}}
        />
      )}

      <View style={styles.namesContainer}>
        <Text style={styles.actorName}>{actorInfo.name}</Text>
        <Text style={styles.characterName}>{actorInfo.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 8,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  image: {
    borderRadius: 15,
  },
  actorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  namesContainer: {
    flex: 0.95,
  },
  characterName: {
    fontSize: 15,
  },
});
