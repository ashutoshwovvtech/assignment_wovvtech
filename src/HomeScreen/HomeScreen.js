import React from 'react';
import {Text, View} from 'react-native';
import {Item, Input, Button, Toast} from 'native-base';
import axios from 'axios';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataDetails: null,
      loader: false,
      textInput: '',
    };
  }

  //changes on input
  onchangeInput = (text) => {
    this.setState({textInput: text});
  };

  showIssue = () => {
    Toast.show({
      text: 'No Records to display',
      position: 'bottom',
    });
  };

  fetchCountryDetails = async (data) => {
    try {
      let response = await axios.get(
        `https://restcountries.eu/rest/v2/name/${data}`,
      );

      if (response.data && response.data.length > 0) {
        this.props.navigation.navigate('Details', {
          details: response.data,
        });
      } else {
        throw Error('No Records to display');
      }
    } catch (e) {
      this.showIssue();
    }
  };

  onSubmit = () => {
    this.fetchCountryDetails(this.state.textInput);
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            height: 400,
            width: '100%',
            backgroundColor: 'beige',
            borderWidth: 0.1,
            elevation: 8,
            //     justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Item
            rounded
            style={{backgroundColor: '#fff', width: '70%', borderWidth: 2}}>
            <Input
              placeholder={'Enter country'}
              value={this.state.textInput}
              onChangeText={this.onchangeInput}
            />
          </Item>
          <Button
            onPress={this.onSubmit}
            disabled={this.state.textInput == '' ? true : false}
            style={{
              width: '60%',
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
              Submit
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
