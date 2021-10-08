const UserModel = require('../models/user')
const { apiUserName, apiSecretkey } = require('../config')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('Users', () => {
  beforeEach((done) => {
    UserModel.deleteMany({}, (err) => {
      done()
    })
  })
  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai
        .request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })
    it('it should GET user by given id', (done) => {
      let user = new UserModel({
        username: 'Dana Scully',
        email: 'd@scully.com',
        password: 'mulder is mad',
      })
      user.save((err, user) => {
        chai
          .request(server)
          .get('/user/' + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('username')
            res.body.should.have.property('email')
            res.body.should.have.property('password')
            res.body.should.have.property('created')
            res.body.should.have.property('_id').eql(user.id)
            done()
          })
      })
    })
  })

  describe('/POST user', () => {
    it('it should create a new user', (done) => {
      let user = {
        username: 'Fox Mulder',
        email: 'fox@mulder.com',
        password: 'aliens',
      }
      chai
        .request(server)
        .post('/users')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have
            .property('message')
            .eql('User added successfully')
          res.body.user.should.have.property('username')
          res.body.user.should.have.property('email')
          res.body.user.should.have.property('password')
          res.body.user.should.have.property('created')
          done()
        })
    })
  })
})
