import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'semantic-ui-react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import './client.css'

let client = null
export const Client = (props) => {
    const [message, setmessage] = useState([])
    const [msgData, setmsgData] = useState([])
    const [loading, setloading] = useState(true)
    const apiUrl = "http://127.0.0.1:8000/trello/comment/"
    const buttonClick = () => {
        var value = document.getElementById("clientInput").value
        const data = {
            "message": value,
            "user": props.id,
            "card": props.cardId,
        }
        axios.post(apiUrl, data, {
            headers: {
                "Authorization": props.token,
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        client.send(JSON.stringify({
            type: "message",
            msg: value,
            user: props.users.find(o => o.id === parseInt(props.id)).name,
            card: props.cardId
        }))
    }
    useEffect(() => {
        client = new W3CWebSocket('ws://127.0.0.1:8001/');
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            const dataServer = JSON.parse(message.data)
            if (dataServer.type === "message") {
                setmessage(message => [...message, { "msg": dataServer.msg, "user": dataServer.user, "card": dataServer.card }])
            }
        }
    }, [])
    useEffect(() => {
        let controller = new AbortController();
        axios.get(apiUrl, {
            headers: {
                "Authorization": props.token,
            },
            signal: controller.signal
        })
            .then(res => {
                setmsgData(res.data)
                setloading(false)
            })

        return () => controller?.abort()
    }, [apiUrl])
    useEffect(() => {
        if (!loading) {
            var data = []
            if (message.length > 0) {
                message.map(msg => {
                    data.push(msg)
                    return null
                })
            }
            for (var x = 0; x < msgData.length; x++) {
                data.push({ "msg": msgData[x].message, "user": props.users.find(o => o.id === parseInt(msgData[x].user)).name, card: parseInt(msgData[x].card) })
            }
            setmessage(data)
        }
    }, [loading])
    return (
        <>
            <div id="clientBox">
                <Card.Group id="comments">
                    {message.map(msg => (
                        parseInt(msg.card) === parseInt(props.cardId) ?
                            <Card className="clientMsg" id={msg.user === props.users.find(o => o.id === parseInt(props.id)).name ? "msgLeft" : "msgRight"} >
                                <Card.Content id="clientCard">
                                    <Card.Header>
                                        {msg.user}
                                    </Card.Header>
                                    <Card.Description id="cardMsg">
                                        {msg.msg}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            : <></>
                    ))}
                </Card.Group>
            </div>
            <div id="inputMsg">
                <input type="text" id="clientInput" />
                <button id="clientBtn" onClick={() => buttonClick()} >Send Messages</button>
            </div>
        </>
    )
}
