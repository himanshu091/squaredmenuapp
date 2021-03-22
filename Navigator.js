
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import {Context as AuthContext} from './context/AuthContext';

// Screens
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';

function OnboardingStack(){
    const Onboard = createStackNavigator()
    return(
        <NavigationContainer>
        <Onboard.Navigator headerMode="none">
            <Onboard.Screen name="OnboardingScreen" component={OnboardingScreen} />
        </Onboard.Navigator>
        </NavigationContainer>
    )
}
function AuthStack(){
    const Auth = createStackNavigator()
    return(
        <NavigationContainer>
            <Auth.Navigator headerMode="none">
                <Auth.Screen name="Login" component={Login} />
            </Auth.Navigator>
        </NavigationContainer>
    )
}
function MainStack(){
    const Main = createStackNavigator()
    return(
        <NavigationContainer>
        <Main.Navigator headerMode="none">
            <Main.Screen name="HomeScreen" component={HomeScreen} />
        </Main.Navigator>
        </NavigationContainer>
    )
}

function Navigator() {
    const {state} = React.useContext(AuthContext);
    return (
        <>
            {state.new_device  ? (<OnboardingStack/>):(
                !state.token?(<AuthStack/>):(<MainStack/>)
            )}
        </>
    )
}

export default Navigator
