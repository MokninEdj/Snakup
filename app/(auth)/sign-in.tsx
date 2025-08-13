import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";

import { Alert, Button, Text, View } from "react-native";
const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const { email, password } = form;
  const onSubmit = async () => {
    if (!email || !password)
      return Alert.alert("Error", "Please enter a valid Email & Password");

    setIsSubmitting(true);
    try {
      //Call api
      await signIn({ email, password });
      Alert.alert("Success", "User signed In successfully");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className={"gap-10 bg-white p-5 mt-5"}>
      <Button
        title="Try!"
        onPress={() => {
          console.log("First error");
          Sentry.captureException(new Error("First error"));
        }}
      />
      <CustomInput
        label={"Email"}
        keyboardType={"email-address"}
        placeholder={"Enter your email"}
        value={email}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, email: text }));
        }}
      />
      <CustomInput
        label={"Password"}
        secureTextEntry={true}
        placeholder={"Enter your Password"}
        value={password}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, password: text }));
        }}
      />
      <CustomButton
        title={"Sign in"}
        isLoading={isSubmitting}
        onPress={onSubmit}
      />
      <View className={"flex justify-center flex-row gap-2 mt-5"}>
        <Text className={"base-regular text-gray-100"}>
          Don&apos; have an account?
        </Text>
        <Link href={"/sign-up"} className={"base-bold text-primary"}>
          Sign Up
        </Link>
      </View>
    </View>
  );
};
export default SignIn;
