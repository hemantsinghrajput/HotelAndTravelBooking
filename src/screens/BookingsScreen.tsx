import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

const BookingsScreen: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const data = await AsyncStorage.getItem('bookings');
        setBookings(data ? JSON.parse(data) : []);
      } catch (e) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchBookings = async () => {
        setLoading(true);
        try {
          const data = await AsyncStorage.getItem('bookings');
          setBookings(data ? JSON.parse(data) : []);
        } catch (e) {
          setBookings([]);
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    }, [])
  );

  const openReceipt = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const closeReceipt = () => {
    setModalVisible(false);
    setSelectedBooking(null);
  };

  const deleteBooking = async (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    await AsyncStorage.setItem('bookings', JSON.stringify(updated));
    Toast.show({ type: 'success', text1: 'Booking deleted' });
    // Refetch to ensure sync
    const data = await AsyncStorage.getItem('bookings');
    setBookings(data ? JSON.parse(data) : []);
  };

  const renderBooking = ({ item }: { item: Booking }) => (
    <TouchableOpacity style={styles.card} onPress={() => openReceipt(item)} activeOpacity={0.85}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.hotelName}>{item.hotelName}</Text>
        <TouchableOpacity onPress={() => deleteBooking(item.id)} style={styles.deleteBtn} hitSlop={{top:8,bottom:8,left:8,right:8}}>
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.dates}>📅 {item.checkInDate} - {item.checkOutDate}</Text>
      <Text style={styles.roomType}>🛏️ {item.roomType} | 👥 {item.numberOfGuests} guest{item.numberOfGuests > 1 ? 's' : ''}</Text>
      <Text style={styles.price}>₹{item.totalPrice}</Text>
      <Text style={styles.email}>📧 {item.email}</Text>
      <Text style={styles.bookingDate}>Booked on: {new Date(item.bookingDate).toLocaleDateString('en-IN')}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container,{paddingTop:insets.top}]}>
      <Text style={styles.title}>My Bookings</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={{ marginTop: 40 }} />
      ) : bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No bookings found</Text>
          <Text style={styles.emptySubtext}>Your confirmed hotel bookings will appear here.</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeReceipt}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.receiptTitle}>Booking Receipt</Text>
            {selectedBooking && (
              <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
                <Text style={styles.receiptLabel}>Hotel</Text>
                <Text style={styles.receiptValue}>{selectedBooking.hotelName}</Text>
                <Text style={styles.receiptLabel}>Guest</Text>
                <Text style={styles.receiptValue}>{selectedBooking.guestName}</Text>
                <Text style={styles.receiptLabel}>Email</Text>
                <Text style={styles.receiptValue}>{selectedBooking.email}</Text>
                <Text style={styles.receiptLabel}>Room Type</Text>
                <Text style={styles.receiptValue}>{selectedBooking.roomType}</Text>
                <Text style={styles.receiptLabel}>Guests</Text>
                <Text style={styles.receiptValue}>{selectedBooking.numberOfGuests}</Text>
                <Text style={styles.receiptLabel}>Dates</Text>
                <Text style={styles.receiptValue}>{selectedBooking.checkInDate} - {selectedBooking.checkOutDate}</Text>
                <Text style={styles.receiptLabel}>Total Price</Text>
                <Text style={styles.receiptValue}>₹{selectedBooking.totalPrice}</Text>
                <Text style={styles.receiptLabel}>Booking Date</Text>
                <Text style={styles.receiptValue}>{new Date(selectedBooking.bookingDate).toLocaleString('en-IN')}</Text>
              </ScrollView>
            )}
            <Pressable style={styles.closeButton} onPress={closeReceipt}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 6,
  },
  dates: {
    fontSize: 15,
    color: '#2c3e50',
    marginBottom: 4,
  },
  roomType: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  bookingDate: {
    fontSize: 12,
    color: '#b2bec3',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 18,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
    alignItems: 'center',
  },
  receiptTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 18,
  },
  receiptLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 10,
    fontWeight: '600',
  },
  receiptValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    marginTop: 2,
  },
  closeButton: {
    marginTop: 18,
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteBtn: {
    marginLeft: 10,
    padding: 2,
  },
  deleteIcon: {
    fontSize: 22,
  },
});

export default BookingsScreen; 