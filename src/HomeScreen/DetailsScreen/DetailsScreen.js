import React, {Component} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {List, ListItem, Body, Button, Toast} from 'native-base';
import axios from 'axios';

//Flag image is in svg , need support library for the conversion

const CustomListItem = ({item, onpress}) => {
  let {capital, population, latlng, flag} = item;
  return (
    <ListItem onPress={onpress}>
      <Body>
        <Text>Capital : {capital}</Text>
        <Text>Population :{population}</Text>
        <Text>LatLong : {latlng}</Text>
      </Body>

      <Body>
        <Button
          onPress={() => onpress(capital)}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
            Capital Weather
          </Text>
        </Button>
      </Body>
    </ListItem>
  );
};

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsData: props.route.params.details,
    };
  }

  showIssue = () => {
    Toast.show({
      text: 'No Records to display',
      position: 'bottom',
    });
  };

  fetchCaptialInformation = async (capital) => {
    try {
      let response = await axios.get(
        `http://api.weatherstack.com/current?access_key=50b5904e07d953cde78e88e0af0b8c08&query=${capital}`,
      );

      this.props.navigation.navigate('Capital', {
        capitalInfo: response.data,
      });
    } catch (e) {
      this.showIssue();
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'lightblue'}}>
        <FlatList
          data={this.state.detailsData}
          renderItem={({item}) => (
            <CustomListItem
              item={item}
              onpress={this.fetchCaptialInformation}
            />
          )}
          keyExtractor={(item, idx) => item + idx.toString()}
        />
      </View>
    );
  }
}

export default DetailsScreen;

///this.props.route.params
//<Text>{details[0].capital}</Text>
/*
    <Body>
        <Image source={{uri: flag}} style={{height: 100, width: 100}} />
        <Text>To be loaded</Text>
      </Body>

*/
/*

    return const DetailsScreen = ({route}) => {
        let {details} = route.params;
      
        return (
          <View style={{flex: 1, backgroundColor: 'teal'}}>
            <FlatList
              data={details}
              renderItem={({item}) => <CustomListItem item={item} />}
              keyExtractor={(item, idx) => item + idx.toString()}
            />
          </View>
        );
      };


*/
