import {appAxios} from './apiInterceptors';

export const createOrder = async (items: any, totalItemPrice: number) => {
  try {
    const response = await appAxios.post(`/order`, {
      items: items,
      branch: '670691a21525f8e4ab6ccfe9',
      totalPrice: totalItemPrice,
    });
    console.log('createOrder response', response.data);

    return response.data;
  } catch (error) {
    console.log('createOrder error', error);

    return null;
  }
};
export const getOrderById = async (id: string) => {
  try {
    const response = await appAxios.get(`/order/${id}`)
    console.log('getOrderById response', response.data.order.status);
    return response.data;
  } catch (error) {
    console.log('fetching order by id error', error);
    return null;
  }
};
export const fetchCustomerOrders = async (userId:string) => {
  try {
    const response = await appAxios.get(`/order?userId=${userId}`)
    console.log('Orders fetched')
    return response.data;
  } catch (error) {
    console.log('fetching customer orders error', error);
    return null;
  }
};
export const fetchCurrentOrdersforDelivery = async (status:string, userId?:string, branchId:string) => {
  console.log('Received params:', { status, branchId });
  if (!status || !branchId) {
    console.log('Missing required parameters');
    return null;
  }
  let uri = status === 'available' 
    ? `/order?status=${status}&branchId=${branchId}` 
    : `/order?status=${status}&branch=${branchId}`
  try {
    const response = await appAxios.get(uri)
    if (!response || !response.data) {
      console.log('Invalid response:', response);
      return null;
    }
    console.log('fetchCurrentOrdersforDelivery response', response.data);
    return response.data;
  } catch (error: any) {
    console.log('Requesting URL:', uri);
    console.log('fetching delivery orders error:', error?.response?.data || error);
    return null;
  }
};
export const updateOrderStatus  = async (orderId:string,location:any, status:string) => {
  try {
    const response = await appAxios.patch(`/order/${orderId}/status`,{
      deliveryPersonLocation:location,
      status
    })
    console.log('updateOrderStatus response', response.data);
    return response.data;
  } catch (error) {
    console.log('updating order status error', error);
    return null;
  }
};
export const confirmOrder  = async (userId:string,deliveryPersonLocation:any) => {
  try {
    const response = await appAxios.post(`/order/${userId}/confirm`,{
      deliveryPersonLocation,
    })
    console.log('confirming order response', response.data);
    return response.data;
  } catch (error) {
    console.log('confirming order error', error);
    return null;
  }
};

/// can use the google matrix api to get the distance and time and add it to the order to the nearest branch but currently not doing that
