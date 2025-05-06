import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { fetchPopularMovies } from "@/services/api";
import { getTrengingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    FlatList,
    ScrollView,
    Text,
    View,
} from "react-native";
export default function Index() {
    const router = useRouter();
    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() => fetchPopularMovies({ query: "" }));
    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError,
    } = useFetch(getTrengingMovies);
    return (
        <View className="flex-1 bg-primary">
            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >
                <Fontisto
                    name="film"
                    size={48}
                    color="#D6C6DD"
                    className="mt-10 mb-5 mx-auto"
                />
                {moviesLoading || trendingLoading ? (
                    <ActivityIndicator
                        size={"large"}
                        color={"#D6C6DD"}
                        className="mt-10 self-center"
                    />
                ) : moviesError || trendingError ? (
                    <Text>
                        Error {moviesError?.message || trendingError?.message}
                    </Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search For a Movie"
                        />
                        {trendingMovies && (
                            <View className="mt-10">
                                <Text className="mb-5 text-white font-bold text-lg">
                                    Trending Movies
                                </Text>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    ItemSeparatorComponent={() => (
                                        <View className="w-4" />
                                    )}
                                    data={trendingMovies}
                                    keyExtractor={(item) =>
                                        item.movie_id.toString()
                                    }
                                    renderItem={({ item, index }) => (
                                        <TrendingCard
                                            movie={item}
                                            index={index}
                                        />
                                    )}
                                />
                            </View>
                        )}
                        <>
                            <Text className="text-lg font-bold mt-5 mb-3 text-white">
                                Latest Movies
                            </Text>
                            <FlatList
                                data={movies}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <MovieCard {...item} />
                                )}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: "flex-start",
                                    gap: "20",
                                    paddingRight: 5,
                                    marginBottom: 10,
                                }}
                                className="mt-2, pb-32"
                                scrollEnabled={false}
                            />
                        </>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
