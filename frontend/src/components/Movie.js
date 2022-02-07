import React, { useState, useEffect, useMemo } from "react"
import Pagination from "./Pagination";
import "./Movie.css"
import './style.scss';
import UpdateMovie from "./UpdateMovie";
import Crew from "./Crew";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let PageSize = 5;

function Movie() {

    const SERVER = 'http://localhost:8080'
    
    const [title, setTitle] = useState("");  
    const [category, setCategory] = useState("")
    const [date, setDate] = useState( new Date() ) 

    const [movies, setMovies] = useState([])

    const [hidden, setHidden] = useState(true)
    const [mainMovieId, setMainMovieId] = useState()

    const [detailsHidden, setDetailsHidden] = useState(true)

    useEffect( async () => {
        const response = await fetch(`${SERVER}/app/movies`, {
            method: 'GET'
        })
        const data = await response.json()
        setMovies(data)
        
    }, [])

    const categories = [{
        label: 'Unspecified',
        value: 'Unspecified'
      },
      {
        label: 'action',
        value: 'action'
      },
      {
        label: 'comedy',
        value: 'comedy'
      }
    ]




    const handleSubmitMovie = async e => {
        e.preventDefault()
        if(title.length > 3 && category.length>1 && category!="Unspecifed"){
            
            const movie = {
                title: title,
                category: category,
                releaseDate: date
            }
    
            await fetch(`${SERVER}/app/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
    
            const response = await fetch(`${SERVER}/app/movies`, {
                method: 'GET'
            })
            const data = await response.json()
            setMovies(data)
        } else {
            alert("Invalid input")
        }
    }

    const handleDelete = async (movieId) => {
        await fetch(`${SERVER}/app/movies/${movieId}`, {
            method: 'delete'
        })
        const response = await fetch(`${SERVER}/app/movies`, {
            method: 'GET'
        })
        const data = await response.json()
        setMovies(data)
        setHidden(true)
        setDetailsHidden(true)
    }

    const handleUpdate = async (movieId) => {
        setHidden(false)
        setMainMovieId(movieId)
    }

    const handleDetails = async (movieId) => {
        setDetailsHidden(false)
        setMainMovieId(movieId)
    }

    const handleSubmitUpdate = async () => {
        const response = await fetch(`${SERVER}/app/movies`, {
            method: 'GET'
        })
        const data = await response.json()
        setMovies(data)
        setHidden(true)
    }

    const [currentPage, setCurrentPage] = useState(1);


    const currentTableData = useMemo(() => {
        const moviePageIndex = (currentPage-1) * PageSize;
        const lastPageIndex = moviePageIndex + PageSize;
        if(movies.slice(moviePageIndex, lastPageIndex).length === 0 && currentPage!==1){
            setCurrentPage(currentPage-1)
        }
        return movies.slice(moviePageIndex, lastPageIndex);
    }, [movies, currentPage]);

    const sortingCateg = [{
        label: 'Unspecified',
        value: 'Unspecified'
      },
      {
        label: 'title',
        value: 'title'
      },
      {
        label: 'releaseDate',
        value: 'releaseDate'
      }
    ]


    const [filter, setFilter] = useState("Unspecified")
    const [sort, setSort] = useState("Unspecified")
  
    const handleSortAndFilter = async e => {
        e.preventDefault()

        if(filter != "Unspecified" && sort!="Unspecified") {
            const response = await fetch(`${SERVER}/app/movies/${filter}/${sort}`, {
                method: 'GET'
            })
            const data = await response.json()
            setMovies(data)
        } else {
            alert("Select filter and sorting method")
        }



    }

    const handleShowAll = async () => {
        const response = await fetch(`${SERVER}/app/movies`, {
            method: 'GET'
        })
        const data = await response.json()
        setMovies(data)
        
    }


    return(
        <>
            <div className="allApp">
                <div  className='moviePage'>
                
                    <div className='addmovie-wrapper'>
                        <h3>Add movie</h3>
                        <form onSubmit={handleSubmitMovie}>
                            <label>
                                <p>Title</p>
                                <input type='text' onChange={e => setTitle(e.target.value)} />
                            </label>
                            <label>
                                <p>Category</p>
                                <select onChange={(evt) => setCategory(evt.target.value)}>
                                    {
                                        categories.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                        ))
                                    }
                                </select>
                            </label>
                            <label>
                                <p>Release date</p>
                                <DatePicker dateFormat="dd/MM/yyyy" selected={date} onChange= { (date) => setDate(date)} />
                            </label>
                            
                            <div>
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>

                    <div className='sortAndFilter'>
                        <form onSubmit={handleSortAndFilter}>
                            <div className="sortFilter">
                                <label>
                                <p>Category filter</p>
                                <select onChange={(evt) => setFilter(evt.target.value)}>
                                    {
                                        categories.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                        ))
                                    }
                                </select>
                                </label>
                                <label>
                                <p>Sort by</p>
                                <select onChange={(evt) => setSort(evt.target.value)}>
                                    {
                                        sortingCateg.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                        ))
                                    }
                                </select>
                                </label>
                            </div>
                            
                            <div>
                                <button type='submit'>Submit</button>
                                <button type='button' onClick={() => handleShowAll()}>Show all movies</button>
                            </div>
                        </form>
                    </div>

                    <div className='movieList'>
                        <h3>Movies</h3>
                        <ul>
                            {
                            currentTableData.map(e => (
                                <li key={e.id}>
                                {e.title + ", " + e.category + ", " + new Date(e.releaseDate).getFullYear()}
                                <input type='button' value='Remove' onClick={() => handleDelete(e.id)} />
                                <button type="button" onClick={() => handleUpdate(e.id)}>
                                    Update
                                </button>
                                <button type="button" onClick={() => handleDetails(e.id)}>
                                    Details
                                </button>
                                </li>
                            ))
                            }
                        </ul>

                    </div>
                    <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={movies.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                    />

                    <div>
                        {hidden ? (<div></div>) : (<UpdateMovie onSubmit={handleSubmitUpdate} mainId={mainMovieId}/>)}
                    </div>
                </div>

                <div className="secondPage">
                    {detailsHidden ? (<div></div>) : (<Crew mainId={mainMovieId}/>)}
                </div>


            </div>
            

        </>
    )

}

export default Movie