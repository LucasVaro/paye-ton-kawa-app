import React from "react";
import { ViroARSceneNavigator } from "@viro-community/react-viro";
import { SafeAreaView, Text } from "react-native";
import SceneAR from "../components/ARScene";

const RealityScene = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: SceneAR,
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default RealityScene;
