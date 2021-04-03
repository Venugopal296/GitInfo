import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';
import { useDispatch } from 'react-redux';

import { GitInfoInterface } from '../../Interfaces/Interfaces';
import Colors from '../../Constants/Colors';
import { deleteSingleUser } from '../../Store/Actions/HistoryAction';

interface HistoryParams {
  detailRepo: () => void;
}

const HistoryCard: React.FC<GitInfoInterface & HistoryParams> = props => {
  const { avatar_url, name, login, detailRepo } = props;
  const dispatch = useDispatch();

  const deleteEntry = async () => {
    Alert.alert('Caution!', 'Are you sure want to delete', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          try {
            await dispatch(deleteSingleUser(login));
          } catch (err) {}
        },
      },
    ]);
  };

  const swipeoutBtns = [
    {
      // onPress={() => {}},
      backgroundColor: 'white',
      sensitivity: 100,
      underlayColor: 'rgba(255, 255, 255, 0.8)',
      component: (
        <Icon
          name="trash"
          color={Colors.primary}
          size={35}
          style={Styles.swipeIcon}
          onPress={deleteEntry}
        />
      ),
      // onPress={deleteEntry}
    },
  ];

  return (
    <Swipeout style={Styles.swipeBox} right={swipeoutBtns}>
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
    </Swipeout>
  );
};

const Styles = StyleSheet.create({
  swipeBox: {
    flex: 1,
    height: 80,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.tertiary,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
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
