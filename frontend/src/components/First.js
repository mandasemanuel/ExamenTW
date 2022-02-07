import React, { useState, useEffect, useMemo } from "react"
import Pagination from "./Pagination";
import Second from "./Second";
import UpdateFirst from "./UpdateFirst";
import "./First.css"
import './style.scss';

let PageSize = 5;

function First() {

    const SERVER = 'http://localhost:8080'
    
    const [field1, setField1] = useState();  
    const [field2, setField2] = useState();  

    const [firsts, setFirsts] = useState([])

    const [hidden, setHidden] = useState(true)
    const [mainFirstId, setMainFirstId] = useState()

    const [detailsHidden, setDetailsHidden] = useState(true)

    useEffect( async () => {
        const response = await fetch(`${SERVER}/app/firsts`, {
            method: 'GET'
        })
        const data = await response.json()
        setFirsts(data)
        
    }, [])




    const handleSubmitFirst = async e => {

        e.preventDefault()
        const first = {
            field1: field1,
            field2: field2
        }

        await fetch(`${SERVER}/app/firsts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(first)
        })

        const response = await fetch(`${SERVER}/app/firsts`, {
            method: 'GET'
        })
        const data = await response.json()
        setFirsts(data)
    
    }

    const handleDelete = async (firstId) => {
        await fetch(`${SERVER}/app/firsts/${firstId}`, {
            method: 'delete'
        })
        const response = await fetch(`${SERVER}/app/firsts`, {
            method: 'GET'
        })
        const data = await response.json()
        setFirsts(data)
        setHidden(true)
        setDetailsHidden(true)
    }

    const handleUpdate = async (firstId) => {
        setHidden(false)
        setMainFirstId(firstId)
    }

    const handleDetails = async (firstId) => {
        setDetailsHidden(false)
        setMainFirstId(firstId)
    }

    const handleSubmitUpdate = async () => {
        const response = await fetch(`${SERVER}/app/firsts`, {
            method: 'GET'
        })
        const data = await response.json()
        setFirsts(data)
        setHidden(true)
    }

    const [currentPage, setCurrentPage] = useState(1);


    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage-1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        if(firsts.slice(firstPageIndex, lastPageIndex).length === 0 && currentPage!==1){
            setCurrentPage(currentPage-1)
        }
        return firsts.slice(firstPageIndex, lastPageIndex);
      }, [firsts, currentPage]);


    return(
        <>
            <div className="allApp">
                <div  className='firstPage'>
                
                    <div className='addFirst-wrapper'>
                        <h3>Add first</h3>
                        <form onSubmit={handleSubmitFirst}>
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

                    <div className='firstList'>
                        <h3>Firsts</h3>
                        <ul>
                            {
                            currentTableData.map(e => (
                                <li key={e.id}>
                                {e.field1 + ", " + e.field2}
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
                            totalCount={firsts.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                    />

                    <div>
                        {hidden ? (<div></div>) : (<UpdateFirst onSubmit={handleSubmitUpdate} mainId={mainFirstId}/>)}
                    </div>
                </div>

                <div className="secondPage">
                    {detailsHidden ? (<div></div>) : (<Second mainId={mainFirstId}/>)}
                </div>


            </div>
            

        </>
    )

}

export default First