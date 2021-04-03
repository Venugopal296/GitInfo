import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Colors from '../../Constants/Colors';
import { RepoDetailParams } from '../../Interfaces/Interfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const Card: React.FC<RepoDetailParams> = props => {
  const {
    id,
    name,
    language,
    created_at,
    archived,
    size,
    forks_count,
    stargazers_count,
    watchers_count,
  } = props;

  return (
    <TouchableOpacity style={Styles.card} activeOpacity={0.6}>
      <View style={Styles.infoBox}>
        <View style={Styles.titleBadgeBox}>
          <View style={Styles.titleBox}>
            <Text style={Styles.titleText}>{name}</Text>
          </View>
          <View>
            <View style={Styles.badgeBox}>
              <Text style={Styles.badgeText}>
                {props.private ? 'PRIVATE' : 'PUBLIC'}
              </Text>
            </View>
          </View>
          {archived && (
            <View>
              <View style={{ ...Styles.badgeText, ...Styles.archivedBox }}>
                <Text style={Styles.badgeText}>
                  {archived && 'ARCHIVED'}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={Styles.langDateBox}>
          {language ? <View style={Styles.lDBox}>
            <Text style={Styles.lDText}>{language}</Text>
          </View> : <View></View>}
          <View style={Styles.lDBox}>
            <Text style={Styles.lDText}>{moment(created_at).format('L')}</Text>
          </View>
        </View>
      </View>

      <View style={Styles.otherInfoOuterBox}>
        <View style={Styles.otherInfoBox}>
          <Text style={Styles.head}>Size: </Text>
          <Text style={Styles.value}>{size}</Text>
        </View>
        <View style={Styles.otherInfoBox}>
          <Icon name="eye" color="#ff8c1a" size={20} />
          <Text style={Styles.value}>{watchers_count}</Text>
        </View>
        <View style={Styles.otherInfoBox}>
          <Icon name="git-network" color="#ff8c1a" size={20} />
          <Text style={Styles.value}>{forks_count}</Text>
        </View>
        <View style={Styles.otherInfoBox}>
          <Icon name="star" color="#ff8c1a" size={20} />
          <Text style={Styles.value}>{stargazers_count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 140,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: Colors.tertiary,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
  },
  infoBox: {
    flex: 1,
    margin: 5,
    justifyContent: 'space-between'
  },
  titleBadgeBox: {
    flexDirection: 'row',
  },
  titleBox: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    justifyContent: 'center',
  },
  titleText: {
    color: '#ff8c1a',
    fontSize: 20,
    fontWeight: '600',
  },
  badgeBox: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  archivedBox: {
    top: 0,
    left: 0,
  },
  badgeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  descBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  descText: {
    color: '#ffe0cc',
    fontSize: 16
  },
  langDateBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lDBox: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  lDText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  otherInfoOuterBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  otherInfoBox: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  head: {
    color: '#ff8c1a',
    fontWeight: '800',
    fontSize: 16,
  },
  value: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Card;
