import React from 'react'
import * as yup from 'yup'
import {Formik} from 'formik'
import FormikTextInput from './FormikTextInput'
import {Button, View} from 'react-native'
import useSignIn from '../hooks/useSignIn'
import { useHistory } from 'react-router-native'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username should be at least 5 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password should be at least 5 characters long')
    .required('Password is required')
})

const SignIn = () => {
  const [signIn] = useSignIn()
  let history = useHistory()

  const onSubmit = async values => {
    const { username, password } = values;
    try {
      const { authorize } = await signIn({ username, password });
      console.log(authorize.accessToken);
      history.push('/')
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <Formik initialValues={{username: '', password:''}} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({handleSubmit}) => (
          <View>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' secureTextEntry/>
          <Button title='Sign in' onPress={handleSubmit}/>
        </View>)}
      </Formik>
  )
};



export default SignIn;
