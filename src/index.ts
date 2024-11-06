import express from 'express'
import { AppDataSource } from './config/database'
import userRoutes from './routes/user.routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api', userRoutes)

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized')
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) =>
    console.error('Error during Data Source initialization', error),
  )

export { app }
