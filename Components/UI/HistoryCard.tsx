import React from 'react';
import {
  Image, StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import Colors from '../../Constants/Colors';
import { GitInfoInterface } from '../../Interfaces/Interfaces';


interface HistoryParams {
  detailRepo: () => void;
}

const HistoryCard: React.FC<GitInfoInterface & HistoryParams> = props => {
  const { avatar_url, name, login, detailRepo } = props;
  const dispatch = useDispatch();

  return (
    <View style={Styles.swipeBox}>
      <TouchableOpacity
        style={Styles.card}
        activeOpacity={0.6}
        onPress={() => detailRepo()}
      >
        <View style={Styles.mainContainer}>
          <View style={Styles.imgContainer}>
            {avatar_url !== '' && (
              <Image
                source={{ uri: avatar_url }}
                style={{ width: 60, height: 60 }}
              />
            )}
          </View>
          <View style={Styles.infoContainer}>
            <View style={Styles.infoBox}>
              <Text style={{ ...Styles.text, ...Styles.header }}>Name: </Text>
              {name !== null ? (
                <Text style={Styles.text}>{name}</Text>
              ) : (
                <Text style={Styles.notext}>No Name</Text>
              )}
            </View>
            <View style={Styles.infoBox}>
              <Text style={{ ...Styles.text, ...Styles.header }}>
                User Name:{' '}
              </Text>
              {login !== null ? (
                <Text style={Styles.text}>{login}</Text>
              ) : (
                <Text style={Styles.notext}>No Username</Text>
              )}
            </View>
          </View>
        </View>
        <View>
          <Icon name="chevron-forward-outline" color="white" size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  swipeBox: {
    flex: 1,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0)',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.tertiary,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    borderBottomColor: '#686868',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  imgContainer: {
    width: 60,
    height: 60,
    borderRadius: 75,
    backgroundColor: 'black',
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  infoContainer: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  header: {
    fontWeight: 'bold',
  },
  notext: {
    color: 'gray',
    fontSize: 14,
  },
  swipeIcon: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: '25%',
  },
});

export default HistoryCard;
