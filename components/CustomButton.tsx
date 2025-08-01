import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import cn from "clsx";
import {CustomButtonProps} from "@/types";

const CustomButton = ({
                          title="Click Me",
                          leftIcon,
                          textStyle,
                          isLoading=false,
                          style,
                          onPress
}:CustomButtonProps) => {
    return (
        <TouchableOpacity className={cn("custom-btn",style)} onPress={onPress}>
            {leftIcon}
            <View className={"flex-center flex-row"}>
                {isLoading ?
                    <ActivityIndicator/>:
                    <Text className={cn("paragraph-semibold text-white-100",textStyle)}>{title}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton
