const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Team = require('../../models/Team');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');

router.post(
  '/',
  [
    check('teamName', 'TeamName is required').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 6 characters or more'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log('are you coming here');
    const errors = validationResult(req);
    // console.log(errors.isEmpty());
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("first"+req.body);
    const { teamName, password } = req.body;
    console.log("second"+teamName);
    try {
      let team = await Team.findOne({
        teamName: teamName,
      });
      console.log("third"+team.password);
      const salt = await bcrypt.genSalt(10);
      const password2 = await bcrypt.hash(password, salt);
      console.log("fourth"+password2);
      team.password = password2;
      await team.save();
      console.log("fifth"+team.password);
      console.log('Users Created');
      console.log('hello' + team);
      const payload = {
        team: {
          id: team.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log('Here is the error');
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
