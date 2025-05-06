import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                },
                tabBarStyle: {
                    margin: 20,
                    backgroundColor: "#221f3d",
                    borderRadius: 15,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    overflow: "hidden",
                    borderTopWidth: 0,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name="home"
                            size={24}
                            color={focused ? "#D6C6DD" : "#C178E0FF"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="search1"
                            size={24}
                            color={focused ? "#D6C6DD" : "#C178E0FF"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name="favorite-border"
                            size={24}
                            color={focused ? "#D6C6DD" : "#C178E0FF"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Octicons
                            name="person"
                            size={24}
                            color={focused ? "#D6C6DD" : "#C178E0FF"}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default _Layout;

const styles = StyleSheet.create({});
