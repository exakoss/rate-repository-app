import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import {Formik} from 'formik'
import {Button, View} from 'react-native'
import FormikTextInput from '../components/FormikTextInput'

const SignInContainer = ({onSubmit}) => {

  return (
    <Formik initialValues={{username: '', password:''}} onSubmit={onSubmit}>
      {({handleSubmit}) => (
        <View>
          <FormikTextInput name='username' placeholder='Username' testID='formikUsername'/>
          <FormikTextInput name='password' placeholder='Password' testID='formikPassword' secureTextEntry/>
          <Button title='Sign in' onPress={handleSubmit} testID='formikSubmit'/>
        </View>)}
    </Formik>
  )
}


describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn()
      const {getAllByTestId, getByTestId, debug} = render(<SignInContainer onSubmit={onSubmit} />)
      fireEvent.changeText(getByTestId('formikUsername'),'kalle')
      fireEvent.changeText(getByTestId('formikPassword'),'password')
      fireEvent.press(getByTestId('formikSubmit'))
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
