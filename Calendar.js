import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, Calendar, Permissions } from 'expo';
import { Button } from 'react-native-elements'; // 0.18.5

export default class App extends Component {
  state = {
    results: []  
  };

  
  myCalendar() {
    let details = {
      title: 'myCalendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.REMINDER,
      sourceId: 'my_calendar_1'
    };
    
    componentDidMount = async () => {
      const permission = await Permissions.getAsync(Permissions.CALENDAR);
      if (permission.status !== 'granted') {
          const newPermission = await Permissions.askAsync(Permissions.CALENDAR);
          if (newPermission.status === 'granted') {
            //its granted.
          }
      } 
    }



    Calendar.createCalendarAsync(details)
      .then( event => {
        this.setState({ results: event });
      })
      .catch( error => {
        this.setState({ results: error });
      });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Make a Calendar"
          onPress={() => this.myCalendar()}
          buttonStyle={{ backgroundColor: '#d00001'}}
        />
        
        <Text style={{ marginTop: 20 }}>{this.state.results.toString()}</Text>
        
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
    backgroundColor: '#ecf0f1',
  },
  
});