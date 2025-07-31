import {View, Text} from 'react-native'
import React from 'react'
import {Redirect, Slot} from "expo-router";

const AuthLayout = () => {
   const isAuthenticated = false

    if(isAuthenticated) return <Redirect href={"/sign-in"}/>

    return (
        <View>
            <Text>AuthLayout</Text>
            <Slot />
        </View>
    )
}
export default AuthLayout
