import {View, Text, TextInput} from 'react-native'
import React, {useState} from 'react'
import {CustomInputProps} from "@/types";
import cn from "clsx";

const CustomInput = ({
                         placeholder="Enter text",
                         value,
                         onChangeText,
                         label,
                         secureTextEntry,
                         keyboardType="default"
                     }:CustomInputProps) => {
   const [isFocusd,setIsFocused]= useState(false)
    return (
        <View className={"w-full"}>
            <Text className={"label"}>{label}</Text>
            <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            autoCorrect={false}
            autoCapitalize={"none"}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            onFocus={()=>setIsFocused(true)}
            onBlur={()=>setIsFocused(false)}
            className={cn('input',isFocusd?"border-primary":"border-gray-300")}
            />
        </View>
    )
}
export default CustomInput
