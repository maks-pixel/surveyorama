const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Survey } = require('../models');

  
//   router.get('/dashboard', (req, res) =>{
//       res.render("dashboard");
//   });

//   router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/dashboard');
//         return;
//       }
//     res.render('login');
//   });

//   router.post('/logout', (req, res) => {
//     if (req.session.loggedIn) {
//         req.session.destroy(() => {
//           res.status(204).end();
//         });
//       }
//       else {
//         res.status(404).end();
//       }
// });

// get all surveys of the loggedin user
router.get('/', (req, res) => {
    Survey.findAll({
        where: {
            userID: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'created_at'
        ],
        include: {
            model: User,
            attributes: ['id', 'username']
        }
    })
    .then(dbSurveyData => {
        // serialize data
        const surveys = dbSurveyData.map(survey => survey.get({ plain: true }));
        const user = {
            username: req.session.username
        }
        res.render('dashboard', { user, surveys, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/create/:id', (req, res) => {
    Survey.findOne({
        id: req.params.id,
        attributes: ['id', 'title']
    })
    .then(dbSurveyData => {
        //serialize data
        const survey = dbSurveyData.get({ plain: true });
        res.render('create-survey', { survey, loggedIn: true })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});


module.exports = router;