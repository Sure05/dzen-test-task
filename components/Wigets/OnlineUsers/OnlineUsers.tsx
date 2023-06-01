'use client';
import React, {useEffect, useRef, useState} from "react";

import {io, type Socket} from "socket.io-client";
import {getUserId} from "@/utils/user";

let socket: Socket | null = null;

const OnlineUsers = () => {
    const [count, setCount] = useState<number | null>(null);
    useEffect(() => {
        socketInitializer();
        return () => {
            if (socket)
                socket.disconnect()
        }
    }, [])

    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io('', {
            path: '/api/socket_io',
        });

        socket.on('list', (count) => {
            setCount(count.length)
        })

        socket.emit('new-user-add',
            getUserId(),
        )
    }
    if(!count) return null

    return (
        <div className="d-flex align-items-end" style={{paddingLeft: 15}}>
        Online users: {count}
        </div>

    )
}

export default OnlineUsers
