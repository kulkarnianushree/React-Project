import React, { useState,useCallback, useEffect } from "react";
import Movie from "./component/Movie";
import './App.css';
import MovieForm from "./component/MovieForm";
const App = () => {
    const [movies, setMovies] = useState([]);
    const[isLoading,setIsLoading] = useState(false)
    const fetchMovieHandler =  useCallback (async () => {
      setIsLoading(true)
        try {
            const response = await fetch('https://swapi.dev/api/films');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            const TransformedData = data.results.map(moviedata => {
                return {
                    id: moviedata.episode_id,
                    title: moviedata.title,
                    releaseDate: moviedata.release_date,
                    openingText:moviedata.opening_crawl
                };
            });
            setMovies(TransformedData);
            setIsLoading(false)
        } catch (error) {
            console.error('Error:', error);
        }
    },[]);
    useEffect(()=>{
        fetchMovieHandler();
    },[fetchMovieHandler])
    const savedatahandler = (data)=>{
        console.log(data)
    }

    return (
        <React.Fragment>
            <MovieForm onsetdata={savedatahandler}/>
            <div className="box">
                <button className="button" onClick={fetchMovieHandler}>Fetch Movies</button>
            </div>
            <div>
                {!isLoading &&<Movie movie={movies} />}
                {isLoading && <p>Loading...</p>}
            </div>
            
        </React.Fragment>
    );
};

export default App;
