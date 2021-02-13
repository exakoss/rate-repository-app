import React, {useContext} from 'react'
import {Button, View} from 'react-native'
import AuthStorageContext from '../contexts/AuthStorageContext'
import {useApolloClient} from '@apollo/client'
import {useHistory} from 'react-router-native'

const SignOut = () => {
  const authStorage = useContext(AuthStorageContext)
  const apolloClient = useApolloClient()
  let history = useHistory()
  const handleSignOut = async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
    history.push('/signIn')
  }

  return (
    <View>
      <Button title='Sign Out' onPress={handleSignOut}/>
    </View>
  )
}

export default SignOut
