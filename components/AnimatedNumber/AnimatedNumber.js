import React from 'react';
import { Animated, Text } from 'react-native';

export default class AnimatedNumber extends React.Component {
  state = {
    left: new Animated.Value(this.props.leftStart),
    top: new Animated.Value(this.props.topStart),
  }

  componentDidUpdate(prevProps) {
    if(this.props.update) this.animate();
  }

  componentDidMount() {
    Animated.timing(
      this.state.left,
      {
        toValue: this.props.leftEnd,
        duration: 2000,
      },
    ).start();

    Animated.timing(
      this.state.top,
      {
        toValue: this.props.topEnd,
        duration: 2000,
      },
    ).start();
  }

  animate = () => {
    Animated.sequence([
      Animated.timing(
        this.state.left,
        {
          toValue: 0,
          duration: 2000,
        },
      ),
      Animated.timing(
        this.state.left,
        {
          toValue: this.props.leftEnd,
          duration: 2000,
        },
      ),
    ]).start();

    Animated.sequence([
      Animated.timing(
        this.state.top,
        {
          toValue: 0,
          duration: 2000,
        },
      ),
      Animated.timing(
        this.state.top,
        {
          toValue: this.props.topEnd,
          duration: 2000,
        },
      ),
    ]).start();
  }

  render() {
    const rgb1 = Math.floor(Math.random() * 256);
    const rgb2 = Math.floor(Math.random() * 256);
    const rgb3 = Math.floor(Math.random() * 256);

    return (
      <Animated.View style={{
        position: 'absolute',
        width: 20,
        height: 20,
        left: this.state.left,
        top: this.state.top,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: this.props.isHour ? 18 : 10,
          fontWeight: this.props.isHour ? 'normal' : 'bold',
          color: 'rgb(' + rgb1 + ',' + rgb2 + ', ' +  rgb3 + ')',
        }}>{ this.props.digit }</Text>
      </Animated.View>
    );
  }
}
