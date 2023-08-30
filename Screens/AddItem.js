// import React, { Component,createRef } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   Alert,
//   Platform,
//   StatusBar,KeyboardAvoidingView
// } from 'react-native';
// import firebase from 'firebase';

// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import DropDownPicker from 'react-native-dropdown-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { RFValue } from 'react-native-responsive-fontsize';
// import db from '../config';
// import {
//   Feather,
//   MaterialCommunityIcons,
//   FontAwesome,
//   MaterialIcons,
// } from '@expo/vector-icons';

// import { v4 as uuidv4 } from 'uuid';
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//   }),
// });

//   async function registerForPushNotificationsAsync() {
//     let token;
//     if (Device.isDevice) {
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!');
//         return;
//       }
//       token = (await Notifications.getExpoPushTokenAsync()).data;
//       console.log(token);
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }
  
//     if (Platform.OS === 'android') {
//       Notifications.setNotificationChannelAsync('default', {
//         name: 'default',
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: '#FF231F7C',
//       });
//     }

// return token;
// }


// export default class AddItem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       emailId: firebase.auth().currentUser.email,
//       title: '',
//       category: '',
//       add: '',
//       deets: '',
//       userId: firebase.auth().currentUser.uid,
//       allItems: [],
//       mode: 'date',
//       show: false,
//       date: new Date(),
//       dropdownHeight: 55,
//       expoPushToken:'',
//       notification:'',
     
//     };
//     this.notificationListener=createRef();
//     this.responseListener=createRef();
        
//   }

//   sendPushNotification = async (expoPushToken) => 
//   {
//  const triggerTS = new Date(this.state.date);
//     console.log(triggerTS)

//  const trigger=new Date(triggerTS);
   
//      trigger.setHours(10);
//      trigger.setMinutes(0);
//      trigger.setSeconds(0);
//      console.log(trigger);
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: this.state.title + ' is getting expired today',
//         body: 'Check the Xminder App for details',
//       },
//      // channelId: channelId,
//        trigger,

//       // trigger: { hour: 16,minute:20,repeats:false },
//     });
//     alert("Notification!!")
//   };

//   componentDidMount() {
//     registerForPushNotificationsAsync().then(token => this.setState({expoPushToken:token}));
    
//     this.notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       this.setState({notification:notification});
//     });

//     this.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

   
//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }

   



   

//   addItemDetails = () => {
//     if (this.state.category === '' || this.state.date === '' || this.state.title === '') {
//       Alert.alert('One or more fields are incomplete!');
//     } else {
      
//      // this.schedulePushNotification(this.state.date);

//       db.collection('allItems')
//         .add({
//           userId: this.state.userId,
//           category: this.state.category,
//           date: this.state.date.toDateString(),
//           title: this.state.title,
//           deets: this.state.deets,
//           add: this.state.add,
//           email: this.state.emailId,
//         })
//         .then((docRef) => {
//           const itemId = docRef.id;
//           Alert.alert('Item Details Added');
//           this.props.navigation.navigate('UpcomingReminders');
//           this.setState({
//             category: '',
//             date: new Date(),
//             title: '',
//             deets: '',
//             add: '',
//             itemId,
//           });
//         })
//         .catch((error) => {
//           console.error('Error adding item: ', error);
//         });
//     }
//   };

//   render() {
//     let numOfLinesCompany = 0;
//     return (
//       <View style={{ flex: 1, backgroundColor: '#DEEFD2' }}>
//         <ImageBackground
//           style={{ flex: 1, justifyContent: 'center' }}
//           source={require('../assets/nscren.png')}
//         >
//           <SafeAreaView style={styles.droidSafeArea} />
//           <ScrollView style={{flex:1,marginBottom:100}}>
//             <LinearGradient
//               colors={[
//                 '#2D490F',
//                 '#EFFFE5',
//                 '#fff',
//                 '#fff',
//                 '#fff',
//                 '#EFFFE5',
//                 '#2D490F',
//               ]}
//               start={{ x: 0.01, y: 0.01 }}
//               end={{ x: 0.99, y: 0.99 }}
//               style={{
//                 marginTop: 5,
//                 marginBottom: 10,
//                 width: '85%',
//                 height: 55,
//                 borderColor: 'black',
//                 borderLeftWidth: 1,
//                 borderRightWidth: 1,
//                 borderBottomWidth: 1.5,
//                 alignSelf: 'center',
//                 padding: 10,
//                 borderRadius: 50,
//                 flexDirection: 'row',
//               }}
//             >
//               <TouchableOpacity
//                 style={{ alignSelf: 'flex-start' }}
//                 onPress={() => this.props.navigation.goBack()}
//               >
//                 <Feather name={'arrow-left'} size={30} color="#10341c" />
//               </TouchableOpacity>
//               <Text
//                 style={{
//                   marginLeft: '25%',
//                   color: '#002E35',
//                   fontWeight: 'bold',
//                   fontSize: 20,
//                 }}
//               >
//                 Add Items
//               </Text>
//             </LinearGradient>
//             <KeyboardAvoidingView behavior="padding" style={{flex:1}}>

