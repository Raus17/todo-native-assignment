import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from '@/FirebaseConfig'

// Define types
type RootStackParamList = {
  Details: undefined;
  PassedEvent: undefined;
  Login: undefined;
};

type PassedEventProps = NativeStackScreenProps<RootStackParamList, 'PassedEvent'>;

interface Event {
  title: string;
  date: Date;
  description: string;
}

const PassedEvent = ({ navigation }: PassedEventProps) => {
  const [passedEvents, setPassedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents) {
          const allEvents: Event[] = JSON.parse(storedEvents);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          // Filter for passed events
          const passed = allEvents.filter((event: Event) =>
            new Date(event.date) < today
          );

          setPassedEvents(passed);
        }
      } catch (error) {
        console.error('Error loading passed events:', error);
      }
    };

    // Load events when component mounts
    loadEvents();

    // Set up a listener for when the tab becomes focused
    const unsubscribe = navigation.addListener('focus', loadEvents);

    // Cleanup subscription
    return unsubscribe;
  }, [navigation]);

  const deleteEvent = async (indexToDelete: number) => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) {
        const allEvents: Event[] = JSON.parse(storedEvents);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const passedEventToDelete = passedEvents[indexToDelete];
        const fullListIndex = allEvents.findIndex(
          (event: Event) =>
            event.title === passedEventToDelete.title &&
            new Date(event.date).getTime() ===
              new Date(passedEventToDelete.date).getTime()
        );

        if (fullListIndex !== -1) {
          allEvents.splice(fullListIndex, 1);
          await AsyncStorage.setItem('events', JSON.stringify(allEvents));

          // Update passed events after deletion
          const newPassedEvents = allEvents.filter(
            (event: Event) => new Date(event.date) < today
          );
          setPassedEvents(newPassedEvents);
        }
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderItem: ListRenderItem<Event> = ({ item, index }) => (
    <View style={styles.event}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDate}>{new Date(item.date).toDateString()}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteEvent(index)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Past Events</Text>
      
      <FlatList
        data={passedEvents}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
      
        <Button onPress={handleLogout} title='LOGOUT'></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  event: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
});

export default PassedEvent;
