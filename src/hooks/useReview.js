import {useMutation} from '@apollo/react-hooks'
import {CREATE_REVIEW} from '../graphql/mutations'

const useReview = () => {
  const [mutate,result] = useMutation(CREATE_REVIEW)
  const submitReview = async review => {
    const { data } = await mutate({variables:{review: review}})
    return data
  }
  return [submitReview,result]
}

export default useReview
