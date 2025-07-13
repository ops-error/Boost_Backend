# /signin
Принимает на вход:
- username (req.body)
- password (req.body)
- firebaseId (req.body)
- model (req.body)

# /signup
Принимает на вход:
- username (req.body) 
- password (req.body) 
 role по дефолту ставится "guest"
 devices (массив) по дефолту пустой

# /signout
Принимает на вход:
- accessToken (req.headers.authorization)
- refreshToken (req.headers.cookie)
- firebaseId (req.headers.firebaseid) 
 firebaseId на стороне клиента придется ложить в headers 