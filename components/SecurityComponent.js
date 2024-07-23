import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import MaterialCommunityIcons
import { MaterialIcons } from "react-native-vector-icons"; // Import MaterialIcons

const ControlComponent = ({ title, path, icon }) => {
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
      <Text style={styles.header}>{title}</Text>
      <View style={styles.row}>
        {icon === "buzzer" && (
          <MaterialIcons
            name="notifications-active"
            size={30}
            color={value === 1 ? "orange" : "gray"}
            style={styles.icon}
          />
        )}
        {icon === "lightbulb" && (
          <MaterialIcons
            name="lightbulb"
            size={30}
            color={value === 1 ? "orange" : "gray"}
            style={styles.icon}
          />
        )}
        {icon === "waterpump" && (
          <Icon
            name="water-pump"
            size={30}
            color={value === 1 ? "orange" : "gray"}
            style={styles.icon}
          />
        )}
        <Text style={styles.label}> --- Value:</Text>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={toggleValue}>
          <Text style={styles.buttonText}>ON / OFF</Text>
        </TouchableOpacity>
      </View>
      {lastUpdated && (
        <Text style={styles.updated}>Last Updated: {lastUpdated}</Text>
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
      <View style={styles.row}>
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

const WaterPumpControl = ({ title, path }) => {
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
      <Text style={styles.header}>{title}</Text>
      <View style={styles.row}>
        <Icon
          name="water-pump"
          size={30}
          color={value === 1 ? "orange" : "gray"}
          style={styles.icon}
        />
        <Text style={styles.label}> --- Value:</Text>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={toggleValue}>
          <Text style={styles.buttonText}>ON / OFF</Text>
        </TouchableOpacity>
      </View>
      {lastUpdated && (
        <Text style={styles.updated}>Last Updated: {lastUpdated}</Text>
      )}
    </View>
  );
};

const Security = () => {
  const [lastUpdatedBuzzer, setLastUpdatedBuzzer] = useState("");
  const [lastUpdatedLight, setLastUpdatedLight] = useState("");
  const [lastUpdatedWaterPump, setLastUpdatedWaterPump] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const dbRefBuzzer = ref(db, "BUZZER");
    const dbRefLight = ref(db, "LIGHT");
    const dbRefWaterPump = ref(db, "WATERPUMP");
    const dbRefTime = ref(db, "TIME");

    onValue(dbRefBuzzer, (snapshot) => {
      if (snapshot.exists() && snapshot.val().updated) {
        const epochTime = snapshot.val().updated * 1000; // milliseconds
        setLastUpdatedBuzzer(new Date(epochTime).toLocaleString());
      }
    });

    onValue(dbRefLight, (snapshot) => {
      if (snapshot.exists() && snapshot.val().updated) {
        const epochTime = snapshot.val().updated * 1000; // milliseconds
        setLastUpdatedLight(new Date(epochTime).toLocaleString());
      }
    });

    onValue(dbRefWaterPump, (snapshot) => {
      if (snapshot.exists() && snapshot.val().updated) {
        const epochTime = snapshot.val().updated * 1000; // milliseconds
        setLastUpdatedWaterPump(new Date(epochTime).toLocaleString());
      }
    });
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
        <StatusControl title="SECURITY SYSTEM" path="STATUS" />
      </View>
      <ControlComponent title="BUZZER SOS" path="BUZZER" icon="buzzer" />
      <ControlComponent title="GATE LIGHT" path="LIGHT" icon="lightbulb" />
      <WaterPumpControl title="Water Pump" path="WATERPUMP" />
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
    marginBottom: 10,
  },
  headerFloor: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    margin: 30,
    color: "#528B8B",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
    margin: 30,
    marginStart: 90
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

export default Security;
