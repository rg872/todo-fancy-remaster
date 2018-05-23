const User = require('../models/users.model')
const createToken = require('../helpers/jwt.helper')
const { decryptPassword } = require('../helpers/password.helper')

module.exports = {
    signUp (req, res) {
      req.body = Object.assign({
        exp: 0,
        lvl: 1,
        hp: 50,
        atk: 10,
        todos: [],
        title: 'rookie'
      }, req.body)      
      let user = new User(req.body)
      let error = user.validateSync()
      if (error) {
        res.status(400).json({
          message: error.message
        })
      } else {
        user.save()
        .then(user => {
          let token = createToken({email: user.email})
          res.header({
            'Access-Control-Expose-Headers': 'token',
            token
          })
          res.status(200).json({
              message: 'Success create user',
              exp: user.exp,
              lvl: user.lvl,
              hp: user.hp,
              atk: user.atk,
              todos: user.todos,
              title: user.title
          })
        })
        .catch(err => {
          res.status(500).json({
            message: err.errmsg
          })
        })  
      }
    },

    signIn (req, res) {
      let { email, password } = req.body
      User.findOne({email})
      .populate('todos')
      .then(user => {
        if(user) {
          if (decryptPassword(password, user.password)){
            let token = createToken({email: user.email})
            res.header({
            'Access-Control-Expose-Headers': 'token',
            token
          })
            res.status(200).json({
                message: 'Success signin user',
                exp: user.exp,
                lvl: user.lvl,
                hp: user.hp,
                atk: user.atk,
                todos: user.todos,
                title: user.title
            })
          } else {
            res.status(400).json({
              message: 'wrong password is inputed'
            })
          }
        } else {
          res.status(400).json({
            message: 'cant find user, invalid email'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err.errmsg
        })
      })
    },
    
    oAuth (req, res) {      
      let { email } = req.body
      User.findOne({ email})
      .populate('todos')
      .then((user)=>{               
        if(user){
          let token = createToken({email: user.email})
          res.header({
              'Access-Control-Expose-Headers': 'token',
              token
          }) 
          res.status(200).json({
            message:'oauth signin succeed',
            exp: user.exp,
            lvl: user.lvl,
            hp: user.hp,
            atk: user.atk,
            todos: user.todos,
            title: user.title
          })
        } else {
          User.create({
            email, 
            password: process.env.OAUTH_USER_PASS,
            exp: 0,
            lvl: 1,
            hp: 50,
            atk: 10,
            todos: [],
            title: 'rookie'
          })
          .then((user)=>{
            let token = createToken({email: user.email})
            res.header({
                'Access-Control-Expose-Headers': 'token',
                token
            }) 
            res.status(200).json({
              message:'Success create user from oauth',
              exp: user.exp,
              lvl: user.lvl,
              hp: user.hp,
              atk: user.atk,
              todos: user.todos,
              title: user.title
            })
          })
        }

      })
      .catch((err)=>{
        console.log(err);
        
        res.status(500).json({
          message: err.errmsg
        })
      })
    },

    getUser: function(req, res){
      let {email} = req.payload
  
        User.findOne({email})
        .populate('todos')
        .then((user)=>{  
          res.status(200).json({
            message:'Succeed get user data',
            exp: user.exp,
            lvl: user.lvl,
            hp: user.hp,
            atk: user.atk,
            todos: user.todos,
            title: user.title
          });   

        })
        .catch((err)=>{

          res.status(500).json({
            message:'Server error',
            err: err
          });

        });
    },

    updateTitle: function(req, res){
      let { email } = req.payload
      let { title } = req.body
      console.log(email, title);
      
        User.findOneAndUpdate({email}, {title})
        .populate('todos')
        .then((user)=>{  
          res.status(200).json({
            message:'Succeed get user data',
            exp: user.exp,
            lvl: user.lvl,
            hp: user.hp,
            atk: user.atk,
            todos: user.todos,
            title: user.title
          });   

        })
        .catch((err)=>{
          console.log(err);
          
          res.status(500).json({
            message:'Server error',
            err: err
          });

        });
    }
}