import {MMKV} from 'react-native-mmkv'

// Creating a storage instance for token storage
export const tokenStorage = new MMKV({
    id: 'token-storage',
    encryptionKey: 'some-secret-key'
})

// Creating a storage instance for the app's general storage
export const storage = new MMKV({
    id: 'my-app-storage',
    encryptionKey: 'some-secret-key'
})

// Exporting a utility object for easier storage operations
export const mmkvStorage ={
    // Method to set a key-value pair in storage
    setItem: (key:string, value:string) =>{
        console.log('Setting item:', key, value);
        storage.set(key,value);
    },
        
    // Method to get a value from storage by key
    getItem: (key:string) =>{
        const value = storage.getString(key);   
        // Attempting to parse the value as JSON and returning null if it fails
        return value ? JSON.parse(value) : null;
    },
    // Method to remove a key-value pair from storage
    removeItem: (key:string) => storage.delete(key)
}





// Storage System (MMKV)
// ├── Token Storage
// │   ├── Instance: tokenStorage
// │   │   ├── Purpose: Store access and refresh tokens
// │   │   ├── Methods:
// │   │   │   ├── set(key, value)
// │   │   │   ├── getString(key)
// │   │   │   └── delete(key)
// │   └── Use Cases:
// │       ├── Store tokens after login
// │       └── Remove tokens on logout
// ├── General Storage
// │   ├── Instance: storage
// │   │   ├── Purpose: Store general app data
// │   │   ├── Methods:
// │   │   │   ├── set(key, value)
// │   │   │   ├── getString(key)
// │   │   │   └── delete(key)
// │   └── Use Cases:
// │       ├── Store user preferences
// │       └── Retrieve app settings
// └── Utility Object (mmkvStorage)
//     ├── Methods:
//     │   ├── setItem(key, value)
//     │   ├── getItem(key)
//     │   └── removeItem(key)
//     └── Purpose: Simplify storage operations