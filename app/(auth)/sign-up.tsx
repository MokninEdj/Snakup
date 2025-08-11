import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const { name, email, password } = form;
  const onSubmit = async () => {
    if (!name || !email || !password)
      return Alert.alert("Error", "Please enter a valid Email & Password");

    setIsSubmitting(true);
    try {
      //Call api
      await createUser({
        email,
        password,
        name,
      });
      //   Alert.alert("Success", "User signed In successfully");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className={"gap-10 bg-white p-5 mt-5"}>
      <CustomInput
        label={"Full Name"}
        keyboardType={"default"}
        placeholder={"Enter your name"}
        value={name}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, name: text }));
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
        title={"Sign Up"}
        isLoading={isSubmitting}
        onPress={onSubmit}
      />
      <View className={"flex justify-center flex-row gap-2 mt-5"}>
        <Text className={"base-regular text-gray-100"}>
          Already have an account?
        </Text>
        <Link href={"/sign-in"} className={"base-bold text-primary"}>
          Sign In
        </Link>
      </View>
    </View>
  );
};
export default SignUp;
