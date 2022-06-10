import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { selectUID } from '../store/selectors';
import { getDatabase, ref, onValue, child, set, get, off } from 'firebase/database';
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

  async function getRoom() {

    const dbRef = ref(getDatabase());
    try {

      const getRooms = await get(child(dbRef, `rooms`))
      return getRooms

    } catch (error) {
      console.log(error)
    }
  }
  function checkSearchRoom(room, search) {
    return room.title.toLowerCase().includes(search.toLowerCase()) || room.owner.toLowerCase().includes(search.toLowerCase())
  }
  useEffect(() => {
    //GetRoom
    (async () => {
      const getRooms = await getRoom();
      for (const key in getRooms.val()) {
        //console.log(key)
        const newRoom = new Room(key, getRooms.val()[key].title, getRooms.val()[key].owner, getRooms.val()[key].size, getRooms.val()[key].lock, getRooms.val()[key].password)
        //console.log(newRoom)

        setRooms(curRoom => [...curRoom, newRoom])
        if (searchText === '') {
          setfilteredRoom(curRoom => [...curRoom, newRoom])
        } else {
          setfilteredRoom(curRoom => {
            if (checkSearchRoom(newRoom, searchText)) {
              return [...curRoom, newRoom]
            } else {
              return [...curRoom]
            }
          })
        }
      }

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
  return <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
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
    backgroundColor: "black", flex: 1, margin: 10
  }
});