//             <Image
//               source={require('../assets/ais.png')}
//               style={{
//                 width: '50%',
//                 height: 150,
//                 alignSelf: 'center',
//                 marginTop: 10,
//               }}
//             />

//             <View style={styles.textinputs}>
//               <MaterialCommunityIcons
//                 name={'format-title'}
//                 size={20}
//                 color="#175831"
//                 style={styles.icon}
//               />
//               <TextInput
//                 style={styles.textinput}
//                 placeholder="Title"
//                 onChangeText={(val) => {
//                   this.setState({ title: val });
//                 }}
//                 value={this.state.title}
//               />
//             </View>
//             <View style={styles.textinputs}>
//               <FontAwesome
//                 name={'calendar'}
//                 size={20}
//                 color={'#175831'}
//                 style={styles.icon}
//                 onPress={() => {
//                   this.setState({ show: true });
//                 }}
//               />

//               <Text
//                 style={{
//                   color: '#10341C',
//                   fontSize: 15,
//                   fontWeight: 'bold',
//                   flex: 1,
//                 }}
//               >
//                 {this.state.date.toDateString()}
//               </Text>

//               <FontAwesome
//                 name={'calendar'}
//                 size={20}
//                 color={'#175831'}
//                 style={[
//                   styles.icon,
//                   {
//                     borderLeftWidth: 0,
//                     borderRightWidth: 0,
//                     alignSelf: 'flex-end',
//                   },
//                 ]}
//                 onPress={() => {
//                   this.setState({ show: true });
//                 }}
//               />
//               {this.state.show && (
//                 <DateTimePicker
//                   testID="dateTimePicker"
//                   value={this.state.date}
//                   mode={this.state.mode}
//                   display="default"
//                   minimumDate={new Date()}
//                   onChange={(event, date) => {
//                     if (this.state.mode === 'date') {
//                       var pickedDate = new Date(date);
//                       this.setState({
//                         date: pickedDate,
//                         show: false,
//                       });
//                     }
//                   }}
//                 />
//               )}
//             </View>
//           <View style={[styles.textinputs,{ height: this.state.dropdownHeight}]}>
//               <MaterialIcons
//                 name={'category'}
//                 size={20}
//                 color={'#175831'}
//                 style={styles.icon}
//               />
//               <View style={{ flex: 1, height: this.state.dropdownHeight }}>
//                 <DropDownPicker
//                   items={[
//                     { label: 'Food', value: 'Food' },
//                     { label: 'Medicines', value: 'Medicine' },
//                     { label: 'Documents', value: 'Document' },
//                     { label: 'Others', value: 'Other' },
//                   ]}
//                   onOpen={() => {
//                     this.setState({ dropdownHeight: 170 });
//                   }}
//                   onClose={() => {
//                     this.setState({ dropdownHeight: 55 });
//                   }}
//                   defaultIndex={0}
//                   containerStyle={{ height: 40 }}
//                   onChangeItem={(val) => {
//                     this.setState({ category: val.value });
//                   }}
//                   value={this.state.category}
//                 />
//               </View>
//             </View>

//             <View style={styles.textinputs}>
//               <MaterialIcons
//                 name={'note-add'}
//                 size={20}
//                 color={'#175831'}
//                 style={styles.icon}
//               />

//               <TextInput
//                 style={styles.textinput}
//                 placeholder=" Additional Remarks"
//                 onChangeText={(val) => {
//                   this.setState({ add: val });
//                 }}
//                 value={this.state.add}
//                 multiline={true}
//                 numberOfLines={numOfLinesCompany}
//                 onContentSizeChange={(e) => {
//                   numOfLinesCompany = e.nativeEvent.contentSize.height / 18;
//                 }}
//               />
//             </View>
//             <View style={styles.textinputs}>
//               <FontAwesome
//                 name={'address-book'}
//                 size={20}
//                 color={'#175831'}
//                 style={styles.icon}
//               />

//               <TextInput
//                 style={styles.textinput}
//                 placeholder="Contact Details"
//                 keyboardType="phone-pad"
//                 onChangeText={(val) => {
//                   this.setState({ deets: val });
//                 }}
//                 value={this.state.deets}
//               />
//             </View>

//             <TouchableOpacity
//               style={styles.loginButton}
//               onPress={() => this.addItemDetails()}
//             >
//               <Text style={styles.loginButtonText}> Add Item → </Text>
//             </TouchableOpacity>

//               <TouchableOpacity onPress={() => {
//                  this.sendPushNotification(this.state.expoPushToken)
//             }}
//                 style={{ alignSelf: 'center',marginTop:10 }}>
//                 <Text style={{fontWeight:'bold'}}>
//                     Need to be notified? Click here.
//                 </Text>
              
//             </TouchableOpacity>
//             </KeyboardAvoidingView>
//           </ScrollView>
//         </ImageBackground>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   loginButtonText: {
//     color: '#4a632f',
//     fontWeight: 'bold',
//     fontSize: 20,
//     justifyContent: 'center',
//   },
//   loginButton: {
//     backgroundColor: '#f0c51e',
//     borderRadius: 10,
//     marginTop: 10,
//     width: '65%',
//     alignItems: 'center',
//     alignSelf: 'center',
//     padding: 10,
//   },

//   icon: {
//     width: 50,
//     marginRight: 10,
//     padding: 5,
//   },
//   textinput: {
//     color: '#10341C',
//     fontSize: 15,
//     fontWeight: 'bold',
//     flex: 1,
//   },
//   textinputs: {
//    margin:10,
//     width: '85%',
//     height: 55,
//     borderColor: '#704D06',
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1.5,
//     alignSelf: 'center',
//     alignItems:"center",
//     padding:10,
//     borderRadius: 50,
//     flexDirection: 'row',
//   },
//   droidSafeArea: {
//     marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
// });


import React, { Component,createRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform,
  StatusBar,KeyboardAvoidingView
} from 'react-native';
import firebase from 'firebase';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config';
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';

import { v4 as uuidv4 } from 'uuid';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
  }),
});

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

return token;
}


