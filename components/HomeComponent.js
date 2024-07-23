import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

class Home extends Component {
  navigateToNextScreen = () => {
    this.props.navigation.navigate("Utility");
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/oo.jpg")}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <FontAwesome name="hand-peace-o" size={30} color="#fff" />
            <Text style={styles.welcomeText}> Welcome to</Text>
          </View>
          <Icon name="home-automation" size={100} color="#fff" />
          <Text style={styles.title}>Smart Home</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.navigateToNextScreen}
        >
          <Text style={styles.buttonText}>Let's Go</Text>
          <Icon name="arrow-right" size={24} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 10,
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#fff",
    marginLeft: 10,
  },
  title: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B9C9C",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    marginRight: 10,
  },
});

export default Home;
