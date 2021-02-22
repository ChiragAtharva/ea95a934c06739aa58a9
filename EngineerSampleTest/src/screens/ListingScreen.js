import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

export class ListingScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      data: [{}],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.fetchRecord(this.state.pageNo);
    this.timer = setInterval(() => {
      this.setState({
        pageNo: this.state.pageNo + 1,
      });
      this.fetchRecord(this.state.pageNo);
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async fetchRecords(page_No) {
    this.setState({isLoading: true});
    console.log(
      'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + page_No,
    );
    fetch(
      'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + page_No,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({isLoading: false});
        console.log('Response :- ', json);
        this.setState({data: [...this.state.data, ...json.hits]});
      })
      .catch((error) => {
        this.setState({isLoading: false});
        r;
        console.error(error);
      });
  }

  renderCard(item, index) {
    return (
      <View style={{width: '100%'}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            const _data = JSON.stringify(item);
            console.log('data - ' + _data);

            this.props.navigation.navigate('ListingDetails', {
              rawJson: _data,
            });
          }}>
          <View>
            <Text>{'Title - ' + item.title}</Text>
            <Text>{'url - ' + item.url}</Text>
            <Text>{'author - ' + item.author}</Text>
            <Text>{'created_at - ' + item.created_at}</Text>
            <View style={{height: 1, width: '100%', backgroundColor: 'red'}} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  onScrollHandler = () => {
    this.setState(
      {
        pageNo: this.state.pageNo + 1,
      },
      () => {
        this.fetchRecords(this.state.pageNo);
      },
    );
  };

  render() {
    return (
      <View style={styes.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => this.renderCard(item, index)}
          keyExtractor={(item, index) => index}
          onEndReached={this.onScrollHandler}
          onEndThreshold={0}
        />
        <Text
          style={{
            height: 50,
            backgroundColor: 'gray',
            width: '100%',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {'Page No - ' + this.state.pageNo}
        </Text>
      </View>
    );
  }
}

const styes = StyleSheet.create({
  container: {flex: 1},
});

export default ListingScreen;
