
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";



export default function Movie(

{
    _id,
}
    
) {

    const [redirect, setRedirect] = useState(false);

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [bgposter, setBgposter] = useState('');
    const [smposter, setSmposter] = useState('');
    const [titlecategory, setTitlecategory] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [duration, setDuration] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [slug, setSlug] = useState('');
    const [size, setSize] = useState('');
    const [quality, setQuality] = useState('');
    const [youtubelink, setYoutubelink] = useState('');
    const [category, setCategory] = useState('');
    const [watchonline, setWatchonline] = useState('');
    const [downloadlink, setDownloadlink] = useState({
        "480p": "",
        "720p": "",
        "1080p": "",
        "4k": "",
    });
    const [showInputs, setShowInputs] = useState({
        "480p": false,
        "720p": false,
        "1080p": false,
        "4k": false,
    });
    const [status, setStatus] = useState('');

    //fontion pour creer un film
    async function createMovie(ev) {
        ev.preventDefault();

        const data = {
            title, slug, bgposter, smposter, titlecategory, description, rating,
            duration, year, genre, language, subtitle, size, quality, youtubelink, category,
            watchonline, downloadlink, status
        }
        if (_id) {
            await axios.put('/api/getmovie', {...data, _id})
        } else {
            await axios.post('/api/getmovies', data);
        }

        setRedirect(true);
    }

    if (redirect) {
        router.push('/')
        return null;
    }


    //movie category
    const categories = ["Bollywood", "Hollywood", "South", "Gujarati", "Marvel_Studio", "Tv_Shows", "Web_Series"]

    //download link function

    const resolutions = ["480p", "720p", "1080p", "4K"];


    const handleInputChange = (resolution, value) => {
        setDownloadlink(prevstate => ({
            ...prevstate,
            [resolution]: value
        }));
    };


    const toggleInputVisibility = resolution => {
        setShowInputs(prevstate => ({
            ...prevstate,
            [resolution]: !prevstate[resolution]
        }));
    };


    //slug fonction
    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;


        const newSlug = inputValue.replace(/\s+/g, '-');


        setSlug(newSlug)
    }


    return <>
        <Head>
            <title>Add Movie page</title>
        </Head>

        <form className="addmovieform" onSubmit={createMovie}>

            {/* apercu du bgposter et du smposter */}
            <div className="w-100 flex gap-3 mt-1">
                {bgposter ? <div className="bgposter flex flex-col w-70 flex-left">
                    <img src={bgposter} id="prv" alt="image" />
                    <label htmlFor="prv" className="w-100">Background image preview</label>
                </div> : null}
                {smposter ? <div className="smposter flex flex-col w-33 flex-left">
                    <img src={smposter} id="prv" alt="image" />
                    <label htmlFor="prv" className="w-100">Smposter image preview</label>
                </div> : null}
            </div>
            <div className="formdata w-100 flex flex-sb mt-3 flex-left">
                {/* for left side*/}
                <div className="w-50 flex flex-col flex-left">
                    {/*movie background */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="bgposter">Background poster</label>
                        <input type="text"
                            id="bgposter"
                            placeholder="Bgposter image link"
                            value={bgposter}
                            onChange={ev => setBgposter(ev.target.value)} />
                    </div>
                    {/*movie title */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="title">Movie title</label>
                        <input type="text"
                            id="title"
                            placeholder="title of movie"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)} />
                    </div>
                    {/*movie description */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="description">Description</label>
                        <textarea type="text"
                            id="description"
                            placeholder="description of the movie"
                            value={description}
                            onChange={ev => setDescription(ev.target.value)} />
                    </div>
                    {/*movie rating */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="rating">Movie rating</label>
                        <input type="number"
                            id="rating"
                            placeholder="rating"
                            value={rating}
                            onChange={ev => {
                                let newValue = ev.target.value <= 10.0 ? ev.target.value : 10.0;
                                newValue = newValue >= 0 ? newValue : 0;
                                setRating(newValue);
                            }}
                            step="0.1"
                            max="10.0"
                            min="0"
                        />
                    </div>
                    {/*movie duration */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="duration">Movie duration</label>
                        <input type="text"
                            id="duration"
                            placeholder="give the duration"
                            value={duration}
                            onChange={ev => setDuration(ev.target.value)} />
                    </div>
                    {/*movie watchonline */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="watchonline">Watchonline</label>
                        <input type="text"
                            id="watchonline"
                            placeholder="paste the  link"
                            value={watchonline}
                            onChange={ev => setWatchonline(ev.target.value)} />
                    </div>
                    {/*movie downloadlink */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="downloadlink">Downloadlink</label>
                        <div className="flex gap-1">
                            <div className={showInputs['480p'] ? 'dreslobtn active' :
                                'dresolbtn'} onClick={() => toggleInputVisibility('480p')}>
                                {showInputs['480p'] ? 'Hide 480p' : 'show 480p'}
                            </div>
                            <div className={showInputs['720p'] ? 'dreslobtn active' :
                                'dresolbtn'} onClick={() => toggleInputVisibility('720p')}>
                                {showInputs['720p'] ? 'Hide 720p' : 'show 720p'}
                            </div>
                            <div className={showInputs['1080p'] ? 'dreslobtn active' :
                                'dresolbtn'} onClick={() => toggleInputVisibility('1080p')}>
                                {showInputs['1080p'] ? 'Hide 1080p' : 'show 1080p'}
                            </div>
                            <div className={showInputs['4K'] ? 'dreslobtn active' :
                                'dresolbtn'} onClick={() => toggleInputVisibility('4K')}>
                                {showInputs['4K'] ? 'Hide 4K' : 'show 4K'}
                            </div>
                        </div>
                        {resolutions ? <>{resolutions.map(resolution => (
                            <div key={resolution} className="w-100">
                                {showInputs[resolution] && (
                                    <>
                                        <input type="text"
                                            id={`downloadlink${resolution}`}
                                            placeholder={`${resolution} Download link`}
                                            value={downloadlink[resolution]}
                                            onChange={ev => handleInputChange(resolution, ev.target.value)}
                                        />
                                    </>
                                )}
                            </div>
                        ))}</> : null}
                    </div>


                    {/* Movie status public ou brouillon*/}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="status">Status</label>
                        <div className="flex gap-05">
                            <input type="radio"
                                id="draft"
                                name="status"
                                value="draft"
                                checked={status === "draft"}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <label htmlFor="draft">Draft</label>
                        </div>
                        <div className="flex gap-05">
                            <input type="radio"
                                id="publish"
                                name="status"
                                value="publish"
                                checked={status === "publish"}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <label htmlFor="publish">Publish</label>
                        </div>
                    </div>
                </div>
                {/*for right side*/}
                <div className="w-50 flex flex-col flex-left">

                    {/*movie small poster*/}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="smposter">Smposter</label>
                        <input type="text"
                            id="smposter"
                            placeholder="smposter link image"
                            value={smposter}
                            onChange={ev => setSmposter(ev.target.value)}
                        />
                    </div>
                    {/*movie slug url */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="slug">Slug</label>
                        <input type="text"
                            id="slug"
                            placeholder="slug link image"
                            value={smposter}
                            onChange={handleSlugChange}
                        />
                    </div>

                    {/*realise year of the movie*/}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="year">year of realise</label>
                        <input type="text"
                            id="year"
                            placeholder="year link image"
                            value={year}
                            onChange={ev => setYear(ev.target.value)}
                        />
                    </div>

                    {/*youtube embed link */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="youtubelink">Youtubelink</label>
                        <input type="text"
                            id="youtubelink"
                            placeholder="youtubelink link image"
                            value={youtubelink}
                            onChange={ev => setYoutubelink(ev.target.value)}
                        />
                    </div>

                    {/*langue du film */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="language">language</label>
                        <select onChange={(e) => setLanguage(e.target.value)} value={language} name="language" id="language">
                            <option value="">Select language</option>
                            <option value="Francais">Francais</option>
                            <option value="English">English</option>
                            <option value="Arabe">Arabe</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Dual Audio [Hindi (ORG) + English">Dual Audio [Hindi (ORG) + English</option>
                            <option value="Dual Audio [Hindi (Cleaned) + English">Dual Audio [Hindi (Cleaned) + English</option>
                        </select>
                    </div>

                    {/*quality of the movie */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="quality">Movie quality</label>
                        <select onChange={(e) => setQuality(e.target.value)} value={quality} name="quality" id="quality">
                            <option value="">Select Quality</option>
                            <option value="480p || 720p || 1080p - WEB-DL">480p || 720p || 1080p - WEB-DL</option>
                            <option value="480p || 720p || 1080p || 2160p - WEB-DL">480p || 720p || 1080p || 2160p - WEB-DL</option>
                            <option value="480p || 720p || 1080p - HTDC">480p || 720p || 1080p - HTDC</option>

                        </select>
                    </div>

                    {/*subtitle of the movie */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="quality">Movie subtitle</label>
                        <select onChange={(e) => setSubtitle(e.target.value)} value={subtitle} name="subtitle" id="subtitle">
                            <option value="">Select subtitle</option>
                            <option value="Francais">Francais</option>
                            <option value="English">English</option>

                        </select>
                    </div>

                    {/*taille du film */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="size">Size of the movie</label>
                        <input type="text"
                            id="size"
                            placeholder="350MB || 1GB || 2GB || 4GB"
                            value={size}
                            onChange={ev => setSize(ev.target.value)}
                        />
                    </div>


                    <div className="moviecategory flex flex-sb flex-left">
                        {/* movie title category */}
                        <div className="w-50 flex flex-col flex-left mb-2">
                            <label >Title Category</label>
                            {['Movies', 'Series', 'Shows'].map((cat) => (
                                <div key={cat} className="flex gap-05">
                                    <input type="radio"
                                        id={cat.toLowerCase()}
                                        name="titlecategory"
                                        value={cat.toLowerCase()}
                                        checked={titlecategory === cat.toLowerCase()}
                                        onChange={(e) => setTitlecategory(e.target.value)}
                                    />
                                    <label htmlFor={cat.toLowerCase()}>{cat}</label>
                                </div>
                            ))}
                        </div>


                        {/*movie category */}
                        <div className="moviecategory flex flex-sb flex-left">
                            <div className="w-50 flex flex-col flex-left mb-2">
                                <label > Category :</label>
                                {categories.map((cat) => (
                                    <div key={cat} className="flex gap-05">
                                        <input type="radio"
                                            id={cat.toLowerCase()}
                                            name="category"
                                            value={cat.toLowerCase()}
                                            checked={category === cat.toLowerCase()}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                        <label htmlFor={cat.toLowerCase()}>{cat}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* movie genre */}
                        <div className="moviecategory flex flex-sb flex-left">
                            <div className="w-50 flex flex-col flex-left mb-2">
                                <label > Genre :</label>
                                {['Action', 'Adventure', 'Animation', 'Comedy', 'Drama', 'Crime', 'Fantasy',
                                    'Horror', 'Romance', 'Thriller', 'Science_Fiction'].map((genreOption) => (
                                        <label key={genreOption} className="flex gap-05">
                                            <input type="checkbox"
                                                value={genreOption.toLowerCase()}
                                                checked={genre.includes(genreOption.toLowerCase())}
                                                onChange={(e) => {
                                                    const selectedGenre = e.target.value;
                                                    setGenre((preGenre) => {
                                                        if (preGenre.includes(selectedGenre)) {
                                                            return preGenre.filter((genre) =>
                                                                genre !== selectedGenre)
                                                        } else {
                                                            return [...preGenre, selectedGenre]
                                                        }
                                                    })
                                                }}
                                            />
                                            {genreOption}
                                        </label>
                                    ))}
                            </div>
                        </div>

                    </div>


                </div>
            </div>

            {/*pour sauvegarder le donne sur mango db  */}
            <div className="w-100 mb-2">
                <button type="submit" className="w-100 flex-center">SAVE DATA</button>
            </div>


        </form>

    </>
}

