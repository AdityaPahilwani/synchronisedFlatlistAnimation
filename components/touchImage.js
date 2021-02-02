import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export const imageHeight = 100;
const imageWidth = 100;
const marginHorizontal = 10;
export const fullImageWidth = imageHeight + marginHorizontal * 2;
const { width } = Dimensions.get('window');
const TouchImage = (props) => {
  const {
    image,
    setMainListindex,
    setBottomListIndex,
    index,
    mainFlatlistRef,
    mainListindex,
    bottomFlatlistRef,
    bottomListIndex,
  } = props;

  return (
    <Animated.View>
      <TouchableOpacity
        style={{
          ...styles.imageContainer,
          borderColor: mainListindex === index ? 'white' : null,
          borderWidth: mainListindex === index ? 3 : 0,
        }}
        onPress={() => {
          mainFlatlistRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true,
          });
          if (index * fullImageWidth - fullImageWidth / 2 > width / 2) {
            bottomFlatlistRef?.current?.scrollToOffset({
              offset: index * fullImageWidth - width / 2 + fullImageWidth / 2,
              animated: true,
            });
            setBottomListIndex(index);
          } else {
            bottomFlatlistRef?.current?.scrollToOffset({
              offset: 0,
              animated: true,
            });
            setBottomListIndex(index);
          }
          setMainListindex(index);
        }}>
        <Image style={styles.image} source={{ uri: image }} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: imageHeight,
    width: imageWidth,
    borderRadius: 10,
    marginHorizontal: marginHorizontal,
    elevation: 4,
    overflow: 'hidden',
  },
  image: { height: '100%', width: '100%', resizeMode: 'cover' },
});

export default TouchImage;
