import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import './projectStyle.css'
import { useHistory } from 'react-router'


export const Cards = ({ id, token, users }) => {
    const history = useHistory()
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

    const cardDetail = (id) => {
        history.push(`/my_card/${id}`)
    }

    return (
        <>
            {loading ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {cardList.length > 0 && users.length > 0 ?

                        cardList.map(element => (
                            <div key={element.id} className="project" onClick={() => cardDetail(element.id)} id={element.complete ? "completed" : (new Date(String(element.due_date))).getDate() > (new Date()).getDate() ? "comming" : (new Date(String(element.due_date))).getDate() === (new Date()).getDate() ? "today" : "past"}>
                                <h2 className="heading"> {element.title}</h2>
                                <p className="extra">{console.log(element.due_date)}<span className="desc date">Due Date: </span><span className="details">{element.due_date}</span></p>
                                <div><span className="desc">Assignee: </span>{element.assignee.map(member => (
                                    <p className="extra details" key={member}>{users.find(o => o.id === member).name}</p>
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