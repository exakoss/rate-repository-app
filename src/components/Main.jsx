import React from 'react'
import { StyleSheet, View } from 'react-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignIn'
import SignOut from './SignOut'
import {Route, Switch, useHistory} from 'react-router-native'
import SingleRepository from './SingleRepository'
import useAuthorizedUser from '../hooks/useAuthorizedUser'
import ReviewForm from './ReviewForm'
import SignUpForm from './SignUpForm'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8"
  },
});

const Main = () => {
  let history = useHistory()
  const {data, error, loading} = useAuthorizedUser()
  if (error) return null;
  if (loading) return null;
  (data.authorizedUser) ? history.push('/') : history.push('/signIn')
  return(
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route path='/signIn'>
          <SignIn/>
        </Route>
        <Route path='/reviewForm'>
          <ReviewForm/>
        </Route>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        <Route path='/signOut'>
          <SignOut/>
        </Route>
        <Route path='/signUp'>
          <SignUpForm/>
        </Route>
        <Route path='/repository/:id'>
          <SingleRepository/>
        </Route>
      </Switch>
    </View>
  )
}

export default Main
