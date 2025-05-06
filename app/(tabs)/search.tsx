import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { fetchPopularMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import Fontisto from "@expo/vector-icons/Fontisto";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const {
        data: movies,
        loading,
        error,
        refetch: loadingMovies,
        reset,
    } = useFetch(() => fetchPopularMovies({ query: searchQuery }), false);
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadingMovies();
            } else {
                reset();
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);
    useEffect(() => {
        if (movies?.length > 0 && movies?.[0]) {
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies]);
    return (
        <View className="flex-1 bg-primary">
            <FlatList
                className="px-5"
                numColumns={3}
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard {...item} />}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: "20",
                    paddingRight: 5,
                    marginBottom: 5,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View>
                            <Fontisto
                                name="film"
                                size={48}
                                color="#D6C6DD"
                                className="mt-10 mb-5 mx-auto"
                            />
                            <View className="my-5">
                                <SearchBar
                                    onPress={() => {}}
                                    placeholder="Search For a Movie"
                                    value={searchQuery}
                                    onChangeText={(text) =>
                                        setSearchQuery(text)
                                    }
                                />
                                {loading && (
                                    <ActivityIndicator
                                        size={"large"}
                                        color={"#D6C6DD"}
                                        className="mt-10 self-center"
                                    />
                                )}
                                {error && (
                                    <Text className="text-red-500">
                                        Error: {error.message}
                                    </Text>
                                )}
                                {!loading &&
                                    !error &&
                                    searchQuery.trim() &&
                                    movies?.lenght > 0 && (
                                        <Text className="text-xl text-white font-bold">
                                            Search Result for:{}
                                            <Text className="text-accent">
                                                {searchQuery}
                                            </Text>
                                        </Text>
                                    )}
                            </View>
                        </View>
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {searchQuery.trim()
                                    ? "No Search Found"
                                    : "Search for a movie"}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({});
