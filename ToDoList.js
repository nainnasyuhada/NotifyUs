import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ListView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Constants } from 'expo';

export default class App extends Component {
  constructor(props) {
    super(props);
    

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      inputValue: '',
      //set value in state for initial date
      date: '',
      dataSource: ds.cloneWithRows([]),
    };

    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);
  }
  
  _handleTextChange = (value) => {
    const inputValue = value;
    this.setState(() => ({
      inputValue,
    }));
  }
  
  _handleSendButtonPress = () => {
    if (!this.state.inputValue && this.state.date) {
      return;
    }
    const textArray = this.state.dataSource._dataBlob.s1;
    textArray.push(this.state.inputValue && this.state.date);
    // textArray.push(this.state.date);
    this.setState(() => ({
      dataSource: this.state.dataSource.cloneWithRows(textArray),
      inputValue: '',
      date:'',
    }));
  };
  
  _handleDeleteButtonPress = (id) => {
    this.setState((a) => {
      const newItem = a.dataSource._dataBlob.s1.filter((item, i) => (parseInt(id) !== i));
      return {
        dataSource: this.state.dataSource.cloneWithRows(newItem),
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formView}>
          <TextInput
            style={styles.inputForm}
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            placeholder="Enter Title"
          />

      <DatePicker
          style={{ width: 320 }}
          date={this.state.date} //initial date from state
          mode="datetime" //The enum of date, datetime and time
          placeholder="Select Date/Time"
          format="DD-MM-YYYY"
          minDate="19-05-2019"
          maxDate="01-01-2021"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },

            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />  



          <Button
            title="Add"
            onPress={this._handleSendButtonPress}
          />
        </View>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => {
            const handleDelete = () => {
              return this._handleDeleteButtonPress(rowID);
            }
            return (
              <View style={styles.todoItem}>
                <Text style={styles.todoText}>{rowData}</Text>
                <Button
                  title="Delete"
                  onPress={handleDelete}
                  style={styles.deleteButton}
                />
              </View>
              );
            }
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#eee',
  },
  formView: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
  },
  inputForm: {
    backgroundColor: '#fff',
    width: 320,
    height: 40,
    padding: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  todoItem: {
    alignItems: 'center',
    padding: 8,
    width: 320,
    borderBottomWidth: 1.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    // border: '1 solid #333',
    flex: 1,
    flexDirection: 'row',
  },
  todoText: {
    flex: 1,
  },
});
