import React, { useState, useCallback, useEffect } from "react";
import Movie from "./component/Movie";
import './App.css';
import MovieForm from "./component/MovieForm";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovieHandler = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://react-project-f11ae-default-rtdb.firebaseio.com/movie.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            const loadedMovies = []
            for (const key in data){
                loadedMovies.push({
                    id:key,
                    title:data[key].title,
                    openingText:data[key].openingText,
                    releaseDate:data[key].releaseDate
                })
            }
            const TransformedData = data.map(moviedata => {
                return {
                    id: moviedata.episode_id,
                    title: moviedata.title,
                    releaseDate: moviedata.release_date,
                    openingText: moviedata.opening_crawl
                };
            });
            setMovies(TransformedData);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovieHandler();
    }, [fetchMovieHandler]);

    const savedatahandler = async (movie) => {
        try {
            const response = await fetch('https://react-project-f11ae-default-rtdb.firebaseio.com/movie.json', {
                method: 'POST',
                body: JSON.stringify(movie),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to save data!');
            }
            const data = await response.json();
            console.log('Data saved:', data);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <React.Fragment>
            <MovieForm onsetdata={savedatahandler} />
            <div className="box">
                <button className="button" onClick={fetchMovieHandler}>Fetch Movies</button>
            </div>
            <div>
                {!isLoading && <Movie movie={movies} />}
                {isLoading && <p>Loading...</p>}
            </div>
        </React.Fragment>
    );
};

export default App;
