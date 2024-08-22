import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FAB } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';

const App = () => {
  const [time, setTime] = useState(0); // in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const radius = 100;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (time % 60000) / 60000; // progress from 0 to 1 for each minute

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }:${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
  };

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const pauseStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.clockContainer}>
        <Svg height="240" width="240" viewBox="0 0 240 240">
          <Circle
            cx="120"
            cy="120"
            r={radius}
            stroke="#E3E3E3"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx="120"
            cy="120"
            r={radius}
            stroke="#1DB954"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.time}>{formatTime(time)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <FAB
          style={styles.fab}
          icon="play"
          onPress={startStopwatch}
          disabled={isRunning}
        />
        <FAB
          style={styles.fab}
          icon="pause"
          onPress={pauseStopwatch}
          disabled={!isRunning}
        />
        <FAB
          style={styles.fab}
          icon="restart"
          onPress={resetStopwatch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  time: {
    position: 'absolute',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  fab: {
    backgroundColor: '#1DB954',
    margin: 10,
  },
});

export default App;
