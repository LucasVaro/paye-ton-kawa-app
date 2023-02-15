import React, { useState } from "react";
import {
  Viro3DObject,
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroImage,
  ViroNode,
  ViroQuad,
  ViroText,
  ViroTrackingStateConstants,
  ViroARTrackingReasonConstants,
} from "@viro-community/react-viro";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

const SceneAR = () => {
  const [text, setText] = useState("Initializing AR...");
  const [modelWorldRotation, setModelWorldRotation] = useState<
    [number, number, number]
  >([0, 0, 0]);
  const [displayHitReticle, setDisplayHitReticle] = useState(false);
  const [foundPlane, setFoundPlane] = useState(false);
  const [planeReticleLocation, setPlaneReticleLocation] = useState<
    [number, number, number]
  >([0, 0, 0]);
  const [shouldBillboard, setShouldBillboard] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [lastFoundPlaneLocation, setLastFoundPlaneLocation] = useState([
    0, 0, 0,
  ]);

  const setInitialDirection = () => {
    // @ts-ignore
    if (this.node) {
      // @ts-ignore
      this.node.getTransformAsync().then((retDict: { rotation: any }) => {
        const rotation = retDict.rotation;
        const absX = Math.abs(rotation[0]);
        const absZ = Math.abs(rotation[2]);
        let yRotation = rotation[1];

        // if the X and Z aren't 0, then adjust the y rotation (the quaternion flipped the X or Z).
        if (absX != 0 && absZ != 0) {
          yRotation = 180 - yRotation;
        }
        setModelWorldRotation([0, yRotation, 0]);
        setShouldBillboard(false);
      });
    }
  };

  const getScanningQuads = () => {
    if (isReady) {
      return;
    }

    return (
      <ViroNode
        transformBehaviors={"billboardY"}
        position={planeReticleLocation}
        scale={[0.5, 0.5, 0.5]}
        onClick={onClickScanningQuads}
      >
        <ViroText
          rotation={[0, 0, 0]}
          visible={foundPlane}
          // @ts-ignore
          textAlign="center"
          text="Click to Place"
        />
        <ViroImage
          rotation={[-90, 0, 0]}
          visible={foundPlane}
          source={require("./res/tracking_diffuse_2.png")}
        />
        <ViroImage
          rotation={[-90, 0, 0]}
          visible={!foundPlane}
          source={require("./res/tracking_diffuse.png")}
        />
      </ViroNode>
    );
  };

  const onClickScanningQuads = () => {
    if (foundPlane) {
      setIsReady(true);
      setInitialDirection();
    }
  };

  const getModel = () => {
    const position: number[] | [number, number, number] = isReady
      ? lastFoundPlaneLocation
      : [0, 0, 0];

    const transformBehaviors = shouldBillboard ? "billboardY" : [];

    return (
      <ViroNode
        position={position as [number, number, number]}
        rotation={modelWorldRotation}
        transformBehaviors={transformBehaviors}
      >
        <ViroNode
          ref={(ref) => {
            // @ts-ignore
            this.node = ref;
          }}
          scale={[1, 1, 1]}
        >
          <Viro3DObject
            visible={isReady}
            position={[0, 0.5, 0]}
            source={require("./res/emoji_heart_anim/emoji_heart_anim.vrx")}
            resources={[
              require("./res/emoji_heart_anim/emoji_heart.png"),
              require("./res/emoji_heart_anim/emoji_heart_specular.png"),
            ]}
            animation={{ name: "02", delay: 0, loop: true, run: true }}
            type="VRX"
          />
          <ViroQuad
            rotation={[-90, 0, 0]}
            position={[0, -0.001, 0]}
            width={8}
            height={8}
            // @ts-ignore
            arShadowReceiver={true}
            ignoreEventHandling={true}
          />
        </ViroNode>
      </ViroNode>
    );
  };
  const onCameraARHitTest = (results: {
    hitTestResults: string | any[];
    cameraOrientation: { forward: number[]; position: number[] };
  }) => {
    if (!isReady) {
      if (results.hitTestResults.length > 0) {
        for (let i = 0; i < results.hitTestResults.length; i++) {
          const result = results.hitTestResults[i];
          if (result.type == "ExistingPlaneUsingExtent") {
            setPlaneReticleLocation(result.transform.position);
            setDisplayHitReticle(true);
            setFoundPlane(true);
            setLastFoundPlaneLocation(result.transform.position);
            //           this.props.arSceneNavigator.viroAppProps.setIsOverPlane(true);
            return;
          }
        }
      }
      return;
    }

    //else we made it here, so just forward vector with unmarked.
    const newPosition = [
      results.cameraOrientation.forward[0] * 1.5,
      results.cameraOrientation.forward[1] * 1.5,
      results.cameraOrientation.forward[2] * 1.5,
    ];
    newPosition[0] = results.cameraOrientation.position[0] + newPosition[0];
    newPosition[1] = results.cameraOrientation.position[1] + newPosition[1];
    newPosition[2] = results.cameraOrientation.position[2] + newPosition[2];
    setPlaneReticleLocation([newPosition[0], newPosition[1], newPosition[2]]);
    setDisplayHitReticle(true);
    setFoundPlane(false);
    //  this.props.arSceneNavigator.viroAppProps.setIsOverPlane(false);
  };

  const onTrackingUpdated = (state: any, reason: any) => {
    if (state == ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state == ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  };

  return (
    <ViroARScene
      onCameraARHitTest={onCameraARHitTest}
      onTrackingUpdated={onTrackingUpdated}
    >
      <ViroAmbientLight color={"#ffffff"} intensity={200} />
      <ViroDirectionalLight
        color="#ffffff"
        direction={[0, -1, -0.5]}
        // @ts-ignore
        position={[0, 9, 0]}
        castsShadow={true}
        shadowOpacity={0.9}
      />
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.textStyle}
      />
      {getScanningQuads()}
      {getModel()}
    </ViroARScene>
  );
};

export default SceneAR;
