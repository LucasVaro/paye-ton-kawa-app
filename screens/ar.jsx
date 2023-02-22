import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { AR } from "expo-three";
import { GLView } from "expo-gl";
import * as Three from "three";

const ARScene = () => {
  const arSession = useRef();
  const glView = useRef();
  const renderer = useRef();

  const init = async () => {
    await AR.initAsync();
    console.log("eeeeerrrrrr", AR);
  };

  useEffect(() => {
    init();
  }, []);

  const onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    renderer.current = new Three.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: {
        width,
        height,
        style: { flex: 1 },
        addEventListener: () => {},
        removeEventListener: () => {},
      },
      context: gl,
    });
    renderer.current.setPixelRatio(pixelRatio);
    renderer.current.setSize(width, height);

    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000);
    const geometry = new Three.SphereGeometry(1, 32, 32);
    const material = new Three.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new Three.Mesh(geometry, material);

    camera.position.z = 5;

    scene.add(sphere);

    arSession.current = await glView.current.startARSessionAsync();
    const { trackingState } = await arSession.current.getCurrentFrame();
    if (trackingState === AR.TrackingState.NORMAL) {
      renderer.current.render(scene, camera);
    }
  };

  return (
    <View style={styles.container}>
      <GLView
        ref={glView}
        style={styles.glView}
        onContextCreate={onContextCreate}
        arTrackingConfiguration={AR.TrackingConfigurations.World}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glView: {
    flex: 1,
  },
});

export default ARScene;
