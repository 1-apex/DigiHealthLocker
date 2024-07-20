import socketio
from aiohttp import web
from controllers.brain import *


sio = socketio.AsyncServer(
    cors_allowed_origins=['http://localhost:5173'],  
    cors_credentials=True,  
    cors_methods=["GET", "POST", "PUT", "DELETE"]  
)
app = web.Application()
sio.attach(app)

@sio.event
async def connect(sid, environ):
    print('Client connected:', sid)

@sio.event
async def disconnect(sid):
    print('Client disconnected:', sid)

@sio.event
async def py_client_message(sid, data):
    # print('Received message:', data)

    response = process_message(data['message'])
    # print('Sending response:', response)
    data['message'] = response
    print(response)

    await sio.emit('py_bot_response', data, to=sid)

def process_message(message):
    message = get_response(message)
    return f"{message}"

if __name__ == '__main__':
    web.run_app(app, port=5000)
