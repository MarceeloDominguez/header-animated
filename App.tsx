import { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated, StyleSheet, Text, View } from "react-native";

const HEIGHT_HEADER = 160;
const circleAvatar = 60;

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, HEIGHT_HEADER / 2);

  const translateHeaderY = diffClamp.interpolate({
    inputRange: [0, HEIGHT_HEADER],
    outputRange: [0, -HEIGHT_HEADER],
  });

  return (
    <View style={{ backgroundColor: "violet", flex: 1 }}>
      <StatusBar style="light" />
      <Animated.View
        style={{
          paddingBottom: 40,
          zIndex: 100,
          transform: [
            {
              translateY: translateHeaderY,
            },
          ],
        }}
      >
        <Animated.Image
          style={{
            width: "100%",
            height: HEIGHT_HEADER,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
          source={{
            uri: "https://i.pinimg.com/236x/62/11/2e/62112e7952e74359f617c31aa8dfca0b.jpg",
          }}
        />
        <Animated.View
          style={{
            width: circleAvatar,
            height: circleAvatar,
            backgroundColor: "green",
            borderRadius: circleAvatar / 2,
            marginLeft: 12,
            position: "absolute",
            top: HEIGHT_HEADER - circleAvatar / 2,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEIGHT_HEADER, 0, HEIGHT_HEADER],
                  outputRange: [HEIGHT_HEADER / 2, 0, -HEIGHT_HEADER / 2],
                }),
              },
            ],
            opacity: scrollY.interpolate({
              inputRange: [HEIGHT_HEADER - 100, HEIGHT_HEADER - 99],
              outputRange: [1, 0],
            }),
          }}
        />

        <Animated.View
          style={{
            position: "absolute",
            top: HEIGHT_HEADER,
            height: 30,
            alignSelf: "center",
            opacity: scrollY.interpolate({
              inputRange: [HEIGHT_HEADER - 180, HEIGHT_HEADER - 80],
              outputRange: [1, 0],
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEIGHT_HEADER, 0, HEIGHT_HEADER],
                  outputRange: [HEIGHT_HEADER / 2, 0, -HEIGHT_HEADER / 2],
                }),
              },
            ],
          }}
        >
          <Text style={{ fontSize: 20 }}>Marcelo Dominguez</Text>
        </Animated.View>

        <Animated.View
          style={{
            width: "100%",
            height: HEIGHT_HEADER,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "blue",
            opacity: scrollY.interpolate({
              inputRange: [HEIGHT_HEADER - 100, HEIGHT_HEADER - 70],
              outputRange: [0, 1],
            }),
          }}
        />
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "flex-end",
            height: HEIGHT_HEADER,
            paddingBottom: 12,
            opacity: scrollY.interpolate({
              inputRange: [HEIGHT_HEADER - 105, HEIGHT_HEADER - 50],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [HEIGHT_HEADER - 180, HEIGHT_HEADER - 50],
                  outputRange: [50, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>
            Hola Header
          </Text>
        </Animated.View>
      </Animated.View>

      <Animated.FlatList
        data={[...Array(20)]}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ marginTop: HEIGHT_HEADER }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({}) => {
          return (
            <View
              style={{
                height: 50,
                backgroundColor: "red",
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Hola Mundo</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
