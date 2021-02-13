import {GET_REPOSITORIES} from '../graphql/queries'
import  {useQuery } from '@apollo/react-hooks'

const useRepositories = () => useQuery(GET_REPOSITORIES,{fetchPolicy:'cache-and-network'})

export default useRepositories;
