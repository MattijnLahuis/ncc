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
    return (
      <Animated.View style={{
        position: 'absolute',
        width: 20,
        height: 20,
        left: this.state.left,
        top: this.state.top,
      }}>
        <Text style={{textAlign: 'center', fontSize: 18}}>{ this.props.digit }</Text>
      </Animated.View>
    );
  }
}
