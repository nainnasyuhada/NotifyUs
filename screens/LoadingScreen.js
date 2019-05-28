import React,{Component} from 'react';
import {View, Button, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';
import firebase from 'firebase';

// export default class Apps extends Component {
class LoadingScreen extends React.Component {

    componentDidMount(){
        this.checkIfLoggedIn();
    }

    // To chech whether user has logged in or not
    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function(user)
        {
            console.log('AUTH STATE CHAGED CALLED')
            
            // if logged in, navigate to DashboardScreen
            if(user)
            {
                this.props.navigation.navigate('DashboardScreen');

            }

            //if not logged in, navigate to LoginScreen
            else {
                this.props.navigation.navigate('LoginScreen');
            }
        }.bind(this)
        );

    }

  render() {
    return (
      <View style= {styles.container}>
      <ActivityIndicator size="large"/>
   

      </View>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create ({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

})

// import React,{Component} from 'react';
// import {View, Button, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
// import {createSwitchNavigator} from 'react-navigation';
// import firebase from 'firebase';
// // import {db} from '../config';
// // firebase.initializeApp(db);
// // export default class Apps extends Component {
// class LoadingScreen extends React.Component {

//     componentDidMount(){
//         this.checkIfLoggedIn();
//     }

//     // To chech whether user has logged in or not
//     checkIfLoggedIn = () => {
//         db.auth().onAuthStateChanged(function(user)
//         {
//             console.log('AUTH STATE CHAGED CALLED')
            
//             // if logged in, navigate to DashboardScreen
//             if(user)
//             {
//                 this.props.navigation.navigate('DashboardScreen');

//             }

//             //if not logged in, navigate to LoginScreen
//             else {
//                 this.props.navigation.navigate('LoginScreen');
//             }
//         }.bind(this)
//         );

//     }

//   render() {
//     return (
//       <View style= {styles.container}>
//       <ActivityIndicator size="large"/>
   

//       </View>
//     );
//   }
// }

// export default LoadingScreen;

// const styles = StyleSheet.create ({

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

// })