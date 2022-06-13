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
import LoadingOverlay from '../components/ui/LoadingOverlay';

function HomeScreen() {

  const [rooms, setRooms] = useState([])
  const [randomRoom, setRandomRoom] = useState([])
  const [filteredRoom, setfilteredRoom] = useState([])
  const [reload, setReload] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)
  function checkSearchRoom(room, search) {
    return room.title.toLowerCase().includes(search.toLowerCase()) || room.owner.toLowerCase().includes(search.toLowerCase())
  }
  useEffect(() => {
    //GetRoom //How to get order
    //TODO fix setSTate
    (async () => {
      const dbRef = getDatabase();
      const myQuery = query(ref(dbRef, 'rooms'), orderByChild('sizePlayer'), startAt(1))
      get(myQuery).then(snapshot => {
        snapshot.forEach(getRoom => {
          const room = new Room(getRoom.key, getRoom.val().title, getRoom.val().owner, getRoom.val().sizePlayer, getRoom.val().lock, getRoom.val().password)
          if (room.sizePlayer < 16) {
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
  // Nhớ đưa mảng vào trong get, rồi mới setState, k đc setState trong forEach của snapshot
  async function getRooms() {
    const db = getDatabase();
    const myQuery = query(ref(db, 'rooms'), orderByChild('sizePlayer'), startAt(1))
    const myRooms = []
    get(myQuery).then(snapshot => {
      snapshot.forEach(getRoom => {
        const room = new Room(getRoom.key, getRoom.val().title, getRoom.val().owner, getRoom.val().sizePlayer, getRoom.val().lock, getRoom.val().password)
        if (room.sizePlayer < 16) {
          myRooms.unshift(room)
        }
      })
      setRooms(myRooms)
    })
  }

  useEffect(() => {
    (async () => {
      if (isLoading) {
        await getRooms()
        setIsLoading(false)
      } else {
        const dbRef = ref(getDatabase())
        console.log(rooms.length)
        for (let i = 0; i < rooms.length; i++) {
          const data = await get(child(dbRef, `rooms/${rooms[i].id}`));
          if (data.exists()) {
            if (data.val().sizePlayer < 16) {
              console.log(rooms[i].id)
              setIsLoading(false)
              break
            }
          }
        }
      }
    })()

  }, [isLoading, rooms])

  function handleJoinRandom() {
    setRooms([])
    setIsLoading(true)
  }
  if (isLoading) {
    return <LoadingOverlay message="Tìm room..." />
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
