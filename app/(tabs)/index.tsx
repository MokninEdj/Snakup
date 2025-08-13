import CartButton from "@/components/CartButton";
import { images, offers } from "@/constant";
import * as Sentry from "@sentry/react-native";
import cn from "clsx";
import { Fragment } from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Index() {
  return (
    <SafeAreaView className={"flex-1"}>
      <FlatList
        data={offers}
        renderItem={({ item }) => {
          const isEven = item.id % 2 === 0;

          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: item.color }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className={"w-1/2 h-full"}>
                      <Image
                        source={item.image}
                        className={"size-full"}
                        resizeMode={"contain"}
                      />
                    </View>
                    <View
                      className={cn(
                        "offer-card__info",
                        isEven ? "pl-10" : "pr-10"
                      )}
                    >
                      <Text className={"h1-bold text-white leading-tight"}>
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className={"size-10"}
                        resizeMode={"contain"}
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName={"pb-28 px-5"}
        ListHeaderComponent={() => (
          <View className={" justify-between flex-row items-center my-5"}>
            <View className={"flex-start"}>
              <Text className={"small-bold-bold text-primary"}>DELIVER TO</Text>
              <TouchableOpacity
                className={"flex-center flex-row gap-x-1 mt-0.5"}
              >
                <Text className={"paragraph-bold text-dark-100"}>Croatia</Text>
                <Image
                  source={images.arrowDown}
                  resizeMode={"contain"}
                  className={"size-3"}
                />
              </TouchableOpacity>
            </View>
            <CartButton />
          </View>
        )}
        ListFooterComponent={() => (
          <Button
            title="Try!"
            onPress={() => {
              console.log("First error");
              Sentry.captureException(new Error("First error"));
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}
