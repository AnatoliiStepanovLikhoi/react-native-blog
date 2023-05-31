import { View, Text, Image } from "react-native";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Loading } from "../components/Loading";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export const FullPost = ({ route, navigation }) => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const { id, title } = route.params;

  //   console.log(route);

  const fetchArcticles = () => {
    navigation.setOptions({
      title,
    });

    setIsLoading(true);

    axios
      .get(`https://6468ba5260c8cb9a2cb077de.mockapi.io/api/articles/${id}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        Alert.alert("Article downloading error");
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(fetchArcticles, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ padding: 10 }}>
      <PostImage
        source={{
          uri: data?.imageURL,
        }}
      />

      <PostText>{data?.text}</PostText>
    </View>
  );
};
