import {View, Text, KeyboardAvoidingView, Platform, ScrollView, ImageBackground, Dimensions, Image} from 'react-native'
import React from 'react'
import {Redirect, Slot} from "expo-router";
import {images} from "@/constant";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

const AuthLayout = () => {
   const isAuthenticated = false

    if(isAuthenticated) return <Redirect href={"/sign-in"}/>

    return (
        <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"}>

            <ScrollView className={"bg-white h-full"} keyboardShouldPersistTaps={"handled"} >
                <View className={"relative w-full"} style={{height:Dimensions.get("screen").height/2.25}}>
                    <ImageBackground source={images.loginGraphic} resizeMode={"stretch"} className={"size-full rounded-b-lg"}/>
                    <Image source={images.logo} className={"self-center size-48 absolute -bottom-16 z-10"} resizeMode={"contain"}/>
                </View>

            <Slot />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default AuthLayout
