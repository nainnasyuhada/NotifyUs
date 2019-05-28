// import React,{Component} from 'react';
// import {ActivityIndicator, Clipboard, Share, StatusBar, View, Text, TextInput, TouchableOpacity, Button, ListView, Image, StyleSheet, ScrollView} from 'react-native';
// import DatePicker from 'react-native-datepicker';
// import { Constants } from 'expo';
// import {createSwitchNavigator} from 'react-navigation';
// // import { Constants, ImagePicker, Permissions } from 'expo';
// import firebase from 'firebase';

// // export default class Apps extends Component {
// class DashboardScreen extends React.Component {
//   constructor(props) {
//     super(props);
    
//     // state = {
//     //   image: null,
//     //   uploading: false,
//     // };

//     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     this.state = {
//       inputValue: '',
//       //set value in state for initial date
//       datetime: '',
//       image: null,
//       uploading: false,
//       dataSource: ds.cloneWithRows([]),
//     };

//     this._handleTextChange = this._handleTextChange.bind(this);
//     this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);
//   }
  
//   _handleTextChange = (value) => {
//     const inputValue = value;
//     this.setState(() => ({
//       inputValue,
//     }));
//   }
  
//   _handleSendButtonPress = () => {
//     if (!this.state.inputValue && this.state.date) {
//       return;
//     }
//     const textArray = this.state.dataSource._dataBlob.s1;
//     textArray.push(this.state.inputValue);
//     // textArray.push(this.state.date);
//     this.setState(() => ({
//       dataSource: this.state.dataSource.cloneWithRows(textArray),
//       inputValue: '',
//       date:'',
//     }));
//   };
  
//   _handleDeleteButtonPress = (id) => {
//     this.setState((a) => {
//       const newItem = a.dataSource._dataBlob.s1.filter((item, i) => (parseInt(id) !== i));
//       return {
//         dataSource: this.state.dataSource.cloneWithRows(newItem),
//       }
//     });
//   };

//   render() {
//     return (
//       <ScrollView>
//       <View style= {styles.container}>

//         <TouchableOpacity onPress = {() => this.props.navigation.navigate('ImagePickerScreen')}>
//           <Image source = { require('./icon.png')} 
//                  style= {styles.icon}/>
      
//       <Text style = {styles.title}>Upload Photo!</Text> 
//       </TouchableOpacity>

//       <TouchableOpacity onPress={()=>firebase.auth().signOut()}>
//       <Image 
//       source = { require('./SignOut.png')}
//       style= {styles.signout} />
//       <Text style= {styles.signoutText}> Sign Out </Text>
//       </TouchableOpacity>  

//       {/* <Button title='Sign Out'
//       onPress={()=> firebase.auth().signOut()}/> */}

// <View style={styles.formView}>
//           <TextInput
//             multiline = {true}
//             numberOfLines = {5}
//             style={styles.inputForm}
//             value={this.state.inputValue}
//             onChangeText={this._handleTextChange}
//             placeholderTextColor= "grey"
//             placeholder="Enter Task"
//             height = {100}
//           />

//       <DatePicker
//           style={{ width: 320, placeholderTextColor: "grey",}}
//           date={this.state.datetime} //initial date from state
//           mode="datetime" //The enum of date, datetime and time
//           placeholder="Select Date/Time"
//           placeholderTextColor= "grey"
//           format="DD-MM-YYYY"
//           minDate="24-05-2019"
//           maxDate="01-01-2021"
//           confirmBtnText="Confirm"
//           cancelBtnText="Cancel"
//           customStyles={{
//             dateIcon: {
//               position: 'absolute',
//               left: 0,
//               top: 4,
//               marginLeft: 0,
//             },

//             dateInput: {
//               marginLeft: 36,
//               borderColor: "#33AFFF",
//               borderRadius: 5,
//               borderWidth: 1,
//               placeholderTextColor: "grey",
//             },
//           }}
//           onDateChange={datetime => {
//             this.setState({ datetime: datetime });
//           }}
//           placeholderTextColor= "grey"
//         />  

//       <TouchableOpacity  
//       style={styles.taskButton}
//       onPress={this._handleSendButtonPress}>
//       <Text style={styles.task}> Add Task </Text>
//       </TouchableOpacity> 


  
//         </View>

//         <ListView
//           style={styles.listView}
//           dataSource={this.state.dataSource}
//           renderRow={(rowData, sectionID, rowID) => {
//             const handleDelete = () => {
//               return this._handleDeleteButtonPress(rowID);
//             }
//             return (
//               <View style={styles.todoItem}>
//                 <Text style={styles.todoText}>{rowData}</Text>
//                 <Button
//                   title="Delete"
//                   onPress={handleDelete}
//                   style={styles.deleteButton}
//                   color = "red"
//                 />
//               </View>
//               );
//             }
//           }
//         />
   

//       </View>
//       </ScrollView>
//     );
//   }

  
// }





// export default DashboardScreen;

