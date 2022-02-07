import { useState, useEffect } from "react"
import UpdateCrew from "./UpdateCrew";



const Crew = (props) => {

    const SERVER = 'http://localhost:8080'
    const { mainId } = props

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

    const [crew, setCrew] = useState([])

    const [hidden, setHidden] = useState(true)
    const [mainCrewId, setMainCrewId] = useState()


    useEffect( async () => {
        const response = await fetch(`${SERVER}/app/movies/${mainId}/crew`, {
            method: 'GET'
        })

        if(response.statusText === "OK") {
            const data = await response.json()
            setCrew(data)
        } else {
            setCrew([])
        }

    }, [mainId])


    const handleSubmit = async e => {
        if(mainId != 0) {
            e.preventDefault()
            if(name.length>5 && role.length>1 && role != "Unspecified") {
                const crew = {
                    name: name,
                    role: role
                }
                await fetch(`${SERVER}/app/movies/${mainId}/crew`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(crew)
                })
        
                const response = await fetch(`${SERVER}/app/movies/${mainId}/crew`, {
                    method: 'GET'
                })
                const data = await response.json()
                setCrew(data)
            } else {
                alert("Invalid input")
            }
           
        } 
    }

    const handleDelete = async (CrewId) => {
        await fetch(`${SERVER}/app/movies/${mainId}/crew/${CrewId}`, {
            method: 'delete'
        })
        const response = await fetch(`${SERVER}/app/movies/${mainId}/crew`, {
            method: 'GET'
        })
        if(response.statusText === "OK") {
            const data = await response.json()
            setCrew(data)
        } else {
            setCrew([])
        }
        setHidden(true)
    }

    const handleUpdate = async (CrewId) => {
        setHidden(false)
        setMainCrewId(CrewId)
    }

    const handleSubmitUpdate = async () => {
        const response = await fetch(`${SERVER}/app/movies/${mainId}/crew`, {
            method: 'GET'
        })
        if(response.statusText === "OK") {
            const data = await response.json()
            setCrew(data)
        } else {
            setCrew([])
        }
        setHidden(true)
    }

    return (
        <>
            <div>
                <h3>Add Crew</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Name</p>
                        <input type='text' onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        <p>Role</p>
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
                    </div>
                </form>
            </div>

            <div>
                <h3>All Crew</h3>
                <ul>
                    {
                    crew.map(e => (
                        <li key={e.id}>
                        {e.name + ", " + e.role}
                        <input type='button' value='Remove' onClick={() => handleDelete(e.id)} />
                        <button type="button" onClick={() => handleUpdate(e.id)}>
                            Update
                        </button>
                        </li>
                    ))
                    }
                </ul>
            </div>
            <div>
                {hidden ? (<div></div>) : (<UpdateCrew onSubmit={handleSubmitUpdate} mainMovieId={mainId} crewId={mainCrewId}/>)}
            </div>
        </>
    )
}

export default Crew