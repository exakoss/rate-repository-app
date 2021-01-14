import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text'
import { TouchableWithoutFeedback} from 'react-native-web'
import theme from '../theme'
import { Link } from 'react-router-native'

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
  return (
      <View style={styles.container}>
        <ScrollView horizontal>
          <Link to='/'>
            <Text color='textWhite' fontSize='subheading' style={styles.text}>Repositories</Text>
          </Link>
          <Link to='/signIN'>
            <Text color='textWhite' fontSize='subheading' style={styles.text}>Sign In</Text>
          </Link>
        </ScrollView>
      </View>
)
};

export default AppBar;
