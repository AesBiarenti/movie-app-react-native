import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
    id,
    poster_path,
    title,
    vote_average,
    release_date,
}: Movie) => {
    //console.log(poster_path);
    return (
        <View>
            <Link href={`/movie/${id}`} asChild>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginRight: 8,
                        marginBottom: 12,
                        maxWidth: "30%",
                    }}
                >
                    <Image
                        source={{
                            uri: poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : "https://placehold.co/600x400/1a1a1a/ffffff.png",
                        }}
                        style={{ width: 120, height: 200 }}
                        resizeMode="cover"
                    />
                    <View className="flex-row justify-start items-center mt-2">
                        <AntDesign name="star" size={20} color="yellow" />
                        <Text
                            className="text-white ml-1
                         font-bold"
                        >
                            {Math.round(vote_average)}
                        </Text>
                    </View>
                    <Text
                        className="text-sm font-bold w-[100] text-white mt-2"
                        ellipsizeMode="tail"
                    >
                        {title}
                    </Text>
                    <Text
                        className="text-sm font-bold w-[100] text-ligh-100 mt-2"
                        ellipsizeMode="tail"
                    >
                        {release_date}
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

export default MovieCard;

const styles = StyleSheet.create({});
