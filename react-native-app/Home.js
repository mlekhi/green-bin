import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity, Pressable, Modal } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

const ProgressBar = () => {
  const color = '#216D60'; // Hard-coded color of the progress bar

  return (
    <View style={[styles.bar]}>
      <View style={[styles.progressBar, { backgroundColor: color }]} />
    </View>
  );
};

function Home() {
  const navigation = useNavigation();
  const [landfillVisible, setLandfillVisible] = useState(false);
  const [recyclingVisible, setRecyclingVisible] = useState(false);
  const [greenVisible, setGreenVisible] = useState(false);

  const toggleLandfill = () => {
    setLandfillVisible(!landfillVisible);
  };

  const toggleRecycling = () => {
    setRecyclingVisible(!recyclingVisible);
  };

  const toggleGreen = () => {
    setGreenVisible(!greenVisible);
  };

  return (
      <View style={styles.container}>

        <View style={styles.topSection}>
          <Text style={styles.heading1}>Welcome back, John.</Text> 
          <View style={styles.card}>
            <Text style={styles.heading2}>Eco-Points: 700/1000</Text>  
            <ProgressBar />
            <Text>300 points until your next reward!</Text>  
          </View> 
        </View>

        <View style={styles.mainSection}>
          <Text style={styles.heading2}>Sorting Waste</Text>
          <TouchableOpacity style={styles.sortCard} onPress={toggleLandfill}>
            <Image style={styles.pic} source={require('./assets/landfill.png')} />
            <Text style={styles.type}>Landfill</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortCard} onPress={toggleRecycling}>
            <Image style={styles.pic} source={require('./assets/recycling.png')} />
            <Text style={styles.type}>Recycling</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortCard} onPress={toggleGreen}>
            <Image style={styles.pic} source={require('./assets/greenbin.png')} />
            <Text style={styles.type}>Green Bin</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={landfillVisible} animationType="slide">
          <Sort
            title="Landfill"
            content="Non-recyclable plastics: Plastic bags, wrappers, packaging materials, and non-recyclable plastics marked with resin codes that are not accepted in recycling.
            Non-recyclable paper products: Soiled or contaminated paper, wax-coated paper, used tissues, napkins, and paper plates.
            Non-recyclable glass: Broken glass, ceramics, and mirrors.
            Non-recyclable metals: Dirty or contaminated metals, such as metal utensils or metallic materials not suitable for recycling.
            Non-recyclable textiles: Torn or heavily soiled fabrics, clothing, and linens that cannot be donated or repurposed.
            Non-recyclable organic waste: Food waste, pet waste, and other organic materials that are not suitable for composting.
            Hazardous materials: Chemicals, paints, batteries, electronics, and other hazardous household waste."
          />
          <TouchableOpacity style={styles.close} onPress={toggleLandfill}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Modal>

        <Modal visible={recyclingVisible} animationType="slide">
          <Sort
            title="Recycling"
            content="Paper: Clean and dry paper products such as newspapers, magazines, office paper, cardboard, and paperboard.
            Plastic: Recyclable plastic containers, bottles, and packaging materials marked with the appropriate resin codes, such as PET or HDPE.
            Glass: Clear, green, and brown glass bottles and jars.
            Metal: Aluminum cans, steel cans, tin cans, and clean metal containers.
            Electronics: Electronic waste, including computers, laptops, mobile phones, and other electronic devices.
            Batteries: Rechargeable batteries and single-use batteries, which require special recycling procedures.
            Textiles: Clean and undamaged textiles and clothing that can be recycled or donated."
          />
          <TouchableOpacity style={styles.close} onPress={toggleRecycling}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Modal>

        <Modal visible={greenVisible} animationType="slide">
          <Sort
            title="Green Bin"
            content="Fruit and vegetable scraps: Peels, cores, and leftovers from fruits and vegetables.
            Coffee grounds and tea bags: Used coffee grounds, tea bags, and loose tea leaves.
            Yard waste: Leaves, grass clippings, branches, plants, and small twigs.
            Food waste: Plate scrapings, expired food, bread, pasta, rice, and other cooked or uncooked food items.
            Paper products: Uncoated paper plates, napkins, and tissues that are free from chemicals or contaminants.
            Compostable materials: Compostable utensils, plates, and containers made from plant-based materials.
            Eggshells: Cleaned eggshells can be included in the green bin for composting."
          />
          <TouchableOpacity style={styles.close} onPress={toggleGreen}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Modal>


        <StatusBar style="auto"></StatusBar>

        <View style={styles.nav}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Image style={styles.iconCurrent} source={require('./assets/home.png')}/>
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
            <Image style={styles.icon} source={require('./assets/profile.png')}/>
          </Pressable>
        </View>
      </View>
  );
}

export default Home;

function Sort({title, content }) {
  const contentList = content.split('\n').filter(item => item.trim() !== '');
  return (
    <View style={styles.modal}>
      <Text style={styles.title}>{title}</Text>  
      {contentList.map((item, index) => (
        <Text key={index} style={styles.content}>
          {`${index + 1}. ${item}`}
        </Text>
      ))}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6F5',
  },
  modal: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 85,
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 70,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#F3F6F5'
  },
  content: {
    fontSize: 16,
    marginTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 30
  },
  topSection: {
    backgroundColor: '#216D60',
    paddingTop: 80,
    padding: 20,
    marginBottom: 10
  },
  mainSection: {
    padding: 20
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderColor: '#D9E4E0',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20
  },
  sortCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderColor: '#D9E4E0',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
    
  },
  pic: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 16
  },
  type: {
    fontSize: 16,
    fontWeight: 500,
  },
  heading1: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 600
  },
  heading2: {
    fontSize: 20,
    fontWeight: 500
  },
  heading3: {
    fontSize: 16,
    fontWeight: 700
  },
  body: {
    fontSize: 16,
    fontWeight: 400
  },
  bar: {
    marginVertical: 20,
    width: '100%',
    height: 25,
    backgroundColor: '#D9E4E0'
  },
  progressBar: {
    width: '70%',
    height: 25,
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