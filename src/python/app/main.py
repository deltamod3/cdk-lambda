from mangum import Mangum
from fastapi import FastAPI


app = FastAPI()


@app.get('/')
def ping():
  print('Local')
  return {'ping': 'pong'}

handler = Mangum(app)
