// import { StatusBar } from "expo-status-bar";
import {
  StatusBar,
  FlatList,
  View,
  Text,
  Alert,
  ActivityIndicator,
  refreshControl,
  RefreshControl,
} from "react-native";
import axios from "axios";

import { Post } from "./components/Post";
import React from "react";

export default function App() {
  const [items, setItems] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchArcticles = () => {
    setIsLoading(true);

    axios
      .get("https://6468ba5260c8cb9a2cb077de.mockapi.io/api/articles/")
      .then(({ data }) => {
        setItems(data);
      })
      .catch((error) => {
        Alert.alert("Backend downloading error");
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(fetchArcticles, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text
          style={{
            marginTop: 15,
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 30 }}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchArcticles} />
        }
        data={items}
        renderItem={({ item }) => (
          <Post
            title={item.title}
            imageURL={item.imageURL}
            createdAt={item.createdAt}
          />
        )}
      />

      {/* {items?.map((item) => (
        <Post
          key={item.id}
          title={item.title}
          imageURL={item.imageURL}
          createdAt={item.createdAt}
        />
      ))} */}

      <StatusBar theme="auto" />
    </View>
  );
}
