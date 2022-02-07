import {useState} from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UpdateMovie(props) {

    const SERVER = 'http://localhost:8080'

    const { onSubmit, mainId } = props;

    const [title, setTitle] = useState("");  
    const [category, setCategory] = useState("")
    const [date, setDate] = useState( new Date() )


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


    const handleUpdateMovie = async e => {
        e.preventDefault()

        if(title.length > 3 && category.length>1 && category!="Unspecifed"){
            const movie = {
                title: title,
                category: category,
                releaseDate: date
            }
    
            await fetch(`${SERVER}/app/movies/${mainId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
            
        } else {
            alert("Invalid input")
        }
        onSubmit()
        
    }

    

    return (
        <>
            <div className='UpdateMovie-wrapper'>
                <h3>Update selected movie</h3>
                <form onSubmit={handleUpdateMovie}>
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
                        <button type='button' onClick={onSubmit}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateMovie