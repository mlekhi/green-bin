import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function User() {
  const navigation = useNavigation();

  return(
    <View style={styles.container}>
        <View style={styles.mainSection}>
          <View style={styles.card}>
            <View style={styles.profile}>
              <Image style={styles.pfp} source={require('./assets/pfp.png')}/>
              <View>
                <Text style={styles.heading2}>John Doe</Text>
                <Text style={styles.heading3}>Points: 700/1000</Text>
              </View>
            </View>
        </View>
          <View style={styles.card}>
            <Text style={[styles.heading2, styles.center]}>Profile</Text>
            <Text style={styles.heading3}>Email:</Text>
            <Text style={styles.body}>john@doe.com</Text>
            <Text style={styles.heading3}>Phone Number:</Text>
            <Text style={styles.body}>(123) 456-7890</Text>
            <Text style={styles.heading3}>Residence:</Text>
            <Text style={styles.body}>Ontario Hall</Text>
            <Text style={styles.heading3}>Language:</Text>
            <Text style={styles.body}>English</Text>
            <Pressable style={styles.button}>
                <Text>Edit Profile</Text>
            </Pressable>
          </View>
        </View>

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
            <Image style={styles.icon} source={require('./assets/feedback.png')}/>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('User')}>
            <Image style={styles.iconCurrent} source={require('./assets/profile.png')}/>
          </Pressable>
        </View>
      </View>
  )
}

export default User


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6F5',
  },
  profile: {
    display: 'flex'
  },
  mainSection: {
    paddingHorizontal: 20,
    paddingTop: 60
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  pfp: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 16
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderColor: '#D9E4E0',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20
  },
  heading1: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 600
  },
  heading2: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 4
  },
  heading3: {
    fontSize: 16,
    fontWeight: 700,
    opacity: 0.4,
    marginTop: 6
  },
  center: {
    textAlign: 'center'
  },
  body: {
    fontSize: 16,
    fontWeight: 400,
    marginTop: 4,
    marginBottom: 12
  },
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
    backgroundColor: '#F3F6F5',
    borderRadius: 4,
    marginTop: 20
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