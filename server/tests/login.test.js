const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


describe('Login tests', () => {
  beforeEach(async () => {
    // Tyhjennetään mahdolliset olemassa olevat käyttäjät ennen jokaista testiä
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)

    const newUser = new User({
      name: 'Matti',
      username: 'matti@testi.com',
      passwordHash
    })

    // Luodaan käyttäjä
    await newUser.save()
  })

  test('login succeeds with valid credentials', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'matti@testi.com', password: 'salasana' })
      .expect(200)

    // Varmistetaan, että vastaus sisältää tokenin
    expect(response.body.token).toBeDefined()
  })

  test('login fails with invalid password', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'matti@testi.com', password: 'vaarasana' })
      .expect(401)

    // Voit lisätä tarkistuksen virheilmoituksesta, jos se on olemassa:
    expect(response.body.error).toBe('invalid username or password')
  })

  afterAll(async () => {
    // Sulje yhteys tietokantaan testien jälkeen
    await User.deleteMany({})
  })
})