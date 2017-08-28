# React version

## Server
It's a simple dummy server logic, using express, redis.

To run the server side:

```
pm2 start ecosystem.config.js
```

## Curl Examples
Login:

```
curl -X POST http://localhost:3000/auth/login  -H "Content-Type: application/json" -d '{"username": "zhaolei", "password": "it is a good day"}'
```

Logout:

```
curl -X GET http://localhost:3000/auth/logout -H "Authorization: Bearer JDJhJDEwJGM0bjJVQktEMmJTaHc3ZncudFVBS3U2MFFhelhwUUI4NlcuUjNZZ2VYanVtUi8uOFRlZUhH"
```
