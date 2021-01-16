import React from 'react';
import {Formik} from 'formik'
import FormikTextInput from './FormikTextInput'
import {Button, View} from 'react-native'
import theme from '../theme'

const SignIn = () => {
  return (
      <Formik initialValues={{username: '', password:''}} onSubmit={values => console.log(values)}>
        {({handleSubmit}) => (
          <View style={{backgroundColor: theme.colors.textWhite}}>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' secureTextEntry/>
          <Button title='Sign in' onPress={handleSubmit}/>
        </View>)}
      </Formik>
  )
};



export default SignIn;
