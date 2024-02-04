import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Collapsible from "react-native-collapsible";

const DoaItem = React.memo(({ index, data, collaps, setCollaps }) => (
  <View>
    <TouchableOpacity onPress={() => setCollaps(index)} style={styles.cardItem}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.circle}>
          <Text>{index + 1}</Text>
        </View>

        <Text style={{ marginHorizontal: 10, alignSelf: "center" }}>
          {data.doa}
        </Text>
      </View>

      <Icon name="chevron-down" size={25} />
    </TouchableOpacity>

    <Collapsible collapsed={collaps} index={index} style={styles.collap}>
      <Text style={{ fontWeight: "bold", fontSize: 21 }}>{data.ayat}</Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 400,
          marginTop: 10,
          fontStyle: "italic",
        }}
      >
        {data.latin}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: 400, marginTop: 15 }}>
        Artinya : {data.artinya}
      </Text>
    </Collapsible>
  </View>
));

class Card extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsedStates: Array(this.props.data.length).fill(true),
    };
  }

  toggleCollaps = (index) => {
    this.setState((prevState) => {
      const newCollapsedStates = [...prevState.collapsedStates];
      newCollapsedStates[index] = !newCollapsedStates[index];
      return { collapsedStates: newCollapsedStates };
    });
  };

  render() {
    return this.props.data.map((item, index) => (
      <DoaItem
        key={item.id}
        data={item}
        index={index}
        collaps={this.state.collapsedStates[index]}
        setCollaps={() => this.toggleCollaps(index)}
      />
    ));
  }
}

const styles = StyleSheet.create({
  cardItem: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#92a8d1",
    borderWidth: 2,
  },
  collap: {
    marginTop: -5,
    marginBottom: 8,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default Card;
