import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import React, { useState, useEffect } from 'react';
import {Button, StyleSheet, Text,Dimensions, View,Platform} from 'react-native';
import {Video} from 'expo-av'
import * as ImagePicker from 'expo-image-picker'; 

//default supports both 

const {width,height} = Dimensions.get('window');

//import React from 'react';
//
  //<StatusBar style="dark" />
//import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const ButtonText = "Upload Video";
  const [video, setVideo] = useState();
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
   
    });
    console.log(result);
    
    //sets the video 
    if (!result.cancelled) {
      setVideo(result.uri);
      
    }
  };
    return (
     
   <View style={styles.container}>
     <Video
      
    source={{uri:video}}  
    rate={1.0}
    volume={1.0}
    isMuted={false}
    resizeMode="cover"
    shouldPlay={false}
    isLooping={false}
    useNativeControls={true}
    style={styles.video}
/>

     <Button title="Upload Video" onPress={pickVideo} />
     {video && <Video source={{ uri: video }}  />}
    
        </View>
    
    );
  }

const styles = StyleSheet.create({
  video:{
width:width,
height:height/2,

},

   container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  

});
