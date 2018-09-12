import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import { createBottomTabNavigator, BottomTabBar } from "react-navigation";

import AllShifts from "./AllShifts";
import MyShifts from "./MyShifts";

export default createBottomTabNavigator(
    {
        "Available shifts": AllShifts,
        "My shifts": MyShifts
    },

    {
        tabBarOptions: {
            activeTintColor: "#004FB4",
            inactiveTintColor: "#CBD2E1",
            labelStyle: {
                fontSize: 18,
                textAlign: "center",
                marginBottom: 10,
                fontWeight: "bold"
            },
            style: {
                backgroundColor: "#F7F8FB"
            }
        }
    }
);
