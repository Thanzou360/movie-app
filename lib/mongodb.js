import { MongoClient } from "mongodb";

//if env n'existe pas
if (process.env.MONGODB_URI) {
    throw new Error("Invalid/Missing environement variable: 'MONGODB_URI")
}

const uri = process.env.MONGODB_URI
const options = {}

let client 
let clientPromise

if (process.env.NODE_ENV === "developement") { 
     if (!global._mongoClientPromise) {
          client = new MongoClient(uri,options)
          global._mongoClientPromise = client.connect
     }
     ClientPromise = global._mongoClientPromise
} else {
    //en mode production c'est mieux de ne pas utiliser la variable globale
    client = new MongoClient(uri,options)
    clientPromise = client.connect()
}

export default clientPromise