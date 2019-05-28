import React from 'react';
import { ActivityIndicator, ScrollView, Button, Clipboard, Image, Share, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import firebase from 'firebase';

export default class ImagePickerScreen extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

  render() {
    return (
      <ScrollView> 
      <View style={{ position: 'absolute', top: 0, left: 190, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <TouchableOpacity onPress = {() => this.props.navigation.navigate('DashboardScreen')}>
          <Image source = { require('./icon.png')} 
                 style= {styles.icon}/>
      
          <Text style = {styles.title}>Add Task!</Text> 
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>firebase.auth().signOut()}>
          <Image source = { require('./SignOut.png')}
                  style= {styles.signout} />
          <Text style= {styles.signoutText}> Sign Out </Text>
          </TouchableOpacity>

        {this._maybeRenderControls()}
        {this._maybeRenderUploadingIndicator()}
        {this._maybeRenderImage()}

        <StatusBar barStyle="default" />
      </View>
      </ScrollView>
    );
  }

  _maybeRenderUploadingIndicator = () => {
    if (this.state.uploading) {
      return <ActivityIndicator animating size="large" />;
    }
  };

  _maybeRenderControls = () => {
    if (!this.state.uploading) {
      return (
        <View>
            <View style={{ 
              // marginVertical: 8
              position: 'absolute',
              top: 100,
              left: -75,
            }}>

            <Button
              onPress={this._pickImage}
              title="Select from Gallery"
            />

        {/* <TouchableOpacity  
          style={styles.taskButton}
          onPress={this._pickImage}>
        <Text style={styles.task}> Select from Gallery </Text>
        </TouchableOpacity>  */}

          </View>
          <View style={{ 
            // marginVertical: 8 
          position: 'absolute',
          top: 125,
          left: -67,
          }}>

          <Button
              onPress={this._takePhoto}
              title="Take a photo"
            />

      {/* <TouchableOpacity  
          style={styles.taskButton}
          onPress={this._takePhoto}>
        <Text style={styles.task}> Take a Photo </Text>
        </TouchableOpacity>  */}

          </View>
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    if (this.state.image) {
      return (
        <View
          style={{
            // marginTop: 30,
            top:200,
            width: 100,
            borderRadius: 3,
            elevation: 2,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
          }}>
          <View
            style={{
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
              overflow: 'hidden',
            }}>
            <Image source={{ uri: this.state.image }} style={{ width: 100, height: 100 }} />
          </View>

          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
            {this.state.image}
          </Text>
        </View>
      );
    }
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _askPermission = async (type, failureMessage) => {
    const { status, permissions } = await Permissions.askAsync(type);

    if (status === 'denied') {
      alert(failureMessage);
    }
  };

  _takePhoto = async () => {
    await this._askPermission(Permissions.CAMERA, 'We need the camera permission to take a picture...');
    await this._askPermission(Permissions.CAMERA_ROLL, 'We need the camera-roll permission to read pictures from your phone...');
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    await this._askPermission(Permissions.CAMERA_ROLL, 'We need the camera-roll permission to read pictures from your phone...');
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({ image: uploadResult.location });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}

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
    right: 75,
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
    height: '30%',
    marginTop: 15,
    backgroundColor: '#33AFFF',
  },

})
