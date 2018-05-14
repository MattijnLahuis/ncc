  import React from 'react';
import { Animated, StyleSheet, Text, View, ImageBackground } from 'react-native';

import _ from 'lodash';

import { AnimatedNumber, ClockHand } from '../../components';

const hours = [
  { digit: 1, position: 1, leftStart: 0, leftEnd: 60, topStart: 0, topEnd: -100 },
  { digit: 2, position: 2, leftStart: 0, leftEnd: 105, topStart: 0, topEnd: -55 },
  { digit: 3, position: 3, leftStart: 0, leftEnd: 120, topStart: 0, topEnd: 0 },
  { digit: 4, position: 4, leftStart: 0, leftEnd: 100, topStart: 0, topEnd: 60 },
  { digit: 5, position: 5, leftStart: 0, leftEnd: 55, topStart: 0, topEnd: 105 },
  { digit: 6, position: 6, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: 120 },
  { digit: 7, position: 7, leftStart: 0, leftEnd: -55, topStart: 0, topEnd: 105 },
  { digit: 8, position: 8, leftStart: 0, leftEnd: -100, topStart: 0, topEnd: 60 },
  { digit: 9, position: 9, leftStart: 0, leftEnd: -120, topStart: 0, topEnd: 0 },
  { digit: 10, position: 10, leftStart: 0, leftEnd: -100, topStart: 0, topEnd: -60 },
  { digit: 11, position: 11, leftStart: 0, leftEnd: -55, topStart: 0, topEnd: -106 },
  { digit: 12, position: 12, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: -120 },
];

const minutes = [
  { digit: 1, position: 1, leftStart: 0, leftEnd: 60, topStart: 0, topEnd: -100 },
  { digit: 2, position: 2, leftStart: 0, leftEnd: 105, topStart: 0, topEnd: -55 },
  { digit: 3, position: 3, leftStart: 0, leftEnd: 120, topStart: 0, topEnd: 0 },
  { digit: 4, position: 4, leftStart: 0, leftEnd: 100, topStart: 0, topEnd: 60 },
  { digit: 5, position: 5, leftStart: 0, leftEnd: 55, topStart: 0, topEnd: 105 },
  { digit: 6, position: 6, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: 120 },
  { digit: 7, position: 7, leftStart: 0, leftEnd: -55, topStart: 0, topEnd: 105 },
  { digit: 8, position: 8, leftStart: 0, leftEnd: -100, topStart: 0, topEnd: 60 },
  { digit: 9, position: 9, leftStart: 0, leftEnd: -120, topStart: 0, topEnd: 0 },
  { digit: 10, position: 10, leftStart: 0, leftEnd: -100, topStart: 0, topEnd: -60 },
  { digit: 11, position: 11, leftStart: 0, leftEnd: -55, topStart: 0, topEnd: -106 },
  { digit: 12, position: 12, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: -120 },
  { digit: 13, position: 13, leftStart: 0, leftEnd: 55, topStart: 0, topEnd: 105 },
  { digit: 14, position: 14, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: 120 },
  { digit: 15, position: 15, leftStart: 0, leftEnd: -55, topStart: 0, topEnd: 105 },
  { digit: 16, position: 16, leftStart: 0, leftEnd: -100, topStart: 0, topEnd: 60 },
  { digit: 17, position: 17, leftStart: 0, leftEnd: -120, topStart: 0, topEnd: 0 },
  { digit: 18, position: 18, leftStart: 0, leftEnd: -100, topStart: 0, topEnd: -60 },
  { digit: 19, position: 19, leftStart: 0, leftEnd: -55, topStart: 0, topEnd: -106 },
  { digit: 20, position: 20, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: -120 },
]

let x = 0;

export default class Clock extends React.Component {
  shuffleDigits = () => {
    const randomIndexesLeft = [0,1,2,3,4,5,6,7,8,9,10,11];

    const prevDigits = _.cloneDeep(hours);

    hours.map((d, index) => {
      hours[index].leftStart = hours[index].leftEnd;
      hours[index].topStart = hours[index].topEnd;

      let randomIndex = Math.floor(Math.random() * randomIndexesLeft.length);
      const swapTo = randomIndexesLeft[randomIndex];
      randomIndexesLeft.splice(randomIndex,1);

      hours[index].leftEnd = prevDigits[swapTo].leftEnd;
      hours[index].topEnd = prevDigits[swapTo].topEnd;
      hours[index].position = prevDigits[swapTo].position;
    })

    const currentHour = this._getCurrentHour();
    const currentPos = hours[currentHour - 1].position;

    const nextPos = (currentPos % 12) + 1;

    const nextPosObj = hours.find(d => {
      return d.position === nextPos;
    });

    const nextPosLeftEnd = nextPosObj.leftEnd;
    const nextPosTopEnd = nextPosObj.topEnd;

    //hours[currentHour] is current hour + 1 cause index
    const nextHourIndex = currentHour % 12;

    nextPosObj.leftEnd = hours[nextHourIndex].leftEnd;
    nextPosObj.topEnd = hours[nextHourIndex].topEnd;
    nextPosObj.position = hours[nextHourIndex].position;

    hours[nextHourIndex].leftEnd = nextPosLeftEnd;
    hours[nextHourIndex].topEnd = nextPosTopEnd;
    hours[nextHourIndex].position = nextPos;
  }

  renderHours = (shouldUpdate) => {
    if(shouldUpdate) {
      this.shuffleDigits();
    };

    return hours.map((d, index) => {
        return (
          <AnimatedNumber key={index} {...d} update={shouldUpdate} />
        )
      })
  }

  renderHands = (shouldUpdate) => {
    const hour = this._getCurrentHour();

    const hourObj = hours.find(d => {
      return d.digit === hour;
    });

    const minutesOffset = Math.floor(this.props.time.getMinutes() / 60 * 30);

    return (
      <ClockHand
        x1={ (hourObj.leftEnd * 0.7) + 120 }
        y1={ (hourObj.topEnd * 0.7) + 120 }
        degrees={ minutesOffset }
        update={ shouldUpdate }
      />
    )
  }

  render() {
    x++;

    const shouldUpdate = this.props.prevTime.getHours() != this.props.time.getHours() || x % 10 === 0;

    return (
        <View>
          { this.renderHours(shouldUpdate) }
          { this.renderHands(shouldUpdate) }
        </View>
    );
  }

  _getCurrentHour = () => {
    return this.props.time.getHours() > 12 ? this.props.time.getHours() - 12 : this.props.time.getHours();
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
