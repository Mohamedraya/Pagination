import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, ActivityIndicator } from 'react-native';
import { getUsers } from './src/service/getUsers';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];




const App = () => {

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

    initialFunction();
  }, []);

  const initialFunction = async () => {
    setLoading(true);
    let users = await getUsers(currentPage);
    setUsers(users);
    console.log(users);
    setLoading(false);
  }

  const fetchMore = async () => {

    if(loading) return;

    setLoading(true);
    const nextPage = currentPage + 1;
    let usersList = await getUsers(nextPage);
    setUsers([...users, ...usersList]);
    setCurrentPage(nextPage);
    setLoading(false);
  }

  const UserCard = ({ user }: any) => (
    <View style={styles.cardContainer}>
       <Image source={{uri: user.picture.large}} style={styles.userImage}/>
       <Text style={styles.userName}>{`${user.name.title} ${user.name.first} ${user.name.last}`}</Text>
       <Text style={styles.userInfo}>{`Gender: ${user.gender}`}</Text>
       <Text style={styles.userInfo}>{`Location: ${user.location.city}, ${user.location.state} `}</Text>
       <Text style={styles.userInfo}>{`Email: ${user.email}`}</Text>
       <Text style={styles.userInfo}>{`Date of Birth: ${user.dob.date.substring(0 , 10)}`}</Text>
       <Text style={styles.userInfo}>{`Phone: ${user.phone}`}</Text>
       <Text style={styles.userInfo}>{`cell: ${user.cell}`}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={users} renderItem={({ item }) => <UserCard user={item} />} keyExtractor={item => item.phone}
                onEndReachedThreshold={0.5} onEndReached={fetchMore}
                ListFooterComponent={() => (loading ? <ActivityIndicator size={"large"} color={"blue"} style={{marginTop:20}}/>: null)}/>
    </SafeAreaView>
  );
};
//keyExtractor={item => Math.random().toString(36).substring(2)}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
 
  cardContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      margin: 10,
      shadowColor: "black",
      shadowOffset: {width: 0, height:2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3
  },

  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center"
  },

  userName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10
  },

  userInfo: {
    fontSize: 16,
    marginBottom: 5
  }
});

export default App;