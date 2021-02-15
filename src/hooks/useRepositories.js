import {GET_REPOSITORIES} from '../graphql/queries'
import  {useQuery } from '@apollo/react-hooks'

const useRepositories = ({orderBy, orderDirection, searchKeyword}) =>
  (orderBy === '' && orderDirection === '')
    ? useQuery(GET_REPOSITORIES,{fetchPolicy:'cache-and-network'})
    : useQuery(GET_REPOSITORIES,{variables:{orderBy: orderBy, orderDirection:orderDirection, searchKeyword:searchKeyword} ,fetchPolicy:'cache-and-network'})

export default useRepositories;
