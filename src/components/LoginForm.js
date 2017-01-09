import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = {
    emailValue: '',
    passwordValue: '',
    error: '',
    loading: false
  };

  onButtonPress() {
    const { emailValue, passwordValue } = this.state;
    this.setState({ error: '', loading: true });
    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFailed.bind(this));
      });
  }

  onLoginSuccess() {
    this.setState({
      error: '',
      loading: false,
      emailValue: '',
      passwordValue: ''
    });
  }

onLoginFailed() {
  this.setState({
    error: 'Authentication Failed',
    loading: false
  });
}

  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }


  render() {
    return (
      <Card>
        <CardSection>
          <Input
            value={this.state.emailValue}
            onChangeText={emailValue => this.setState({ emailValue })}
            label='Email'
            placeholder='user@example.com'
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder='password'
            value={this.state.passwordValue}
            onChangeText={passwordValue => this.setState({ passwordValue })}
            label='Password'
            secureTextEntry
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
