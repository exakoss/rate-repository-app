import React, {useContext} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text'
import theme from '../theme'
import { Link } from 'react-router-native'
import useAuthorizedUser from '../hooks/useAuthorizedUser'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: theme.distance.normal,
    backgroundColor: theme.colors.background,
    marginBottom: theme.distance.small,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  text: {
    margin: theme.distance.normal
  }
});

const AppBar = () => {

  console.log('Rendering App Bar')
  const {data, error, loading} = useAuthorizedUser()
  if (error) return null
  if (loading) return null
  console.log(data)
  if (data.authorizedUser === null) return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/signIn'>
          <Text color='textWhite' fontSize='subheading' style={styles.text}>Sign In</Text>
        </Link>
        <Link to='/signUp'>
          <Text color='textWhite' fontSize='subheading' style={styles.text}>Sign Up</Text>
        </Link>
      </ScrollView>
    </View>
  )
  else return (
      <View style={styles.container}>
        <ScrollView horizontal>
          <Link to='/'>
            <Text color='textWhite' fontSize='subheading' style={styles.text}>Repositories</Text>
          </Link>
          <Link to='/reviewForm'>
            <Text color='textWhite' fontSize='subheading' style={styles.text}>Review Repository</Text>
          </Link>
          <Link to='/signOut'>
            <Text color='textWhite' fontSize='subheading' style={styles.text}>Sign Out</Text>
          </Link>
        </ScrollView>
      </View>
)
}

export default AppBar;
