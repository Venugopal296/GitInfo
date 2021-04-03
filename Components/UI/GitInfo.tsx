import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GitInfoInterface } from '../../Interfaces/Interfaces';
import Colors from '../../Constants/Colors';

interface VisitInterface {
  vistRepos: () => void;
}

const GitInfo: React.FC<GitInfoInterface & VisitInterface> = ({
  name,
  bio,
  email,
  html_url,
  avatar_url,
  login,
  public_repos,
  vistRepos,
}) => {
  const { width, height } = useWindowDimensions();
  console.log(width, height);

  return (
    <View style={Styles().infoContainer}>
      <View style={Styles().imgOuterContainer}>
        <View style={Styles(height).imgContainer}>
          {avatar_url !== '' && (
            <Image
              source={{ uri: avatar_url }}
              style={{
                width: height < 737 || height == 812 || height == 844 ? 80 : 150,
                height: height < 737 || height == 812 || height == 844 ? 80 : 150,
              }}
            />
          )}
        </View>
        <View style={Styles().nameBioContainer}>
          {name !== null ? (
            <Text style={Styles().name}>{name}</Text>
          ) : (
            <Text style={{ ...Styles().name, ...Styles().noTextValue }}>
              No name
            </Text>
          )}
          <Text style={Styles().bio}>{bio}</Text>
        </View>
      </View>
      <View style={Styles(height).boxContainer}>
        <View style={{ marginBottom: 10 }}>
          <Text style={Styles().headerText}>Github Link</Text>
        </View>
        <View>
          <Text style={{ ...Styles().bodyText, ...Styles().link }}>
            {html_url}
          </Text>
        </View>
      </View>
      <View style={Styles(height).boxContainer}>
        <View style={{ marginBottom: 10 }}>
          <Text style={Styles().headerText}>Username</Text>
        </View>
        <Text style={Styles().bodyText}>{login}</Text>
      </View>
      <View style={Styles(height).boxContainer}>
        <View style={{ marginBottom: 10 }}>
          <Text style={Styles().headerText}>Mail ID</Text>
        </View>
        {email !== null ? (
          <Text style={Styles().bodyText}>{email}</Text>
        ) : (
          <Text style={{ ...Styles().bodyText, ...Styles().noTextValue }}>
            No mail id
          </Text>
        )}
      </View>
      <View style={Styles().repoOuterBoxContainer}>
        <View style={Styles().repoCountBoxContainer}>
          <Text style={Styles().headerText}>Total Repo's</Text>
          <Text style={Styles().repoCountValue}>{public_repos}</Text>
        </View>
        <TouchableOpacity
          onPress={vistRepos}
          style={Styles().repoVisitBoxContainer}
        >
          <Text style={{ ...Styles().headerText, color: 'white' }}>
            Visit Repo's
          </Text>
          <Icon name="chevron-forward-outline" color="white" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = (ht?: number) =>
  StyleSheet.create({
    infoContainer: {
      flex: 1,
      width: '98%',
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 10,
      marginBottom: 10,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imgOuterContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imgContainer: {
      width: ht !== undefined && (ht < 737 || ht == 812 || ht == 844) ? 80 : 150,
      height: ht !== undefined && (ht < 737 || ht == 812 || ht == 844) ? 80 : 150,
      borderRadius: 88,
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
      marginVertical: ht !== undefined && ht < 737 ? 5 : 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      height: ht !== undefined && ht < 668 ? 60 : 80,
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
      color: '#ff8c1a',
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
