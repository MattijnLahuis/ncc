   import React from 'react';
import { Animated, StyleSheet, Text, View, ImageBackground } from 'react-native';

import _ from 'lodash';

import { AnimatedNumber, ClockHand } from '../../components';

let hours = [
  { digit: 1, position: 1, leftStart: 0, leftEnd: 60, topStart: 0, topEnd: -100 },
  { digit: 2, position: 2, leftStart: 0, leftEnd: 100, topStart: 0, topEnd: -60 },
  { digit: 3, position: 3, leftStart: 0, leftEnd: 120, topStart: 0, topEnd: 0 },
  { digit: 4, position: 4, leftStart: 0, leftEnd: 100, topStart: 0, topEnd: 60 },
  { digit: 5, position: 5, leftStart: 0, leftEnd: 60, topStart: 0, topEnd: 105 },
  { digit: 6, position: 6, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: 120 },
  { digit: 7, position: 7, leftStart: 0, leftEnd: -55, topStart: 0, topEnd: 105 },
  { digit: 8, position: 8, leftStart: 0, leftEnd: -100, topStart: 0, topEnd: 60 },
  { digit: 9, position: 9, leftStart: 0, leftEnd: -120, topStart: 0, topEnd: 0 },
  { digit: 10, position: 10, leftStart: 0, leftEnd: -100, topStart: 0, topEnd: -60 },
  { digit: 11, position: 11, leftStart: 0, leftEnd: -55, topStart: 0, topEnd: -100 },
  { digit: 12, position: 12, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: -120 },
];

let minutes = [
  { digit: 5, position: 1, leftStart: 0, leftEnd: 45, topStart: 0, topEnd: -75 },
  { digit: 10, position: 2, leftStart: 0, leftEnd: 75, topStart: 0, topEnd: -40 },
  { digit: 15, position: 3, leftStart: 0, leftEnd: 90, topStart: 0, topEnd: 0 },
  { digit: 20, position: 4, leftStart: 0, leftEnd: 75, topStart: 0, topEnd: 40 },
  { digit: 25, position: 5, leftStart: 0, leftEnd: 45, topStart: 0, topEnd: 80 },
  { digit: 30, position: 6, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: 95 },
  { digit: 35, position: 7, leftStart: 0, leftEnd: -45, topStart: 0, topEnd: 80 },
  { digit: 40, position: 8, leftStart: 0, leftEnd: -75, topStart: 0, topEnd: 40 },
  { digit: 45, position: 9, leftStart: 0, leftEnd: -90, topStart: 0, topEnd: 0 },
  { digit: 50, position: 10, leftStart: 0, leftEnd: -75, topStart: 0, topEnd: -40 },
  { digit: 55, position: 11, leftStart: 0, leftEnd: -45, topStart: 0, topEnd: -75 },
  { digit: 0, position: 12, leftStart: 0, leftEnd: 0, topStart: 0, topEnd: -90 },
]

let x = 0;

export default class Clock extends React.Component {
  _shuffleArray = array => {
    const randomIndexesLeft = [0,1,2,3,4,5,6,7,8,9,10,11];


    const copy1 = _.cloneDeep(array);
    const copy2 = _.cloneDeep(array);

    copy1.map((d, index) => {
      copy1[index].leftStart = copy1[index].leftEnd;
      copy1[index].topStart = copy1[index].topEnd;

      let randomIndex = Math.floor(Math.random() * randomIndexesLeft.length);
      const swapTo = randomIndexesLeft[randomIndex];
      randomIndexesLeft.splice(randomIndex,1);

      copy1[index].leftEnd = copy2[swapTo].leftEnd;
      copy1[index].topEnd = copy2[swapTo].topEnd;
      copy1[index].position = copy2[swapTo].position;
    })

    return copy1;
  }

  shuffleHours = () => {
    hours = this._shuffleArray(hours);


    //make sure the current hour and the next one appear after each other
    const nextHourIndex = this._getCurrentHour();
    const currentPos = hours[nextHourIndex - 1].position;

    const nextPos = (currentPos % 12) + 1;

    const nextPosObj = hours.find(d => {
      return d.position === nextPos;
    });

    const nextPosLeftEnd = nextPosObj.leftEnd;
    const nextPosTopEnd = nextPosObj.topEnd;

    nextPosObj.leftEnd = hours[nextHourIndex].leftEnd;
    nextPosObj.topEnd = hours[nextHourIndex].topEnd;
    nextPosObj.position = hours[nextHourIndex].position;

    hours[nextHourIndex].leftEnd = nextPosLeftEnd;
    hours[nextHourIndex].topEnd = nextPosTopEnd;
    hours[nextHourIndex].position = nextPos;
  }

  shuffleMinutes = () => {
    minutes = this._shuffleArray(minutes);


    //make sure the current hour and the next one appear after each other
    const currentMinute = this.props.time.getMinutes();
    const nextMinIndex = parseInt(currentMinute / 5);
    const currentPos = minutes[nextMinIndex - 1].position;

    const nextPos = (currentPos % 12) + 1;

    const nextPosObj = minutes.find(m => {
      return m.position === nextPos;
    });

    const nextPosLeftEnd = nextPosObj.leftEnd;
    const nextPosTopEnd = nextPosObj.topEnd;

    nextPosObj.leftEnd = minutes[nextMinIndex].leftEnd;
    nextPosObj.topEnd = minutes[nextMinIndex].topEnd;
    nextPosObj.position = minutes[nextMinIndex].position;

    minutes[nextMinIndex].leftEnd = nextPosLeftEnd;
    minutes[nextMinIndex].topEnd = nextPosTopEnd;
    minutes[nextMinIndex].position = nextPos;
  }

  renderHours = (shouldUpdate) => {
    if(shouldUpdate) this.shuffleHours();

    return hours.map((hour, index) => {
        return (
          <AnimatedNumber
            key={index}
            update={shouldUpdate}
            isHour={true}
            {...hour}
          />
        )
      })
  }

  renderMinutes = (shouldUpdate) => {
    if(shouldUpdate) this.shuffleMinutes();

    return minutes.map((min, index) => {
        return (
          <AnimatedNumber
            key={index}
            update={shouldUpdate}
            {...min}
          />
        )
      })
  }

  renderHands = (shouldUpdate) => {
    const hour = this._getCurrentHour();

    const hourObj = hours.find(h => {
      return h.digit === hour;
    });
    const hourOffset = Math.floor(this.props.time.getMinutes() / 60 * 30);

    const minObj = minutes[parseInt(this.props.time.getMinutes() / 5) - 1];
    const minOffset = Math.floor(6 * (this.props.time.getMinutes() % 5));

    return (
      [<ClockHand
        key={0}
        x={ (hourObj.leftEnd * 0.5) + 130 }
        y={ (hourObj.topEnd * 0.5) + 130 }
        degrees={ hourOffset }
        update={ shouldUpdate }
      />,
      <ClockHand
        key={1}
        x={ (minObj.leftEnd * 0.9) + 130 }
        y={ (minObj.topEnd * 0.9) + 130 }
        degrees={ minOffset }
        update={ shouldUpdate }
      />
      ]
    )
  }

  render() {
    const shouldUpdate = this.props.time.getSeconds() === 0;

    return (
        <View>
          { this.renderHours(shouldUpdate) }
          { this.renderMinutes(shouldUpdate) }
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
