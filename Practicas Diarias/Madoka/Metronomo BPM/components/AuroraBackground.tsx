import React, { ReactNode, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

type AuroraBackgroundProps = {
  children?: ReactNode;
  animationSpeed?: number;
};

export default function AuroraBackground({
  children,
  animationSpeed = 20000,
}: AuroraBackgroundProps) {
  const x1 = useRef(new Animated.Value(-width * 0.35)).current;
  const y1 = useRef(new Animated.Value(-height * 0.15)).current;
  const x2 = useRef(new Animated.Value(width * 0.2)).current;
  const y2 = useRef(new Animated.Value(height * 0.08)).current;
  const x3 = useRef(new Animated.Value(-width * 0.2)).current;
  const y3 = useRef(new Animated.Value(height * 0.2)).current;

  useEffect(() => {
    const createHorizontalLoop = (
      value: Animated.Value,
      fromValue: number,
      toValue: number,
      duration: number,
    ) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: fromValue,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      );

    const createVerticalLoop = (
      value: Animated.Value,
      fromValue: number,
      toValue: number,
      duration: number,
    ) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: fromValue,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      );

    const a1 = createHorizontalLoop(x1, -width * 0.35, width * 0.55, animationSpeed);
    const a2 = createHorizontalLoop(x2, width * 0.2, -width * 0.5, animationSpeed * 1.2);
    const a3 = createHorizontalLoop(x3, -width * 0.2, width * 0.6, animationSpeed * 1.4);

    const b1 = createVerticalLoop(y1, -height * 0.15, height * 0.2, animationSpeed * 1.1);
    const b2 = createVerticalLoop(y2, height * 0.08, -height * 0.12, animationSpeed * 1.3);
    const b3 = createVerticalLoop(y3, height * 0.2, -height * 0.08, animationSpeed * 1.5);

    a1.start();
    a2.start();
    a3.start();
    b1.start();
    b2.start();
    b3.start();

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
      b1.stop();
      b2.stop();
      b3.stop();
    };
  }, [animationSpeed, x1, x2, x3, y1, y2, y3]);

  return (
    <View style={styles.container}>
      <View style={styles.background} pointerEvents="none">
        <Animated.View
          style={[
            styles.orb,
            styles.orbOne,
            { transform: [{ translateX: x1 }, { translateY: y1 }] },
          ]}
        >
          <LinearGradient
            colors={['#10b981', '#34d399', '#6ee7b7', '#14b8a6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.orb,
            styles.orbTwo,
            { transform: [{ translateX: x2 }, { translateY: y2 }] },
          ]}
        >
          <LinearGradient
            colors={['#2dd4bf', '#14b8a6', '#0ea5e9', '#a78bfa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.orb,
            styles.orbThree,
            { transform: [{ translateX: x3 }, { translateY: y3 }] },
          ]}
        >
          <LinearGradient
            colors={['#34d399', '#6ee7b7', '#2dd4bf', '#14b8a6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: '#050816',
  },
  orb: {
    position: 'absolute',
    borderRadius: 250,
    opacity: 0.58,
    filter: 'blur(10px)',
  },
  orbOne: {
    width: width * 0.92,
    height: height * 0.72,
    left: width * 0.06,
    top: -height * 0.08,
  },
  orbTwo: {
    width: width * 0.8,
    height: height * 0.7,
    left: width * 0.12,
    top: height * 0.12,
    opacity: 0.46,
  },
  orbThree: {
    width: width * 0.85,
    height: height * 0.75,
    left: width * 0.08,
    top: height * 0.2,
    opacity: 0.5,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
