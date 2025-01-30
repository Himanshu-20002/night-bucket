import { View,  StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../utils/Constants'
import { useAuthStore } from '@state/authStore'
import DeliveryHeader from '../../components/delivery/DeliveryHeader'
import TabBar from './TabBar'
import { fetchCurrentOrdersforDelivery } from '../../services/OrderService'
import { RefreshControl } from 'react-native-gesture-handler'
import OrderItem from './OrderItem'
const DeliveryDashboard = () => {
  const {user} = useAuthStore()
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>('available')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)
  
   console.log('user', user)



  const fetchData = async () => {
    setData([]) // Clear existing data
    setLoading(true)
    setRefreshing(true)
    const response = await fetchCurrentOrdersforDelivery(selectedTab, user?._id, user?.branch)
    setData(response.orders) // Ensure you set the correct data array
    setLoading(false)
    setRefreshing(false)
  }
  useEffect(()=>{
    fetchData()
  },[selectedTab])

  const renderOrderItem = ({item, index}:{item:any, index:number})=>{
    return <OrderItem item={item} index={index}/>
  }
  
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email}/>
        
      </SafeAreaView>
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab}/>
        <FlatList
        data={data}
        refreshControl={
          <RefreshControl 
          refreshing={refreshing}
          onRefresh={async ()=>{
            await fetchData()}}/>
        }
        ListEmptyComponent={()=>{
        if(loading){
          return (
            <View style={styles.center}>
          <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
          )
        }
        return (
        <View style={styles.center}>
          <Text>No orders found</Text>  
        </View>
        )
      }}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.orderId.toString()}
        contentContainerStyle={styles.flatlistContainer}
        numColumns={1}
        extraData={data}
        removeClippedSubviews={false}
      />
      
      </View>
  
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.primary,
  },
  subContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    padding:6
  },
  flatlistContainer: {
    padding:2
  },
  center:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:60
  }
});

export default DeliveryDashboard
