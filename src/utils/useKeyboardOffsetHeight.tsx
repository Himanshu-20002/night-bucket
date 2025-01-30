import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useKeyboardOffsetHeight() {
    const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState<number>(0);
    useEffect(()=>{
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            console.log("Keyboard shown event fired");
            console.log("Keyboard height:", e.endCoordinates.height);
            setKeyboardOffsetHeight(e.endCoordinates.height);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            console.log("Keyboard hidden event fired");
            setKeyboardOffsetHeight(0);
        });
        const keyboardWillIOSShowListener = Keyboard.addListener('keyboardWillShow', (e)=>{
            setKeyboardOffsetHeight(e.endCoordinates.height);
        })
        const keyboardWillIOSHideListener = Keyboard.addListener('keyboardWillHide', ()=>{
            setKeyboardOffsetHeight(0);
        })
        return ()=>{
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
            keyboardWillIOSShowListener.remove();
            keyboardWillIOSHideListener.remove();
        }
    },[])
    return keyboardOffsetHeight;
}
