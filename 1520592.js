import React,{Component} from 'react';
import {View, Button, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default class Apps extends Component {
  constructor() {
  super();
  this.state = {
    array:[],
    
    // Score entered by user with comma
    score: '',
    eachTotal:0,
    total: 0,
    sampleSize: 0,
    geometricMean: 0,
    IndividualScore: 0,
   
  };
}

  calculateGeometricMean = () => { 
      this.setState({array:this.state.score.split(",")},()=> {
        
        this.setState({sampleSize:this.state.array.length})
  
        for(var i = 0; i < this.state.array.length; i++){
          const IndividualScore = this.state.array[i];
          this.setState({total:Number(this.state.total += (1/IndividualScore)).toFixed(2)})
 
        }
        // this.setState({geometricMean: Number ((this.state.sampleSize) / (this.state.total)).toFixed(2)})
      }

      // this.setState({geometricMean: Number ((this.state.sampleSize) / (this.state.total)).toFixed(2)})
    )
    this.setState({geometricMean: Number ((this.state.sampleSize) / (this.state.total)).toFixed(2)})
    
    
  };
  

  render() {
    return (
      <View style= {styles.container}>
      <Text style= {styles.title}>Harmonic Mean Calculator</Text>
      {/* Individual Score*/}
      <TextInput style = {styles.input} onChangeText = {(score) =>
      this.setState({score}) }
      underlineColorAndroid ="transparent"
      placeholder = "Enter score with comma(,)" />
      
      {/* Calculate */}
      <TouchableOpacity style = {styles.calculateButton} 
      onPress={this.calculateGeometricMean}>
      <Text style = {styles.calculateButtonText}> Calculate </Text>
      </TouchableOpacity>

      {/* Result */}      
      <Text style= {styles.result}>Sample Size: {this.state.sampleSize}</Text>
      <Text style= {styles.result}>Total:{this.state.total} </Text>
      <Text style= {styles.result}>Harmonic Mean :{this.state.geometricMean} </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create ({

  container: {
    paddingTop: 100
  },

  title: {
    textAlign: 'center',
     alignItems: 'center',
     fontWeight: 'bold',
     color: 'blue'
  },

  input: {
    alignItems: 'center',
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    textAlign: 'center',
  },

  calculateButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 15,
    height: 40
  },

  calculateButtonText: {
    alignItems:'center',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  
  result: {
    left: 100,
    
  }
})