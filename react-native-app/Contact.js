import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity, Pressable, Modal, TextInput } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

function Contact() {
  const navigation = useNavigation();
  const [report, setReport] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function toggleReport() {
    setReport(!report)
    setSubmitted(false)
  }

  function toggleFeedback() {
    setFeedback(!feedback)
    setSubmitted(false)
  }

  return(
    <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.heading2}>Contact Portal</Text> 
          <Text style={styles.body}>How can we help you?</Text> 
        </View>

        <View style={styles.mainSection}>
          <Pressable style={styles.card} onPress={toggleReport}>
            <Image style={styles.pic} source={require('./assets/report.png')} />
            <Text style={styles.label}>Report/Make a Request</Text>
          </Pressable>
          <Pressable style={styles.card} onPress={toggleFeedback}>
            <Image style={styles.pic} source={require('./assets/submit.png')} />
            <Text style={styles.label}>Submit Feedback</Text>
          </Pressable>
          <Pressable style={styles.card}>
            <Image style={styles.pic} source={require('./assets/help.png')} />
            <Text style={styles.label}>General Help</Text>
          </Pressable>
        </View>

        <Modal visible={report} animationType='slide'>
          <View style={styles.modal}>
            <Text style={styles.heading2}>Report/Make a Request</Text>  
            {!submitted?
            <View>
              <Text style={styles.desc}>Please include details about where the report/request should be fulfilled</Text>
              <TextInput numberOfLines={12} multiline editable style={styles.input} placeholder='ex. There is a missing green bin in Essex Hall Room 304' returnKeyType="done"/>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.submit}>
                  <Text style={[styles.heading2, styles.white]} onPress={() => setSubmitted(true)}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancel} onPress={toggleReport}>
                  <Text style={styles.heading2} >Cancel</Text>
                </TouchableOpacity>
              </View>
            </View> 
            
            :
            <View>
              <Text style={styles.desc}>Submitted!</Text>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.cancel} onPress={toggleReport}>
                  <Text style={styles.heading2} >Close</Text>
                </TouchableOpacity>
              </View>
            </View>
            }
          </View>
        </Modal>

        <Modal visible={feedback} animationType='slide'>
          <View style={styles.modal}>
            <Text style={styles.heading2}>Submit Feedback</Text>  
            {!submitted?
            <View>
              <Text style={styles.desc}>Let us know what you think about our app and sustainability services!</Text>
              <TextInput numberOfLines={12} multiline editable style={styles.input} placeholder='ex. I hope to see more...' returnKeyType="done"/>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.submit}>
                  <Text style={[styles.heading2, styles.white]} onPress={() => setSubmitted(true)}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancel} onPress={toggleFeedback}>
                  <Text style={styles.heading2} >Cancel</Text>
                </TouchableOpacity>
              </View>
            </View> 
            
            :
            <View>
              <Text style={styles.desc}>Submitted!</Text>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.cancel} onPress={toggleFeedback}>
                  <Text style={styles.heading2} >Close</Text>
                </TouchableOpacity>
              </View>
            </View>
            }
          </View>
        </Modal>

        <StatusBar style="auto"></StatusBar>
        <View style={styles.nav}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Image style={styles.icon} source={require('./assets/home.png')}/>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Hub')}>
            <Image style={styles.icon} source={require('./assets/light.png')}/>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Camera')}>
            <Image style={styles.icon} source={require('./assets/camera.png')}/>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Contact')}>
            <Image style={styles.iconCurrent} source={require('./assets/feedback.png')}/>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('User')}>
            <Image style={styles.icon} source={require('./assets/profile.png')}/>
          </Pressable>
        </View>
      </View>
  )
}

export default Contact

function Info({title, desc, placeholder, submitted }) {
  return (
    <View style={styles.modal}>
      <Text style={styles.heading2}>{title}</Text>  
      {submitted?
      <View>
        <Text style={styles.desc}>{desc}</Text>
        <TextInput numberOfLines={12} multiline editable style={styles.input} placeholder={placeholder} returnKeyType="done"/>
      </View> 
      :
      <View>
        <Text>Submitted!</Text>
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6F5',
  },
  topSection: {
    paddingTop: 80,
    padding: 20
  },
  mainSection: {
    padding: 20
  },
  pic: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 16
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderColor: '#D9E4E0',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
  },
  modal: {
    paddingHorizontal: 20,
    paddingTop: 85,
  },
  desc: {
    marginTop: 10
  },
  input: {
    borderColor:'#D9E4E0',
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    marginVertical: 30,
    fontSize: 16,
    height: 200,
  },
  buttons: {
    display: 'flex'
  },
  heading1: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 600
  },
  heading2: {
    fontSize: 20,
    fontWeight: 500
  },
  heading3: {
    fontSize: 16,
    fontWeight: 500
  },
  submit: {
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
    backgroundColor: '#216D60',
    borderRadius: 4
  },
  cancel: {
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
    backgroundColor: '#F3F6F5',
    borderRadius: 4,
    marginTop: 20
  },
  white: {
    color: '#fff'
  },
  body: {
    fontSize: 16,
    fontWeight: 400,
    marginTop: 10
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