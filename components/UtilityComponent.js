import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import MaterialCommunityIcons
import { MaterialIcons } from "react-native-vector-icons"; // Import MaterialIcons

const ControlComponent = ({ title, path }) => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setRed(data.R);
        setGreen(data.G);
        setBlue(data.B);
        if (data.updated) {
          const epochTime = data.updated * 1000; // milliseconds
          setLastUpdated(new Date(epochTime).toLocaleString());
        }
      }
    });
  }, [path]);

  const toggleValue = () => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    const newRedValue = red === 1 ? 0 : 1;
    set(dbRef, {
      R: newRedValue,
      G: green,
      B: blue,
      updated: Math.floor(Date.now() / 1000),
    });
    setRed(newRedValue); // Cập nhật state red
  };

  const toggleGreen = () => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    const newGreenValue = green === 1 ? 0 : 1;
    set(dbRef, {
      R: red,
      G: newGreenValue,
      B: blue,
      updated: Math.floor(Date.now() / 1000),
    });
    setGreen(newGreenValue); // Cập nhật state green
  };

  const toggleBlue = () => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    const newBlueValue = blue === 1 ? 0 : 1;
    set(dbRef, {
      R: red,
      G: green,
      B: newBlueValue,
      updated: Math.floor(Date.now() / 1000),
    });
    setBlue(newBlueValue); // Cập nhật state blue
  };

  return (
    <View style={styles.controlContainer}>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.row}>
        <MaterialIcons
          name="lightbulb"
          size={30}
          color={red === 1 ? "red" : "gray"}
          style={styles.icon}
        />
        <Text style={styles.label}> --- Red Value:</Text>
        <Text style={styles.value}>{red}</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={toggleValue}>
          <Text style={styles.buttonText}>ON / OFF</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <MaterialIcons
          name="lightbulb"
          size={30}
          color={green === 1 ? "green" : "gray"}
          style={styles.icon}
        />
        <Text style={styles.label}> --- Green Value:</Text>
        <Text style={styles.value}>{green}</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={toggleGreen}>
          <Text style={styles.buttonText}>ON / OFF</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <MaterialIcons
          name="lightbulb"
          size={30}
          color={blue === 1 ? "blue" : "gray"}
          style={styles.icon}
        />
        <Text style={styles.label}> --- Blue Value:</Text>
        <Text style={styles.value}>{blue}</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={toggleBlue}>
          <Text style={styles.buttonText}>ON / OFF</Text>
        </TouchableOpacity>
      </View>
      {lastUpdated && (
        <Text style={styles.updatedd}>Last Updated: {lastUpdated}</Text>
      )}
    </View>
  );
};

const StatusControl = ({ title, path }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setIsEnabled(snapshot.val().auto);
      }
    });
  }, [path]);

  const toggleSwitch = () => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    const newValue = !isEnabled;
    set(dbRef, { auto: newValue });
    setIsEnabled(newValue);
  };

  return (
    <View style={styles.controlContainer}>
      <Text style={styles.headerFloor}>{title}</Text>
      <View style={styles.rowA}>
        <Text style={styles.labelAuto}>Auto:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const ServeControl = ({ title, path }) => {
  const [value, setValue] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setValue(data.value);
        if (data.updated) {
          const epochTime = data.updated * 1000; // milliseconds
          setLastUpdated(new Date(epochTime).toLocaleString());
        }
      }
    });
  }, [path]);

  const toggleValue = () => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    const newValue = 1 - value;
    set(dbRef, { value: newValue, updated: Math.floor(Date.now() / 1000) });
    setValue(newValue);
  };

  return (
    <View style={styles.controlContainer}>
      <Text style={styles.headerr}>{title}</Text>
      <View style={styles.rowB}>
        <Icon
          name="door-closed-lock"
          size={30}
          color={value === 1 ? "orange" : "gray"}
          style={styles.icon}
        />
        <Text style={styles.label}> --- Value:</Text>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={toggleValue}>
          <Text style={styles.buttonText}>OPEN / CLOSE</Text>
        </TouchableOpacity>
      </View>
      {lastUpdated && (
        <Text style={styles.updated}>Last Updated: {lastUpdated}</Text>
      )}
    </View>
  );
};

const LEDallControl = ({ title, path }) => {
  const [ledState, setLedState] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setLedState(data.value);
        if (data.updated) {
          const epochTime = data.updated * 1000; // milliseconds
          setLastUpdated(new Date(epochTime).toLocaleString());
        }
      }
    });
  }, [path]);

  const toggleLedState = () => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    const newValue = 1 - ledState;
    set(dbRef, { value: newValue, updated: Math.floor(Date.now() / 1000) });
    setLedState(newValue);
  };

  return (
    <View style={styles.controlContainer}>
      <View style={styles.rowA}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.label}> --- State:</Text>
        <Text style={styles.value}>{ledState}</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={toggleLedState}>
          <Text style={styles.buttonText}>ON / OFF</Text>
        </TouchableOpacity>
      </View>
      {lastUpdated && (
        <Text style={styles.updatedl}>Last Updated: {lastUpdated}</Text>
      )}
    </View>
  );
};

const Utility = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const dbRefTime = ref(db, "TIME");

    onValue(dbRefTime, (snapshot) => {
      if (snapshot.exists() && snapshot.val().value) {
        const epochTime = snapshot.val().value * 1000; // milliseconds
        setTime(new Date(epochTime).toLocaleString());
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.lastUpdatedContainer}>
        <Text style={styles.lastUpdatedText}>Time: {time}</Text>
      </View>

      <View style={styles.titleFloor}>
        <StatusControl title="UTILITY SYSTEM" path="STATUSRGB" />
      </View>
      <ControlComponent title="RGB_LED" path="LEDs" />
      <LEDallControl title="LED All" path="LEDall" />
      <ServeControl title="Door" path="SERVO" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    position: "relative",
  },
  controlContainer: {
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerr: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: -25
  },
  headerFloor: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#528B8B",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
  },
  rowA: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -40,
  },
  rowB: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -10,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  value: {
    fontSize: 18,
    marginRight: 10,
  },
  icon: {
    marginLeft: 10,
  },
  updated: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
    marginLeft: -20
  },
  updatedd: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
    marginLeft: -5
  },
  updatedl: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
    marginLeft: -40
  },
  lastUpdatedContainer: {
    position: "absolute",
    top: 50,
    right: 10,
    alignItems: "flex-end",
  },
  lastUpdatedText: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
  labelAuto: {
    alignItems: "center",
    marginStart: 120,
  },
  buttonStyle: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Utility;
