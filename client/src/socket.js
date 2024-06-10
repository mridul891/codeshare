import { io } from 'socket.io-client'

export const initSocket = async () => {
    const backend_url = import.meta.env.VITE_API_BACKEND_URL;
    return io(backend_url)
}