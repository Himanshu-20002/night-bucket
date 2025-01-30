import { CommonActions, createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(routeName:string,params?:object){
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.navigate(routeName,params))
    }else{
        console.log('Navigation is not ready')
    }
  
}
export async function replace(routeName:string,params?:object){
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(StackActions.replace(routeName,params))
    }else{
        console.log('Navigation is not ready')
    }
}
export async function resetAndNavigate(routeName:string,params?:object){
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.reset({
            index:0,
            routes:[{name:routeName,params}]
        }))
    }else{
        console.log('Navigation is not ready')
    }
}
export async function goBack(){
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.goBack())
    }else{
        console.log('Navigation is not ready')
    }
}
export async function push(routeName:string,params?:object){
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(StackActions.push(routeName,params))
    }else{
        console.log('Navigation is not ready')
    }
}
export async function prepareNavigation(){
    navigationRef.isReady()
}