export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      title: '',
      category: '',
      add: '',
      deets: '',
      userId: firebase.auth().currentUser.uid,
      allItems: [],
      mode: 'date',
      show: false,
      date: new Date(),
      dropdownHeight: 55,
      expoPushToken:'',
      notification:'',
     
    };
    this.notificationListener=createRef();
    this.responseListener=createRef();
        
  }

  sendPushNotification = async (expoPushToken) => 
  {
 const triggerTS = new Date(this.state.date);
    console.log(triggerTS)

 const trigger=new Date(triggerTS);
   
     trigger.setHours(10);
     trigger.setMinutes(0);
     trigger.setSeconds(0);
     console.log(trigger);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: this.state.title + ' is getting expired today',
        body: 'Check the X-Minder App for details',
      },
     // channelId: channelId,
       trigger,

      // trigger: { hour: 16,minute:20,repeats:false },
    });
    alert("Notification!!")
  };

  componentDidMount() {
    registerForPushNotificationsAsync().then(token => this.setState({expoPushToken:token}));
    
    this.notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      this.setState({notification:notification});
    });

    this.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

   
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }

   



   

  addItemDetails = () => {
    if (this.state.category === '' || this.state.date === '' || this.state.title === '') {
      Alert.alert('One or more fields are incomplete!');
    } else {
      
     // this.schedulePushNotification(this.state.date);

      db.collection('allItems')
        .add({
          userId: this.state.userId,
          category: this.state.category,
          date: this.state.date.toDateString(),
          title: this.state.title,
          deets: this.state.deets,
          add: this.state.add,
          email: this.state.emailId,
        })
        .then((docRef) => {
          const itemId = docRef.id;
          Alert.alert('Item Details Added');
          this.props.navigation.navigate('UpcomingReminders');
          this.setState({
            category: '',
            date: new Date(),
            title: '',
            deets: '',
            add: '',
            itemId,
          });
        })
        .catch((error) => {
          console.error('Error adding item: ', error);
        });
    }
  };

  render() {
    let numOfLinesCompany = 0;
    return (
      <View style={{ flex: 1, backgroundColor: '#DEEFD2' }}>
        <ImageBackground
          style={{ flex: 1, justifyContent: 'center' }}
          source={require('../assets/nscren.png')}
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <ScrollView style={{flex:1,marginBottom:100}}>
            <LinearGradient
              colors={[
                '#2D490F',
                '#EFFFE5',
                '#fff',
                '#fff',
                '#fff',
                '#EFFFE5',
                '#2D490F',
              ]}
              start={{ x: 0.01, y: 0.01 }}
              end={{ x: 0.99, y: 0.99 }}
              style={{
                marginTop: 5,
                marginBottom: 10,
                width: '85%',
                height: 55,
                borderColor: 'black',
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: 1.5,
                alignSelf: 'center',
                padding: 10,
                borderRadius: 50,
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{ alignSelf: 'flex-start' }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Feather name={'arrow-left'} size={30} color="#10341c" />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: '25%',
                  color: '#002E35',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}
              >
                Add Items
              </Text>
            </LinearGradient>
            <KeyboardAvoidingView behavior="padding" style={{flex:1}}>

            <Image
              source={require('../assets/ais.png')}
              style={{
                width: '50%',
                height: 150,
                alignSelf: 'center',
                marginTop: 10,
              }}
            />

            <View style={styles.textinputs}>
              <MaterialCommunityIcons
                name={'format-title'}
                size={20}
                color="#175831"
                style={styles.icon}
              />
              <TextInput
                style={styles.textinput}
                placeholder="Title"
                onChangeText={(val) => {
                  this.setState({ title: val });
                }}
                value={this.state.title}
              />
            </View>
            <View style={styles.textinputs}>
              <FontAwesome
                name={'calendar'}
                size={20}
                color={'#175831'}
                style={styles.icon}
                onPress={() => {
                  this.setState({ show: true });
                }}
              />

              <Text
                style={{
                  color: '#10341C',
                  fontSize: 15,
                  fontWeight: 'bold',
                  flex: 1,
                }}
              >
                {this.state.date.toDateString()}
              </Text>

              <FontAwesome
                name={'calendar'}
                size={20}
                color={'#175831'}
                style={[
                  styles.icon,
                  {
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    alignSelf: 'flex-end',
                  },
                ]}
                onPress={() => {
                  this.setState({ show: true });
                }}
              />
              {this.state.show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.date}
                  mode={this.state.mode}
                  display="default"
                  minimumDate={new Date()}
                  onChange={(event, date) => {
                    if (this.state.mode === 'date') {
                      var pickedDate = new Date(date);
                      this.setState({
                        date: pickedDate,
                        show: false,
                      });
                    }
                  }}
                />
              )}
            </View>
          <View style={[styles.textinputs,{ height: this.state.dropdownHeight}]}>
              <MaterialIcons
                name={'category'}
                size={20}
                color={'#175831'}
                style={styles.icon}
              />
              <View style={{ flex: 1, height: this.state.dropdownHeight }}>
                <DropDownPicker
                  items={[
                    { label: 'Food', value: 'Food' },
                    { label: 'Medicines', value: 'Medicine' },
                    { label: 'Documents', value: 'Document' },
                    { label: 'Others', value: 'Other' },
                  ]}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 55 });
                  }}
                  defaultIndex={0}
                  containerStyle={{ height: 40 }}
                  onChangeItem={(val) => {
                    this.setState({ category: val.value });
                  }}
                  value={this.state.category}
                />
              </View>
            </View>

            <View style={styles.textinputs}>
              <MaterialIcons
                name={'note-add'}
                size={20}
                color={'#175831'}
                style={styles.icon}
              />

              <TextInput
                style={styles.textinput}
                placeholder=" Additional Remarks"
                onChangeText={(val) => {
                  this.setState({ add: val });
                }}
                value={this.state.add}
                multiline={true}
                numberOfLines={numOfLinesCompany}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 18;
                }}
              />
            </View>
            <View style={styles.textinputs}>
              <FontAwesome
                name={'address-book'}
                size={20}
                color={'#175831'}
                style={styles.icon}
              />

              <TextInput
                style={styles.textinput}
                placeholder="Contact Details"
                keyboardType="phone-pad"
                onChangeText={(val) => {
                  this.setState({ deets: val });
                }}
                value={this.state.deets}
              />
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => this.addItemDetails()}
            >
              <Text style={styles.loginButtonText}> Add Item → </Text>
            </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                 this.sendPushNotification(this.state.expoPushToken)
            }}
                style={{ alignSelf: 'center',marginTop:10 }}>
                <Text style={{fontWeight:'bold'}}>
                    Need to be notified? Click here.
                </Text>
              
            </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginButtonText: {
    color: '#4a632f',
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#f0c51e',
    borderRadius: 10,
    marginTop: 10,
    width: '65%',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },

  icon: {
    width: 50,
    marginRight: 10,
    padding: 5,
  },
  textinput: {
    color: '#10341C',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  textinputs: {
   margin:10,
    width: '85%',
    height: 55,
    borderColor: '#704D06',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1.5,
    alignSelf: 'center',
    alignItems:"center",
    padding:10,
    borderRadius: 50,
    flexDirection: 'row',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
