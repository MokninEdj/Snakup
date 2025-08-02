import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router"
const SignUp = () => {
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [form,setForm]=useState({email:"",password:""})

    const onSubmit=async ()=>{
        if(!form.email||!form.password) return Alert.alert('Error',"Please enter a valid Email & Password")

        setIsSubmitting(true)
        try {
            //Call api
            Alert.alert('Success',"User signed In successfully")
            router.replace('/')
        }catch (error:any){
            Alert.alert('Error',error.message)

        }finally {
            setIsSubmitting(false)
        }
    }

    return (
        <View className={"gap-10 bg-white p-5 mt-5"}>
            <CustomInput
                label={"Email"}
                keyboardType={"email-address"}
                placeholder={"Enter your email"}
                value={form.email}
                onChangeText={(text)=>{setForm(prev=>({...prev,email: text}))}

                }/>
            <CustomInput
                label={"Password"}
                secureTextEntry={true}
                placeholder={"Enter your Password"}
                value={form.password}
                onChangeText={(text)=>{setForm((prev=>({...prev,password: text})))}

                }/>
            <CustomButton title={"Sign Up"} isLoading={isSubmitting} onPress={onSubmit}/>
            <View className={"flex justify-center flex-row gap-2 mt-5"}>
                <Text className={"base-regular text-gray-100"}>
                    Already have an account?
                </Text>
                <Link href={"/sign-in"} className={"base-bold text-primary"}>
                    Sign In
                </Link>

            </View>
        </View>
    )
}
export default SignUp
