import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import './projectStyle.css'


export const Cards = ({ id, token, users }) => {
    const apiUrl = 'http://127.0.0.1:8000/trello/card/';
    const [cards, setcards] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState([])
    const cardList = []
    let myid = parseInt(id)
    useEffect(() => {
        axios.get(apiUrl, {
            headers: {
                'Authorization': token,
            }
        })
            .then(res => {
                setloading(false)
                setcards(res.data)
            })
            .catch(error => {
                if (error.response) {
                    setloading(false)
                    seterror([{ 'details': error.response.data, 'status': error.response.status }])
                }
            })
    }, [apiUrl])

    cards.map(element => {
        if (element.assignee.includes(myid)) {
            cardList.push(element)
        }
        return null
    })
    return (
        <>
            {loading ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {cardList.length > 0 && users.length > 0 ?

                        cardList.map(element => (
                            <div key={element.id} className="project">
                                <h2 className="heading"> {element.title}</h2>
                                <p className="wiki">{element.description.replaceAll('<p>', '').replaceAll('</p>', '\n')}</p>
                                <p><span className="desc">Due Date: </span><span className="details">{element.due_date}</span></p>
                                <div><span className="desc">Assignee: </span>{element.assignee.map(member => (
                                    <p className="details" key={member}>{users.find(o => o.id === member).name}</p>
                                ))}</div>
                            </div>
                        ))

                        : <p>{error.length > 0 ? error[0].details.detail : ''}</p>
                    }
                </>
            }
        </>
    )
}