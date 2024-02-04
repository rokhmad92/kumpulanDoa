import { React, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { getAllDoa } from "../services/apiDoa";
import Card from "../components/Card";

export default function Home() {
  const dimensions = Dimensions.get("screen");
  const images = [
    "https://source.unsplash.com/random/?surah",
    "https://source.unsplash.com/random/?ka'bah",
    "https://source.unsplash.com/random/?quran",
    "https://source.unsplash.com/random/?sholat",
  ];
  const placeholder = [require("../assets/placeholder.gif")];
  const [allDoa, setAllDoa] = useState([]);

  const getData = () => {
    return Promise.all([getAllDoa()]);
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
    <ScrollView>
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
      </View>

      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Kumpulan Doa
        </Text>

        <Card data={allDoa} />
      </View>
    </ScrollView>
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
});
