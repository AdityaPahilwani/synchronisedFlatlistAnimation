import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import Constants from 'expo-constants';
import TouchImage, {
  imageHeight,
  fullImageWidth,
} from './components/touchImage';
import { DATA } from './DATA';
const { width, height } = Dimensions.get('screen');
export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const bottomListScrollX = useRef(new Animated.Value(0)).current;
  const [mainListindex, setMainListindex] = useState(0);
  const [bottomListIndex, setBottomListIndex] = useState(0);

  const mainFlatlistRef = useRef();
  const bottomFlatlistRef = useRef();

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={mainFlatlistRef}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={DATA}
        onMomentumScrollEnd={(ev) => {
          let x = Math.floor(ev.nativeEvent.contentOffset.x);
          let w = Math.floor(width);
          let newIndex = Math.floor(x / w);

          setMainListindex(newIndex);
          setBottomListIndex(newIndex);
          if (newIndex * fullImageWidth - fullImageWidth / 2 > width / 2) {
            bottomFlatlistRef?.current?.scrollToOffset({
              offset:
                newIndex * fullImageWidth - width / 2 + fullImageWidth / 2,
              animated: true,
            });
            setBottomListIndex(newIndex);
          } else {
            bottomFlatlistRef?.current?.scrollToOffset({
              offset: 0,
              animated: true,
            });
            setBottomListIndex(newIndex);
          }
        }}
        horizontal={true}
        pagingEnabled
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          zIndex: 999,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Animated.View style={styles.imageContainer}>
              <Image style={{ ...styles.image }} source={{ uri: item.image }} />
            </Animated.View>
          );
        }}
      />
      <View style={styles.bottomList}>
        <Animated.FlatList
          ref={bottomFlatlistRef}
          keyExtractor={(item) => item.key}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: bottomListScrollX } } }],
            { useNativeDriver: true }
          )}
          data={DATA}
          onMomentumScrollEnd={(ev) => {
            setBottomListIndex(
              Math.floor(ev.nativeEvent.contentOffset.x / width)
            );
          }}
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchImage
                image={item.image}
                setMainListindex={setMainListindex}
                setBottomListIndex={setBottomListIndex}
                index={index}
                mainFlatlistRef={mainFlatlistRef}
                bottomFlatlistRef={bottomFlatlistRef}
                mainListindex={mainListindex}
                bottomListIndex={bottomListIndex}
                scrollX={scrollX}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  imageContainer: {
    height: height,
    width: width,
  },
  image: { height: '100%', width: '100%', resizeMode: 'cover' },
  bottomList: {
    position: 'absolute',
    bottom: 50,
    zIndex: 1000000,
    elevation: 5,
    height: imageHeight,
  },
});
