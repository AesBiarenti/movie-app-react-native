
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
.setEndpoint("https://cloud.appwrite.io/v1")
.setProject(process.env.EXPO_PUBLIC_APPWRITE_API!);
const database = new Databases(client);

export const updateSearchCount = async (query:string,movie:Movie)=>{
    try{
    const results = database.listDocuments(DATABASE_ID,COLLECTION_ID,[
        Query.equal('searchTerm',query),
    ])  
    if ((await results).documents.length > 0) {
        const existingMovie = (await results).documents[0]
        await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id,
            {
                count: existingMovie.count + 1
            }
        )
    }else{
        database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
            searchTerm : query,
            movie_id : movie.id,
            count : 1,
            title:movie.title,
            poster_url : `https://image.tmd.org/t/p/w500${movie.poster_path}`
        })
    }}catch (error){
        console.log(error);
        throw error
    } finally{

    }
}
export const getTrengingMovies = async ():Promise<TrendingMovie[] | undefined>=>{
    try {
        const results = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.limit(5),
            Query.orderDesc('count'),
        ])
        return results.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        return undefined
    }
}