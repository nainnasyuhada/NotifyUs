import React from 'react';
import {View, Button, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ImagePickerScreen from './screens/ImagePickerScreen';

import * as firebase from 'firebase';
import {firebaseConfig} from './config';
firebase.initializeApp(firebaseConfig);

// export default class Apps extends Component {
export default class App extends React.Component {


  render() {
    return <AppNavigator />;
   
  
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen:DashboardScreen,
  ImagePickerScreen: ImagePickerScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create ({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

})

// import React from 'react';
// import {View, Button, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
// import {createAppContainer, createSwitchNavigator} from 'react-navigation';

// import LoadingScreen from './screens/LoadingScreen';
// import LoginScreen from './screens/LoginScreen';
// import DashboardScreen from './screens/DashboardScreen';
// import {db} from './config';
// import firebase from 'firebase';
// firebase.initializeApp(db);


// export default class App extends React.Component {


//   render() {
//     return <AppNavigator />;
   
  
//   }
// }

// const AppSwitchNavigator = createSwitchNavigator({
//   LoadingScreen:LoadingScreen,
//   LoginScreen:LoginScreen,
//   DashboardScreen:DashboardScreen
// });

// const AppNavigator = createAppContainer(AppSwitchNavigator);

// const styles = StyleSheet.create ({

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

// })