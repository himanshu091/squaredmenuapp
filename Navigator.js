
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import {Context as AuthContext} from './context/AuthContext';

// Screens
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import AddABusiness from './screens/AddABusiness';
import Menu from './screens/Menu';
import MenuList from './screens/MenuList';
import TrialScreen from './screens/TrialScreen';
import RegisterPromoCode from './screens/RegisterPromoCode'
import ThankYouRegistration from './screens/ThankYouRegistration';
import ThankYouPurchase from './screens/ThankYouPurchase';
import MenuPreview from './screens/MenuPreview';
import UserProfile from './screens/UserProfile';
import EditProfile from './screens/EditProfile';
import EditMenu from './screens/EditMenu';


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
                <Auth.Screen name="RegistrationScreen" component={RegistrationScreen} />
                <Auth.Screen name="RegisterPromoCode" component={RegisterPromoCode} />
                <Auth.Screen name="TrialScreen" component={TrialScreen} />
                <Auth.Screen name="ThankYouRegistration" component={ThankYouRegistration} />
                <Auth.Screen name="ThankYouPurchase" component={ThankYouPurchase} />
               
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
                <Main.Screen name="AddABusiness" component={AddABusiness} />
                <Main.Screen name="Menu" component={Menu} />
                <Main.Screen name="MenuList" component={MenuList} />
                <Main.Screen name="MenuPreview" component={MenuPreview} />
                <Main.Screen name="UserProfile" component={UserProfile} />
                <Main.Screen name="EditProfile" component={EditProfile} />
                <Main.Screen name="EditMenu" component={EditMenu} />
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
