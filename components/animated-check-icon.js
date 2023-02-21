import { useState, useEffect } from "react";
import { Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AnimatedCheckIcon = ({ isChecked }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isChecked) {
      Animated.spring(animation, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animation, {
        toValue: 0,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  }, [isChecked]);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.2, 1],
  });
  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ scale }],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#4CAF50",
        marginBottom: 50,
        marginTop: 50,
      }}
    >
      <Icon name="check" size={100} color="#FFF" />
    </Animated.View>
  );
};

export default AnimatedCheckIcon;
