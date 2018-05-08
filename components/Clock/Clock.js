import React from 'react';
import { Animated, StyleSheet, Text, View, ImageBackground, Line } from 'react-native';
import _ from 'lodash';

import { AnimatedNumber } from '../../components';

const digits = [
  { digit: 1, leftStart: 0, leftEnd: 60, topStart: 0, topEnd: -100 },
  { digit: 2, leftStart: 0, leftEnd: 100, topStart: 0, topEnd: -60 },
  { digit: 3, leftStart: 0, leftEnd: 120, topStart: 0, topEnd: 0 },
  { digit: 4, leftStart: 0, leftEnd: 100, topStart: 0, topEnd: 60 },
  { digit: 5, leftStart: 0, leftEnd: 60, topStart: 0, topEnd: 100 },
  { digit: 6, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: 120 },
  { digit: 7, leftStart: 0, leftEnd: -60, topStart: 0, topEnd: 100 },
  { digit: 8, leftStart: 0, leftEnd: -100, topStart: 0, topEnd: 60 },
  { digit: 9, leftStart: 0, leftEnd: -120, topStart: 0, topEnd: 0 },
  { digit: 10, leftStart: 0, leftEnd: -100, topStart: 0, topEnd: -60 },
  { digit: 11, leftStart: 0, leftEnd: -60, topStart: 0, topEnd: -100 },
  { digit: 12, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: -120 },
];

let x = 0;

export default class Clock extends React.Component {
  shuffleDigits = () => {
    const randomIndexesLeft = [0,1,2,3,4,5,6,7,8,9,10,11];

    const prevDigits = _.cloneDeep(digits);

    digits.map((d, index) => {
      digits[index].leftStart = digits[index].leftEnd;
      digits[index].topStart = digits[index].topEnd;

      let randomIndex = Math.floor(Math.random() * randomIndexesLeft.length);
      const swapTo = randomIndexesLeft[randomIndex];
      randomIndexesLeft.splice(randomIndex,1);

      digits[index].leftEnd = prevDigits[swapTo].leftEnd;
      digits[index].topEnd = prevDigits[swapTo].topEnd;
    })
  }

  renderHours = () => {
    return digits.map((d, index) => {
        return (
          <AnimatedNumber key={index} {...d} />
        )
      })
  }

  renderHands = () => {
    const hour = this.props.time.getHours() % 12;

    const hourObj = digits.find(d => {
      return d.digit === hour;
    });

    return <Line x1={15} y1={0} x2={15} y2={200} stroke="black" strokeWidth={1}/>

  }

  render() {
    x++;
    if(this.props.prevTime.getHours() != this.props.time.getHours() || x % 10 === 0) {
      this.shuffleDigits();
    }
    return (
        <View>
          { this.renderHours() }
          { this.renderHands() }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#000',
  // },
  // background: {
  //   width: '100%',
  //   height: '100%',
  //   // alignItems: 'center',
  //   // justifyContent: 'center',
  //   // padding: 10,
  // },
});
