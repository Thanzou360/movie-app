import { mongooseConnect } from "@/lib/mongoose";
import { Movie } from "@/models/Movie";


//api pour fetch les donne sur mongo db
export default async function handle(req, res) {


    //si authentifié alors connexion a mangodb
    await mongooseConnect()

    const { method } = req;

    if (method === 'POST') {
        const { title, slug, bgposter, smposter, titlecategory, description, rating,
            duration, year, genre, language, subtitle, size, quality, youtubelink, category,
            watchonline, downloadlink, status
        } = req.body;

        const movieData = await Movie.create({
            title, slug, bgposter, smposter, titlecategory, description, rating,
            duration, year, genre, language, subtitle, size, quality, youtubelink, category,
            watchonline, downloadlink, status
        })

        res.json(movieData)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Movie.findById(req.query.id))
        } else {
            res.json((await Movie.find()).reverse())
        }
    }


    //mise a jour de la requete
    if (method === 'PUT') {
        //ajout de l'id pour trouver le film
        const {_id, title, slug, bgposter, smposter, titlecategory, description, rating,
            duration, year, genre, language, subtitle, size, quality, youtubelink, category,
            watchonline, downloadlink, status
        } = req.body;

        await Movie.updateOne({_id }, {
            title, slug, bgposter, smposter, titlecategory, description, rating,
            duration, year, genre, language, subtitle, size, quality, youtubelink, category,
            watchonline, downloadlink, status
        });

        res.json(true)
    }



    //suppression de la requete
    if (method === 'DELETE') {
        if (req.query?.id) {
            await Movie.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }

}