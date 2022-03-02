const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const path = require('path')
const mongo = require('./mongodb/mongodb')
const userCard = require('./models/users-cards')

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', '*')
  next()
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
  })
}

app.post('/payment', async (req, res) => {

    const {cardNumber, exDate, validationCode, amount} = req.body
    await mongo()

    const card = await userCard.create({
      user_id: new Date().getTime(),
      card_number: cardNumber,
      expiration_date: exDate,
      card_verify: validationCode,
      amount: amount
    })
    
    if (card) {
      res.json(card)
    } else {
      res.send('something wrong!!!')
    }
  
})


server.listen(PORT, () => console.log(PORT))