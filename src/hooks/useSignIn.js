import {useMutation} from '@apollo/react-hooks'
import {AUTHORIZE} from '../graphql/mutations'
import { useApolloClient } from '@apollo/client'
import { useContext } from 'react'
import AuthStorageContext from '../contexts/AuthStorageContext'
import {AUTHORIZED_USER} from '../graphql/queries'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const authStorage = useContext(AuthStorageContext)
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({variables: {credentials: {username, password}}})
    await authStorage.setAccessToken(data.authorize.accessToken)
    // await apolloClient.resetStore()
    await apolloClient.clearStore();
    await apolloClient.reFetchObservableQueries()
    return data
  };

  return [signIn, result];
};

export default useSignIn
