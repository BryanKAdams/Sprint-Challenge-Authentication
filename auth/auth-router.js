const bcrypt = require('bcryptjs');
const router = require('express').Router();
const auth = require('./auth-model');
const secrets = require('./secrets');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  let credentials = req.body;

  bcrypt.hash(credentials.password, 12, (err, hashedPassword) => {

    if(err) {
        res.status(500).json({message: "Error while hashing password", error: err});
    }

    auth.addUser({...credentials, password: hashedPassword})
      .then(creds => {
        res.status(201).json({...creds, token: generateToken(credentials)});
      })
      .catch(error => {
  
        res.status(500).json({ message: "Error while saving credentials to DB, make sure you provided the correct data for registration. Is username already in use?" });
      });
  });
});

router.post('/login', (req, res) => {

  let { username, password } = req.body;

  auth.getUserByUsername(username)
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {

      const token = generateToken(user);

      res.status(200).json( {
        message: `Welcome, ${user.username}!`,
        token,
        user_id: user.id
      })
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  })
  .catch(error => {
    res.status(500).json({ message: "Error finding user with that username" });
  });

});

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    department: user.department
    // ...otherData
  };

  const options = {
    expiresIn: '14d'
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

module.exports = router;
