import { View, Text, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl, Platform, ActivityIndicator } from 'react-native'
import React, { useState, useEffect,FC, useRef }  from 'react'
import { dynamicDashboardData as fullData } from '@utils/db'

import AdCarousal from '../organisms/AdCarousal'
import Categories from '../organisms/Categories'
import Sponser from '../organisms/Sponser'
import VerticalList from '../organisms/VerticalList'
import HorizontalList from '../organisms/HorizontalList'
import AnimatedHorizontalList from '../organisms/AnimatedHorizontalList'

const sectionComponents:{[key:string]:React.ComponentType<any>} = {
  ad_carousal:AdCarousal,
  categories:Categories,
  sponser:Sponser,
  // vertical_list:VerticalList,
  horizontal_list:HorizontalList,
  animated_horizontal_list:AnimatedHorizontalList
}
const PAGE_SIZE = 4

const MainList:FC<{scrollYGlobal:any}> = ({scrollYGlobal}) => {
  const [isRefreshing,setIsRefreshing] = useState(false)
  const [data,setData] = useState(fullData.slice(0,PAGE_SIZE))
  const [currentPage,setCurrentPage] = useState(1)
  const [isLoading,setIsLoading] = useState(false)
  const [isLoadingMore,setIsLoadingMore] = useState(false)
  

  const  prevScrolly=useRef(0)
  const flatlistRef = useRef<FlatList>(null)
  const handleScroll =(event:NativeSyntheticEvent<NativeScrollEvent>)=>{  
    const currentY = event.nativeEvent.contentOffset.y
    scrollYGlobal.value = currentY
    prevScrolly.current = currentY

  }

  const handleRefresh = ()=>{
    setIsRefreshing(true)
    setTimeout(()=>{
      setCurrentPage(1)
      setData(fullData.slice(0,PAGE_SIZE))
      setIsRefreshing(false)
    },1000)
  }

  const handleLoadMore = ()=>{
    if(isLoadingMore) return;
    if(data?.length >= fullData.length) return;
    setIsLoadingMore(true)
    setTimeout(()=>{
      const newPage = currentPage + 1
      const newItems = fullData.slice(0,newPage * PAGE_SIZE)
      setData(newItems)
      setCurrentPage(newPage)
      setIsLoadingMore(false)
    },1000)
  }

  const renderItem = ({item}:{item:any})=>{
    const SectionComponent = sectionComponents[item.type]
    return SectionComponent ? <SectionComponent data={item} /> : null
   
  }



  return (
    <View>
      <FlatList
      data={data}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        overScrollMode='always'
        onScroll={handleScroll}
        ref={flatlistRef}
        scrollEventThrottle={99}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={9}
        nestedScrollEnabled
        contentContainerStyle={{paddingBottom:Platform.OS === 'android' ? 300 : 300}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item,index)=>index.toString()}
        ListFooterComponent={isLoadingMore ? <ActivityIndicator style={{alignSelf:'center',margin:15}} size="small" color="#0000ff" /> : null}

      />
    </View>
  )
}

export default MainList


//fullData → FlatList → renderItem → SectionComponent → Rendered UI