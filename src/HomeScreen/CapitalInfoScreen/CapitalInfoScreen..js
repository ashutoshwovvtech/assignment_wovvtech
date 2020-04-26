import React, {Component} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {Card, CardItem, Body} from 'native-base';

const CapitalInfoScreen = ({route}) => {
  let {capitalInfo} = route.params;

  let {temperature, wind_speed, precip, weather_icons} = capitalInfo.current;
  return (
    <View style={{flex: 1, backgroundColor: 'beige'}}>
      <Card>
        <CardItem>
          <Body>
            <Text>Temperature: {temperature}</Text>
            <Text>Precipitation: {precip}</Text>
            <Text>Wind Speed: {wind_speed}</Text>
          </Body>
          <Body>
            {weather_icons.map((eachIcon) => (
              <Image source={{uri: eachIcon}} style={{width: 25, height: 25}} />
            ))}
          </Body>
        </CardItem>
      </Card>
    </View>
  );
};

export default CapitalInfoScreen;
