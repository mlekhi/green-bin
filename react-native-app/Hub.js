import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const articles = [
  {
    id: 1,
    imageSource: require('./assets/news.png'),
    title: 'Sustainable Habits for a Greener Future',
    description: 'Discover the power of small changes in creating a sustainable future.',
  },
  {
    id: 2,
    imageSource: require('./assets/reduce.jpg'),
    title: 'Top Tips for Reducing Waste',
    description: 'Learn how to reduce waste and make a positive impact on the environment.',
  },
  {
    id: 3,
    imageSource: require('./assets/recycle.jpg'),
    title: 'The Importance of Recycling: Protecting Our Planet',
    description: 'Explore the significance of recycling and its role in protecting the environment.',
  },
  {
    id: 4,
    imageSource: require('./assets/compost.jpg'),
    title: 'The Benefits of Composting: Turning Waste into Nutrient-Rich Soil',
    description: 'Discover the advantages of composting and how it contributes to a more sustainable ecosystem.',
  },
];

const ArticleCard = ({ imageSource, title, description }) => {
  return (
    <Pressable style={styles.card}>
      <Image style={styles.articleImg} source={imageSource} />
      <Text style={styles.heading3}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </Pressable>
  );
};

function Hub() {
  const navigation = useNavigation();

  return(
    <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.heading1}>Info Hub</Text> 
          <View style={styles.quickLinks}>
            <Text style={[styles.heading4, styles.white]}>QUICK LINKS</Text>
            <Text style={[styles.heading3, styles.white]}>Eco-friendly Initiatives at Western</Text>
            <Text style={[styles.heading3, styles.white]}>Sustainability Resources Available to Students</Text>
            <Text style={[styles.heading3, styles.white]}>How to get involved</Text>
          </View> 
        </View>

        <ScrollView style={styles.mainSection}>
        <Text style={styles.heading2}>Articles</Text>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              imageSource={article.imageSource}
              title={article.title}
              description={article.description}
            />
          ))}
        </ScrollView>

        <StatusBar style="auto"></StatusBar>
        <View style={styles.nav}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Image style={styles.icon} source={require('./assets/home.png')}/>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Hub')}>
            <Image style={styles.iconCurrent} source={require('./assets/light.png')}/>
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
  )
}

export default Hub;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6F5',
  },
  topSection: {
    backgroundColor: '#216D60',
    paddingTop: 80,
    padding: 20
  },
  topSection2: {
    paddingTop: 80,
    padding: 20
  },
  mainSection: {
    paddingHorizontal: 20,
    paddingBottom: 40, 
    paddingTop: 20,
    marginBottom: 100
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderColor: '#D9E4E0',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20
  },
  quickLinks: {
    backgroundColor: '#236155',
    padding: 20,
    borderColor: '#D9E4E0',
    marginTop: 15,
    color: '#fff',
    borderRadius: 4
  },
  articleImg: {
    width: '100%',
    height: 150,
    marginBottom: 5
  },
  desc:{
    fontSize: 16,
    opacity: 0.5,
    marginTop: 10
  },
  white: {
    color: '#fff',
  },
  heading1: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 600
  },
  heading2: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 5
  },
  heading3: {
    fontSize: 16,
    fontWeight: 500,
    marginTop: 15,
  },
  heading4: {
    letterSpacing: 2,
    opacity: 0.7
  },
  body: {
    fontSize: 16,
    fontWeight: 400
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