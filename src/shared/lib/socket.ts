import { io } from 'socket.io-client';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://tu-backend.com'
    : 'http://localhost:3000';

export function connectSocket(namespace: string, token?: string | null) {
  return io(`${BASE_URL}/${namespace}`, {
    transports: ['websocket'],
    autoConnect: true,
    auth: {
      token: `Bearer ${token}`, 
    },
  });
}
