import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import { Clock } from './components';

export default class App extends React.Component {
  state = {
    time: new Date(),
  }

  componentDidMount() {
    setInterval( () => {
      this.setState({
        time: new Date(),
      })
    },1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('./assets/doge.jpeg')}
          resizeMode='cover'
          style={styles.background}
        >
          <Clock time={this.state.time} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 40,
    // paddingTop: 100,
  },
});
