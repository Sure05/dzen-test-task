import { Server } from "socket.io";

let onlineUsers = [];
export default function SocketHandler(req, res) {
    // It means that socket server was already initialised
    if (res.socket.server.io) {
        console.log("Already set up");
        res.end();
        return;
    }

    const io = new Server(res.socket.server, {
        path: "/api/socket_io",
        addTrailingSlash: false
    });
    res.socket.server.io = io;

    const onConnection = (socket) => {
        // add new user
        socket.on("new-user-add", (newUserId) => {
            if(newUserId !== null) {
                if (!onlineUsers.some((user) => user.userId === newUserId)) {  // if user is not added before
                    onlineUsers.push({ userId: newUserId, socketId: socket.id });
                    console.log("new user is here!", onlineUsers);
                }
            }

            // send all active users to new user
            io.emit("list", onlineUsers);
        });

        socket.on("connected", () => {
            io.emit("list", onlineUsers);
        })

        socket.on("disconnected", () => {
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
            console.log("user disconnected", onlineUsers);
            // send all online users to all users
            io.emit("list", onlineUsers);
        });
    };

    // Define actions inside
    io.on("connection", onConnection);

    console.log("Setting up socket");
    res.end();
}
