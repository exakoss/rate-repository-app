import React from 'react'
import {Formik} from 'formik'
import FormikTextInput from './FormikTextInput'
import {Button, View} from 'react-native'
import { useHistory } from 'react-router-native'
import * as yup from 'yup'
import useReview from '../hooks/useReview'

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Repository rating is required'),
  text: yup
    .string()
})

const ReviewForm = () => {
  const [submitReview] = useReview()
  let history = useHistory()

  const onSubmit = async values => {
    const trueValues = {...values, rating: Number(values.rating)}
    console.log(trueValues)
    try {
      const { createReview } = await submitReview(trueValues)
      history.push(`/repository/${createReview.repositoryId}`)
    }
    catch (e) {
      console.log(e)
    }
  }

  return(
    <Formik onSubmit={onSubmit} initialValues={{ownerName: '', repositoryName:'',rating: null, text: ''}} validationSchema={validationSchema}>
        {({handleSubmit})=>(
          <View>
          <FormikTextInput name='ownerName' placeholder='Repository owner name' />
          <FormikTextInput name='repositoryName' placeholder='Repository name'/>
          <FormikTextInput name='rating' placeholder='Rating between 0 and 100'/>
          <FormikTextInput name='text' placeholder='Review text'/>
          <Button title='Create a review' onPress={handleSubmit}/>
        </View>)}
    </Formik>
  )
}

export default ReviewForm
