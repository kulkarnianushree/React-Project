import MovieItem from "./MovieItem"
const Movie = (props) =>{
    return(
        <div>
            {props.movie.map(items => (
                <li key={items.id}>
                    <MovieItem
                        title={items.title}
                        releaseDate = {items.releaseDate}
                        openingText = {items.openingText}
                    />
                </li>
            ))}
        </div>
    )
}
export default Movie