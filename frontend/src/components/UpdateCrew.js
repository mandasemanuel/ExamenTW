import {useState} from "react"

function UpdateCrew(props) {

    const SERVER = 'http://localhost:8080'

    const { onSubmit, mainMovieId, crewId } = props;

    const [name, setName] = useState("")
    const [role, setRole] = useState("")

    const roles = [{
        label: 'Unspecified',
        value: 'Unspecified'
      },{
        label: 'actor',
        value: 'actor'
      },
      {
        label: 'director',
        value: 'director'
      },
      {
        label: 'writer',
        value: 'writer'
      }
    ]

    const handleUpdateMovie = async e => {
        e.preventDefault()
        if(name.length>5 && role.length>1 && role!="Unspecified"){
            const crew = {
                name: name,
                role: role
            }
    
            await fetch(`${SERVER}/app/movies/${mainMovieId}/crew/${crewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(crew)
            })
    
        } else {
            alert("Invalid input")
        }
        

        onSubmit()
    }

    

    return (
        <>
            <div className='updateMovie-wrapper'>
                <h3>Update selected crew member</h3>
                <form onSubmit={handleUpdateMovie}>
                    <label>
                        <p>Name</p>
                        <input type='text' onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        <p>Category</p>
                        <select onChange={(evt) => setRole(evt.target.value)}>
                            {
                                roles.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                                ))
                            }
                        </select>
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

export default UpdateCrew