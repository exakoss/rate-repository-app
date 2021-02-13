import {useQuery} from '@apollo/react-hooks'
import {AUTHORIZED_USER} from '../graphql/queries'

const useAuthorizedUser = () => useQuery(AUTHORIZED_USER,{fetchPolicy:'cache-and-network'})

export default useAuthorizedUser
