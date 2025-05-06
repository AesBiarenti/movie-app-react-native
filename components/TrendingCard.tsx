import { Link } from "expo-router";
import { PropsWithChildren } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

type TrendingCardProps = PropsWithChildren<{
    movie: TrendingMovie;
    index: number;
}>;

const TrendingCard = ({
    movie: { movie_id, title, poster_url },
    index,
}: TrendingCardProps) => {
    return (
        <Link href={`/movie/${movie_id}`} asChild>
            <TouchableOpacity className="w-32 relative pl-5 mr-4">
                <Image
                    source={{
                        uri: poster_url
                            ? `https://image.tmdb.org/t/p/w500${poster_url}`
                            : "https://placehold.co/600x400/1a1a1a/ffffff.png",
                    }}
                    className="w-32 h-48 rounded-lg"
                    resizeMode="cover"
                />
                <Text className="absolute text-5xl text-white font-extrabold bottom-1 left-1">
                    {index + 1}
                </Text>
            </TouchableOpacity>
        </Link>
    );
};

export default TrendingCard;

const styles = StyleSheet.create({});
