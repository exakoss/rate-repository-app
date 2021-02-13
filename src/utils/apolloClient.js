import ApolloClient from 'apollo-boost'
import Constants from 'expo-constants'

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken()
        // console.log(`Header access token is ${accessToken}`)
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : ''
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    uri: 'http://192.168.1.16:5000/graphql'
  });
};

export default createApolloClient
