import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from './storage';


interface authStore {
  user: Record<string, any> | null; //- It can either be an object (with string keys and values of any type) or `null`, indicating that no user is currently authenticated.
  setUser: (user: any) => void;
  setCurrentOrder: (order: Record<string, any> | null) => void;
  currentOrder: Record<string, any> | null;
  logout: () => void;
}
export const useAuthStore = create<authStore>()(
  persist(
    (set, get) => ({
      user: null,
      currentOrder: null,
      setUser: user => set({user}),
      setCurrentOrder: order => set({currentOrder: order}),
      logout: () => set({user: null, currentOrder: null}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
      // onRehydrateStorage: () => (state) => {
      //   console.log('Rehydrated state:', state);
      // },
    },
  ),
);





// ├── State Management
// │   ├── User
// │   │   ├── Type: Record<string, any> | null
// │   │   ├── Purpose: Store authenticated user data
// │   │   └── Methods:
// │   │       ├── setUser(user)
// │   │       └── logout()
// │   ├── Current Order
// │   │   ├── Type: Record<string, any> | null
// │   │   ├── Purpose: Store current order data
// │   │   └── Methods:
// │   │       └── setCurrentOrder(order)
// │   └── Persisted State
// │       ├── Name: 'auth-storage'
// │       └── Storage: MMKV
// └── Use Cases
//     ├── User Authentication
//     ├── User Logout
//     ├── Managing Current Orders
//     └── Accessing User Data

