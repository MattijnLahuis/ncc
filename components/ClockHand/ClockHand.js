import React from 'react';
import { Animated, Text } from 'react-native';
import { Svg } from 'expo';

export default class ClockHand extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.update) {
      this.setState({ fadeAnim: new Animated.Value(0) });
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.update) {
      this.animate();
    }
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1, duration: 5000, delay: 2000
      },
    ).start();
  }

  render() {
    const AnimatedSvg = Animated.createAnimatedComponent(Svg);

    return (
      <Animated.View>
        <AnimatedSvg style={{position: 'absolute', opacity: this.state.fadeAnim, left: -120, top: -120}} height={240} width={240}>
          <Svg.Line
            x1={ this.props.x1 }
            y1={ this.props.y1 }
            x2="120"
            y2="120"
            stroke="red"
            strokeWidth="2"
          />
        </AnimatedSvg>
      </Animated.View>
    )
  }
}
