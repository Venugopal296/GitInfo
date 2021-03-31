import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GitInfoInterface } from '../../Interfaces/Interfaces';
import Colors from '../../Constants/Colors';

interface navigateInterface {
  navigate: (a: string, b: { url: string | undefined }) => void;
}

type combined = GitInfoInterface & navigateInterface;

const GitInfo: React.FC<combined> = ({
  name,
  bio,
  email,
  html_url,
  avatar_url,
  login,
  public_repos,
  repos_url,
  navigate,
}) => {
  const visitRepo = () => {
    navigate('Git Detail', { url: repos_url });
  };

  return (
    <View style={Styles.infoContainer}>
      <View style={Styles.imgOuterContainer}>
        <View style={Styles.imgContainer}>
          <Image
            source={{ uri: avatar_url }}
            style={{ width: 150, height: 150 }}
          />
        </View>
        <View style={Styles.nameBioContainer}>
          {name !== null ? (
            <Text style={Styles.name}>{name}</Text>
          ) : (
            <Text style={{ ...Styles.name, ...Styles.noTextValue }}>
              No name
            </Text>
          )}
          <Text style={Styles.bio}>{bio}</Text>
        </View>
      </View>
      <View style={Styles.boxContainer}>
        <View style={{ marginBottom: 10 }}>
          <Text style={Styles.headerText}>Github Link</Text>
        </View>
        <View>
          <Text style={{ ...Styles.bodyText, ...Styles.link }}>{html_url}</Text>
        </View>
      </View>
      <View style={Styles.boxContainer}>
        <View style={{ marginBottom: 10 }}>
          <Text style={Styles.headerText}>Username</Text>
        </View>
        <Text style={Styles.bodyText}>{login}</Text>
      </View>
      <View style={Styles.boxContainer}>
        <View style={{ marginBottom: 10 }}>
          <Text style={Styles.headerText}>Mail ID</Text>
        </View>
        {email !== null ? (
          <Text style={Styles.bodyText}>{email}</Text>
        ) : (
          <Text style={{ ...Styles.bodyText, ...Styles.noTextValue }}>
            No mail id
          </Text>
        )}
      </View>
      <View style={Styles.repoOuterBoxContainer}>
        <View style={Styles.repoCountBoxContainer}>
          <Text style={Styles.headerText}>Public Repo's</Text>
          <Text style={Styles.repoCountValue}>{public_repos}</Text>
        </View>
        <TouchableOpacity
          onPress={visitRepo}
          style={Styles.repoVisitBoxContainer}
        >
          <Text style={Styles.headerText}>Visit Repo's</Text>
          <Icon name="chevron-forward-outline" color="white" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  imgOuterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  nameBioContainer: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginVertical: 15,
    color: 'white',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: 'gray',
  },
  boxContainer: {
    paddingVertical: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: 60,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: Colors.tertiary,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
  },
  repoOuterBoxContainer: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  repoCountBoxContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '50%',
    height: 120,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: Colors.tertiary,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
  },
  repoVisitBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 60,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 5,
    color: 'white',
  },
  bodyText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  noTextValue: {
    color: 'gray',
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
  },

  repoCountContainer: {
    marginRight: 20,
    marginVertical: 10,
  },
  repoCountValue: {
    fontSize: 50,
    fontWeight: '600',
    color: 'white',
  },
});

export default GitInfo;