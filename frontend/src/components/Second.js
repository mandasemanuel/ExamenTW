import { useState, useEffect } from "react"
import UpdateSecond from "./UpdateSecond";



const Second = (props) => {

    const SERVER = 'http://localhost:8080'
    const { mainId } = props

    const [field1, setField1] = useState();  
    const [field2, setField2] = useState();  

    const [seconds, setSeconds] = useState([])

    const [hidden, setHidden] = useState(true)
    const [mainSecondId, setMainSecondId] = useState()


    useEffect( async () => {
        const response = await fetch(`${SERVER}/app/firsts/${mainId}/seconds`, {
            method: 'GET'
        })

        if(response.statusText === "OK") {
            const data = await response.json()
            setSeconds(data)
        } else {
            setSeconds([])
        }

    }, [mainId])


    const handleSubmit = async e => {
        if(mainId != 0) {
            e.preventDefault()
            const second = {
                field1: field1,
                field2: field2
            }
            await fetch(`${SERVER}/app/firsts/${mainId}/seconds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(second)
            })
    
            const response = await fetch(`${SERVER}/app/firsts/${mainId}/seconds`, {
                method: 'GET'
            })
            const data = await response.json()
            setSeconds(data)
        } 
    }

    const handleDelete = async (secondId) => {
        await fetch(`${SERVER}/app/firsts/${mainId}/seconds/${secondId}`, {
            method: 'delete'
        })
        const response = await fetch(`${SERVER}/app/firsts/${mainId}/seconds`, {
            method: 'GET'
        })
        if(response.statusText === "OK") {
            const data = await response.json()
            setSeconds(data)
        } else {
            setSeconds([])
        }
        setHidden(true)
    }

    const handleUpdate = async (secondId) => {
        setHidden(false)
        setMainSecondId(secondId)
    }

    const handleSubmitUpdate = async () => {
        const response = await fetch(`${SERVER}/app/firsts/${mainId}/seconds`, {
            method: 'GET'
        })
        if(response.statusText === "OK") {
            const data = await response.json()
            setSeconds(data)
        } else {
            setSeconds([])
        }
        setHidden(true)
    }

    return (
        <>
            <div>
                <h3>Add second</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Field1</p>
                        <input type='text' onChange={e => setField1(e.target.value)} />
                    </label>
                    <label>
                        <p>Field2</p>
                        <input type='text' onChange={e => setField2(e.target.value)} />
                    </label>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>

            <div>
                <h3>All seconds</h3>
                <ul>
                    {
                    seconds.map(e => (
                        <li key={e.id}>
                        {e.field1 + ", " + e.field2}
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
                {hidden ? (<div></div>) : (<UpdateSecond onSubmit={handleSubmitUpdate} mainFirstId={mainId} secondId={mainSecondId}/>)}
            </div>
        </>
    )
}

export default Second