// const styles = StyleSheet.create ({

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   icon: {
//     height: 35,
//     width: 35,
//     position: 'absolute',
//     right: 150,
//     top: 40,
//     // marginTop: 35,
//     // marginBottom: 50,

//   },

//   title: {
//     fontSize: 20,
//     color: 'blue',
//     position: 'absolute',
//     right: 43,
//     top: 47,
//   },

//   signout: {
//     height: 35,
//     width: 35,
//     position: 'absolute',
//     right: -175,
//     marginTop: 35,
//     marginBottom: 50,
//     top: 0,
//   },

//   signoutText: {
//     color: "red",
//     marginTop: 45,
//     position: "absolute",
//     right: -135,
//     fontSize: 20,
//     top: 0,
//   },

//   formView: {
//     position:'absolute',
//     // borderBottomWidth: 1,
//     // borderColor: '#ccc',
//     // paddingBottom: 8,
//     // marginTop: 1,
//     top: 100,
//   },

//   inputForm: {
//     backgroundColor: '#fff',
//     width: 320,
//     height: 40,
//     padding: 8,
//     marginBottom: 8,
//     textAlign: 'center',
//     // color: "grey",
//     borderColor: "#33AFFF",
//     borderRadius: 5,
//     borderWidth: 1,
//     justifyContent: 'center',
//     textAlignVertical:'center',
//     alignItems: 'center'

//   },

//   todoItem: {
//     alignItems: 'center',
//     padding: 8,
//     width: 320,
//     borderBottomWidth: 1.5,
//     borderColor: '#e0e0e0',
//     backgroundColor: '#fff',
//     // border: '1 solid #333',
//     flex: 1,
//     flexDirection: 'row',
//   },

//   task: {
//     backgroundColor: '#33AFFF',
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     // height: '45%',
//     paddingTop: 13,
//     // fontSize: 20,
//   },

//   taskButton: {
//     height: '20%',
//     marginTop: 15,
//     backgroundColor: '#33AFFF',
//   },

//   todoText: {
//     flex: 1,
//   },

//   listView: {
//     position: "absolute",
//     top:350,
//   },

// })


import React,{Component} from 'react';
import {ActivityIndicator, Clipboard, Share, StatusBar, View, Text, TextInput, TouchableOpacity, Button, ListView, Image, StyleSheet, ScrollView} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Constants } from 'expo';
import {createSwitchNavigator} from 'react-navigation';
// import { Constants, ImagePicker, Permissions } from 'expo';
import firebase from 'firebase';

// export default class Apps extends Component {
class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    
    // state = {
    //   image: null,
    //   uploading: false,
    // };

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      inputValue: '',
      //set value in state for initial date
      datetime: '',
      image: null,
      uploading: false,
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
    if (!this.state.inputValue || !this.state.datetime) {
      return;
    }
    const textArray = this.state.dataSource._dataBlob.s1;
    textArray.push(this.state.inputValue);
    textArray.push(this.state.datetime);
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
      <ScrollView>
      <View style= {styles.container}>

        <TouchableOpacity onPress = {() => this.props.navigation.navigate('ImagePickerScreen')}>
          <Image source = { require('./icon.png')} 
                 style= {styles.icon}/>
      
      <Text style = {styles.title}>Upload Photo!</Text> 
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>firebase.auth().signOut()}>
      <Image 
      source = { require('./SignOut.png')}
      style= {styles.signout} />
      <Text style= {styles.signoutText}> Sign Out </Text>
      </TouchableOpacity>  

      {/* <Button title='Sign Out'
      onPress={()=> firebase.auth().signOut()}/> */}

<View style={styles.formView}>
          <TextInput
            multiline = {true}
            numberOfLines = {5}
            style={styles.inputForm}
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            placeholderTextColor= "grey"
            placeholder="Enter Task"
            height = {100}
          />

      <DatePicker
          style={{ width: 320, placeholderTextColor: "grey",}}
          date={this.state.datetime} //initial date from state
          mode="datetime" //The enum of date, datetime and time
          placeholder="Select Date/Time"
          placeholderTextColor= "grey"
          format="DD-MM-YYYY"
          minDate="24-05-2019"
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
              borderColor: "#33AFFF",
              borderRadius: 5,
              borderWidth: 1,
              placeholderTextColor: "grey",
            },
          }}
          onDateChange={datetime => {
            this.setState({ datetime: datetime });
          }}
          placeholderTextColor= "grey"
        />  

      <TouchableOpacity  
      style={styles.taskButton}
      onPress={this._handleSendButtonPress}>
      <Text style={styles.task}> Add Task </Text>
      </TouchableOpacity> 


  
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
                  color = "red"
                />
              </View>
              );
            }
          }
        />
   

      </View>
      </ScrollView>
    );
  }

  
}





export default DashboardScreen;

const styles = StyleSheet.create ({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    height: 35,
    width: 35,
    position: 'absolute',
    right: 150,
    top: 40,
    // marginTop: 35,
    // marginBottom: 50,

  },

  title: {
    fontSize: 20,
    color: 'blue',
    position: 'absolute',
    right: 43,
    top: 47,
  },

  signout: {
    height: 35,
    width: 35,
    position: 'absolute',
    right: -175,
    marginTop: 35,
    marginBottom: 50,
    top: 0,
  },

  signoutText: {
    color: "red",
    marginTop: 45,
    position: "absolute",
    right: -135,
    fontSize: 20,
    top: 0,
  },

  formView: {
    position:'absolute',
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    // paddingBottom: 8,
    // marginTop: 1,
    top: 100,
  },

  inputForm: {
    backgroundColor: '#fff',
    width: 320,
    height: 40,
    padding: 8,
    marginBottom: 8,
    textAlign: 'center',
    // color: "grey",
    borderColor: "#33AFFF",
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    textAlignVertical:'center',
    alignItems: 'center'

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

  task: {
    backgroundColor: '#33AFFF',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    // height: '45%',
    paddingTop: 13,
    // fontSize: 20,
  },

  taskButton: {
    height: '20%',
    marginTop: 15,
    backgroundColor: '#33AFFF',
  },

  todoText: {
    flex: 1,
  },

  listView: {
    position: "absolute",
    top:350,
  },

})

