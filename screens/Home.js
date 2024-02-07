import { React, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SliderBox } from "react-native-image-slider-box";
import { getAllDoa, searchDoa } from "../services/apiDoa";
import Card from "../components/Card";

export default function Home() {
  // variable
  StatusBar.setHidden(true);
  const dimensions = Dimensions.get("screen");
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollViewRef = useRef(null);
  const [text, onChangeText] = useState("");
  const images = [
    "https://source.unsplash.com/random/?surah",
    "https://source.unsplash.com/random/?ka'bah",
    "https://source.unsplash.com/random/?quran",
    "https://source.unsplash.com/random/?sholat",
  ];
  const placeholder = [require("../assets/placeholder.gif")];
  const [allDoa, setAllDoa] = useState([]);
  const [getSearch, setSearch] = useState([]);

  // fitur
  const getData = () => {
    return Promise.all([getAllDoa()]);
  };
  const search = (keyword) => {
    searchDoa(keyword)
      .then((data) => {
        setSearch([data]);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(getSearch);
  };
  const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  useEffect(() => {
    getData()
      .then(([getAllDoa]) => {
        setAllDoa(getAllDoa);
      })
      .catch((err) => {
        console.log(err);
        console.log("error nih");
      });
  }, []);

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View>
          <SliderBox
            images={images ? images : placeholder}
            sliderBoxHeight={dimensions.height / 1.8}
            circleLoop={true}
            resizeMethod={"resize"}
            resizeMode={"cover"}
            imageLoadingColor="#2196F3"
            dotStyle={{ width: 30, marginBottom: 60 }}
            dotColor="#00FF00"
            disableOnPress={true}
            autoplay={true}
            autoplayInterval={20000}
          />

          <TextInput
            style={styles.input}
            onChangeText={(keyword) => {
              onChangeText(keyword);
              search(keyword);
            }}
            value={text}
            placeholder="Cari Doa..."
          />
        </View>

        <View style={styles.container}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Kumpulan Doa
          </Text>

          <Card data={text !== "" ? getSearch : allDoa} />
        </View>
      </ScrollView>

      {scrollPosition > 60 && (
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: "#00FF00",
            padding: 10,
            borderRadius: 5,
            width: 40,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
          onPress={scrollToTop}
        >
          <Icon
            name="angle-up"
            size={30}
            color={"white"}
            style={{ marginTop: -7 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: "relative",
    top: -50,
    marginBottom: -50,
    backgroundColor: "white",
    borderRadius: 25,
  },

  input: {
    height: 40,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    width: 150,
    padding: 10,
    position: "absolute",
    zIndex: 10,
    top: 20,
    right: 20,
  },
});
