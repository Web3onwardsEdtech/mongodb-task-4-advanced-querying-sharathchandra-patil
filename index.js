const {MongoClient}=require('mongodb');
async function compare(){
    const uri='mongodb://localhost:27017';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try{
        await client.connect();
        const database=client.db('MoviesDB');
        const collection=database.collection('Movies');
        const movies=[
            {
                title:"De dana dan",
                popularity:50,
                genre:"comedy",
                vote_average:4
            },
            {
                title:"KGF",
                popularity:120,
                genre:"action",
                vote_average:8
            }
        ];
        const result=await collection.insertMany(movies);
        const comparisonQuery = await collection.find({ popularity: { $gt: 100 } }).toArray();
        console.log('Movies with popularity > 100:', comparisonQuery);
        const logicalQuery = await collection.find({
            $or: [
              { genre: 'Action' },
              { vote_average: { $gt: 7 } }
            ]
          }).toArray();
          console.log('Action movies or movies with vote average > 7:', logicalQuery);
          const elementQuery = await collection.find({ video: { $exists: true } }).toArray();
        console.log('Movies with video field:', elementQuery);
    
    }
    finally{
        await client.close();
    }
}
compare().catch(console.dir);
