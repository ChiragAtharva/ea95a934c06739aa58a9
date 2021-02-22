import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

export class ListingDetails extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    var rawJson = this.props.route.params.rawJson;
    console.log('rawJson :', JSON.stringify(rawJson));
    return (
      <View style={styes.container}>
        <Text>{rawJson}</Text>
      </View>
    );
  }
}

const styes = StyleSheet.create({
  container: {flex: 1},
});

export default ListingDetails;
