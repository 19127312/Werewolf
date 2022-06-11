import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { selectUID } from '../store/selectors';
import { getDatabase, ref, startAt, onValue, child, set, get, off, query, orderByChild } from 'firebase/database';
import { Room } from '../model/room'
import RoomItem from '../components/Room/RoomItem';
import SearchInput from '../components/ui/SearchInput';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../components/ui/IconButton';
import { Colors } from '../constants/styles'
import Button from '../components/ui/Button'

function HomeScreen() {

  const [rooms, setRooms] = useState([])
  const [filteredRoom, setfilteredRoom] = useState([])
  const [reload, setReload] = useState(false)
  const [searchText, setSearchText] = useState('')


  function checkSearchRoom(room, search) {
    return room.title.toLowerCase().includes(search.toLowerCase()) || room.owner.toLowerCase().includes(search.toLowerCase())
  }
  useEffect(() => {
    //GetRoom //How to get order
    (async () => {
      const dbRef = getDatabase();
      const myQuery = query(ref(dbRef, 'rooms'), orderByChild('sizePlayer'), startAt(1))
      get(myQuery).then(snapshot => {
        snapshot.forEach(getRoom => {
          const room = new Room(getRoom.key, getRoom.val().title, getRoom.val().owner, getRoom.val().sizePlayer, getRoom.val().lock, getRoom.val().password)
          setRooms(curRoom => [room, ...curRoom])

          if (searchText === '') {
            setfilteredRoom(curRoom => [room, ...curRoom])
          } else {
            setfilteredRoom(curRoom => {
              if (checkSearchRoom(room, searchText)) {
                return [room, ...curRoom]
              } else {
                return [...curRoom]
              }
            })
          }
        })
      })





    })();
    return () => {

    }
  }, [reload])

  function onSearch(text) {
    if (text) {
      setfilteredRoom(rooms.filter(room => checkSearchRoom(room, text)))
    } else {
      setfilteredRoom(rooms)
    }
    setSearchText(text)

  }
  function renderRoom({ item }) {
    //console.log(item)
    return <RoomItem {...item} />
  }
  function onPressReload() {
    setRooms([])
    setfilteredRoom([])
    setReload(!reload)
  }
  function handleCreateRoom() {

  }
  function handleJoinRandom() {

  }
  return <SafeAreaView style={{ flex: 1, backgroundColor: "white", marginTop: 30 }}>
    <View style={styles.list}>
      <View style={styles.itemContainer}>

        <View style={{ flex: 1 }}>
          <SearchInput value={searchText} onChange={onSearch} />
        </View>

        <View style={{ paddingBottom: 8 }}>
          <IconButton icon="reload-circle-sharp" size={25} color={Colors.primary100} onPress={onPressReload} />
        </View>

      </View>
      <View style={styles.itemContainer}>
        <Button buttonStyle={styles.buttonItem} title="Tạo phòng" onPress={handleCreateRoom} />
        <Button buttonStyle={styles.buttonItem} title="Vào ngẫu nhiên" onPress={handleJoinRandom} />
      </View>
      <FlatList data={filteredRoom} keyExtractor={(item, index) => item.id} renderItem={renderRoom} />
    </View>
  </SafeAreaView>


}

export default HomeScreen;

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }, buttonItem: {
    backgroundColor: "#1d3557", flex: 1, margin: 10
  }
});
