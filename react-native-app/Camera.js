import { Camera } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';

export default function CameraScreen() {

  const cameraRef = useRef(null);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status);
    })();
  }, []);

  if (permission === null) {
    return <View />;
  }

  if (permission !== 'granted') {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraType() {
    setType((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  function captureImage() {
    if(cameraRef.current) {
      cameraRef.current.takePictureAsync({ onPictureSaved: savePic })
      }
    }
  
  async function savePic(photo) {
    const imageUri = photo.uri;
    processImage(imageUri);
  }
  
  async function processImage(imageUri) {
    const formData = new FormData()
    formData.append('image', {
      uri: imageUri,
      name: 'capturedImage.jpg',
      type: 'image/jpeg',
    });
    try {
      const response = await axios.post('http://127.0.0.1:8000/process_image/', formData);
      const responseData = response.data;
      if (responseData && responseData.message) {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  }  

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Image style={styles.flip} source={require('./assets/flip-camera.png')}/>
          </TouchableOpacity>
        </View>
        <Image style={styles.frame} source={require('./assets/frame.png')}/>
        <View style = {styles.captureContainer}>
          <TouchableOpacity style={styles.capture} onPress={captureImage}>
            <Image style={styles.flip} source={require('./assets/whitecircle.png')}/>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading1}>Scan your item to identify where it belongs</Text>
      </Camera>
      <View style={styles.nav}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image style={styles.icon} source={require('./assets/home.png')}/>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Hub')}>
          <Image style={styles.icon} source={require('./assets/light.png')}/>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Camera')}>
          <Image style={styles.iconCurrent} source={require('./assets/camera.png')}/>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Contact')}>
          <Image style={styles.icon} source={require('./assets/feedback.png')}/>
        </Pressable>
        < Pressable onPress={() => navigation.navigate('User')}>
          <Image style={styles.icon} source={require('./assets/profile.png')}/>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  heading1: {
    fontSize: 16,
    fontWeight: 500,
    color: '#fff',
    position: 'absolute',
    bottom: 120,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,100,20,0.7)',
    padding: 20,
    borderRadius: 8,
  },
  camera: {
    flex: 1,
  },
  capture: {
    borderRadius: 4,
    alignItems: 'center',
    margin: 0,
  },
  captureContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 70,
    height: 50,
  },
  capture: {
    width: 36,
    resizeMode: 'contain'
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 4,
    alignItems: 'center',
  },
  flip: {
    width: 36,
    resizeMode: 'contain'
  },
  frame: {
    position: 'absolute',
    alignSelf: 'center',
    top: '12%',
    width: '80%',
    resizeMode: 'contain'
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  nav: {
    position: 'absolute',
    bottom:0,
    flex: 1,
    width: '100%',
    height: 100,
    paddingHorizontal: 8,
    paddingTop: 16,
    backgroundColor: '#F3F6F5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: '#D9E4E0',
    borderTopWidth: 1,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    opacity: 0.25,
  },
  iconCurrent: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
});
