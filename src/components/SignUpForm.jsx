import React from 'react'
import {Formik} from 'formik'
import FormikTextInput from './FormikTextInput'
import { useHistory } from 'react-router-native'
import * as yup from 'yup'
import {View, Button} from 'react-native'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username should be at least 5 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password should be at least 5 characters long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null],'Passwords must match')
})

const SignUpForm = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  let history = useHistory()

  const onSubmit = async values => {
    const {passwordConfirmation, ...trueValues} = values
    try {
      const {createUser} = await signUp(trueValues)
      const { authorize } = await signIn(trueValues)
    }
    catch (e) {
      console.log(e)
    }
  }
  return(
    <Formik onSubmit={onSubmit} initialValues={{username: '', password:'', passwordConfirmation: ''}} validationSchema={validationSchema}>
      {({handleSubmit})=>(
        <View>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' secureTextEntry/>
          <FormikTextInput name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry/>
          <Button title='Sign Up' onPress={handleSubmit}/>
        </View>)}
    </Formik>
  )
}

export default SignUpForm
