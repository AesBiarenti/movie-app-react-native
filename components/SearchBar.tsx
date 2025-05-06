import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface Props {
    placeholder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (text:string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#5A386936",
                borderRadius: 100,
                paddingHorizontal: 15,
                padding: 5,
            }}
        >
            <AntDesign
                name="search1"
                size={24}
                color={"#C178E0FF"}
                style={{ marginRight: 10 }}
            />
            <TextInput
                placeholderTextColor="white"
                className="text-white placeholder:to-white"
                style={{ color: "white", width: "100%", borderRadius: 100 }}
                value={value}
                onPress={onPress}
                placeholder={placeholder}
                onChangeText={onChangeText}
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({});
