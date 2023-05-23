import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity, Pressable, Modal } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

const articles = [
  {
    id: 1,
    imageSource: require('./assets/news.png'),
    title: 'Sustainable Habits for a Greener Future',
    description: 'Discover the power of small changes in creating a sustainable future.',
  },
  {
    id: 2,
    imageSource: require('./assets/recycle.jpg'),
    title: 'The Importance of Recycling: Protecting Our Planet',
    description: 'Explore the significance of recycling and its role in protecting the environment.',
  },
  {
    id: 3,
    imageSource: require('./assets/reduce.jpg'),
    title: 'Top Tips for Reducing Waste',
    description: 'Learn how to reduce waste and make a positive impact on the environment.',
    content: "Reducing waste is an essential step towards creating a sustainable future. By adopting eco-friendly habits and making conscious choices, we can significantly minimize our impact on the environment. In this article, we will explore the top 10 tips for reducing waste in our daily lives. Let's dive in and discover how small changes can make a big difference.*Embrace the 3 Rs: Reduce, Reuse, Recycle:*The three Rs form the foundation of waste reduction. Start by reducing your consumption and only buying what you truly need. Reuse items whenever possible instead of opting for single-use products. Lastly, recycle materials that can be processed into new products, ensuring they don't end up in landfills. *Say No to Single-Use Plastics:*Plastics, especially single-use items like bags, bottles, and straws, contribute significantly to waste pollution. Opt for reusable alternatives such as cloth bags, stainless steel water bottles, and bamboo or metal straws. These simple switches help reduce plastic waste and protect our oceans and wildlife.*Compost Organic Waste:*Instead of throwing away food scraps and other organic waste, consider composting. Composting allows the natural breakdown of organic materials, turning them into nutrient-rich soil. You can use this compost in your garden, reducing the need for chemical fertilizers and closing the organic waste loop.*Choose Sustainable Packaging:*Be mindful of the packaging when purchasing products. Opt for items with minimal packaging or those packaged in eco-friendly materials like recycled paper or cardboard. By choosing sustainable packaging, you can reduce the amount of waste generated from product packaging.*Bring Your Own Reusable Containers:  *When buying groceries or takeout meals, bring your own reusable containers. This practice helps eliminate the need for disposable packaging and reduces waste from food containers and plastic bags. Many stores and restaurants now support this eco-friendly initiative."
  },
  {
    id: 4,
    imageSource: require('./assets/compost.jpg'),
    title: 'The Benefits of Composting: Turning Waste into Nutrient-Rich Soil',
    description: 'Discover the advantages of composting and how it contributes to a more sustainable ecosystem.',
  },
];

const ArticleCard = ({ imageSource, title, description, onPress }) => {
  const handlePress = () => {
    onPress();
  };
  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <Image style={styles.articleImg} source={imageSource} />
      <Text style={styles.heading3}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </Pressable>
  );
};

function Hub() {
  const navigation = useNavigation();
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openArticleModal = (article) => {
    setSelectedArticle(article);
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
  };

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
              onPress={() => openArticleModal(article)}
            />
          ))}
        </ScrollView>

        <Modal visible={selectedArticle !== null} animationType="slide">
          <TouchableOpacity style={styles.close} onPress={closeArticleModal}>
              <Text>Close</Text>
          </TouchableOpacity>
          <View style={styles.modalContainer}>
            {selectedArticle && 
              <>
                <Image style={styles.modalImage} source={selectedArticle.imageSource} />
                <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
                <Text style={styles.modalDescription}>{selectedArticle.description}</Text>
                {Body(selectedArticle.content)}
              </>
            }
          </View>
        </Modal>

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

const Body = (content) => {
  const contentList = content.split('*').filter(item => item.trim() !== '');
  return (
    <>
      {contentList.map((item) => (
        <Text style={styles.content}>
          {item}
        </Text>
      ))}
    </>
  )
}

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
  modalContainer: {
    paddingHorizontal: 20,
    paddingTop: 120
  },
  modalImage: {
    width: '100%',
    height: 240,
    marginBottom: 10
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 600,
    paddingVertical: 10
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10
  },
  content: {
    marginVertical: 10
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 60,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#F3F6F5',
    zIndex: 10
  },
});