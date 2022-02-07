import {useState} from "react"

function UpdateSecond(props) {

    const SERVER = 'http://localhost:8080'

    const { onSubmit, mainFirstId, secondId } = props;

    const [field1, setField1] = useState();  
    const [field2, setField2] = useState();  


    const handleUpdateFirst = async e => {
        e.preventDefault()
        const second = {
            field1: field1,
            field2: field2
        }

        await fetch(`${SERVER}/app/firsts/${mainFirstId}/seconds/${secondId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(second)
        })


        onSubmit()
    }

    

    return (
        <>
            <div className='updateFirst-wrapper'>
                <h3>Update second</h3>
                <form onSubmit={handleUpdateFirst}>
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
                        <button type='button' onClick={onSubmit}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateSecond