import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing, Modal } from "react-native";
import { COLORS } from "../colors";

interface LoaderProps {
  visible: boolean;
}

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  const dots = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;

  useEffect(() => {
    if (visible) {
      dots.forEach((dot, i) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(i * 200),
            Animated.timing(dot, {
              toValue: 1,
              duration: 400,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0,
              duration: 400,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    } else {
      dots.forEach((dot) => dot.setValue(0));
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <Text style={styles.text}>Loading</Text>
          <View style={styles.dotsContainer}>
            {dots.map((dot, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  { opacity: dot, transform: [{ scale: dot.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1.3] }) }] },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  loaderContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.secondary,
    letterSpacing: 1,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});
