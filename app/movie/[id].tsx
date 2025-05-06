import { fetchMoviDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const { data: movie, loading: movieLoading } = useFetch(() =>
        fetchMoviDetails(id as string)
    );
    return (
        <View className="bg-primary flex-1">
            <ScrollView
                className="relative"
                contentContainerStyle={{ paddingBottom: 80 }}
            >
                <Image
                    className="w-full h-[550px]"
                    source={{
                        uri: movie?.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                            : "https://placehold.co/600x400/1a1a1a/ffffff.png",
                    }}
                    resizeMode="cover"
                />
                <View className="items-start justify-center flex-col mt-5 px-5">
                    <Text className="text-white font-bold text-xl">
                        {movie?.title}
                    </Text>
                    <Text className="text-ligh-100 font-semibold text-l">
                        {movie?.release_date}
                    </Text>
                    <View className="my-3 bg-dark-100 p-2 rounded-md flex-row">
                        <AntDesign name="star" size={20} color="yellow" />
                        <Text className="text-white font-semibold text-l ml-2">
                            {Math.round(movie?.vote_average ?? 0)} / 10
                        </Text>
                        <Text className="text-ligh-100 font-semibold text-l ml-2">
                            ({movie?.vote_count} votes)
                        </Text>
                    </View>
                    <Text className="text-ligh-100 font-semibold text-l mb-1">
                        Overview
                    </Text>
                    <Text className="text-white font-semibold text-l">
                        {movie?.overview}
                    </Text>
                    <View className="flex-row bg-red w-full">
                        <View className="flex-col my-5 mr-44">
                            <Text className="text-ligh-100 font-semibold text-l mb-1">
                                Release Date
                            </Text>
                            <Text className="text-white font-semibold text-l">
                                {movie?.release_date}
                            </Text>
                        </View>
                        <View className="flex-col my-5">
                            <Text className="text-ligh-100 font-semibold text-l mb-1">
                                Status
                            </Text>
                            <Text className="text-white font-semibold text-l">
                                {movie?.release_date
                                    ? "Released"
                                    : "Not released"}
                            </Text>
                        </View>
                    </View>
                    <Text className="text-ligh-100 font-semibold text-l mb-1">
                        Genres
                    </Text>
                    <View className="flex-row gap-2">
                        {movie?.genres.map((g) => (
                            <Text
                                key={g.id.toString()}
                                className="text-white font-semibold text-l bg-dark-100 p-2 rounded-md"
                            >
                                {g.name}
                            </Text>
                        ))}
                    </View>
                    <Text className="text-ligh-100 font-semibold text-l mb-1 mt-5">
                        Budget
                    </Text>
                    <View className="flex-row gap-2">
                        <Text className="text-white font-semibold text-l mb-1">
                            ${movie?.budget! / 1000000} million - $
                            {Math.round(movie?.revenue! / 1000000)} revenue
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                className="absolute bottom-5 bg-purple-600
            left-0 right-0  py-3.5 mx-5 rounded-lg"
                onPress={router.back}
            >
                <Text className="text-white text-center">Go back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MovieDetails;

const styles = StyleSheet.create({});
