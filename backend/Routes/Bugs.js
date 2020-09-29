const router = require('express').Router();
let Bug = require('../models/bugs.model');

router.route('/').get((req, res) => {
    Bug.find()
        .then(bugs => res.json(bugs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{
    const username = req.body.username;
    const bugTitle = req.body.bugTitle;
    const bugDescription = req.body.bugDescription;
    const dateAssigned = Date.parse(req.body.dateAssigned);

    const newBug = new Bug({
        username, 
        bugTitle,
        bugDescription,
        dateAssigned,
    });

    newBug.save()
    .then(() => res.json('Bug Added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Bug.findById(req.params.id)
      .then(bugs => res.json(bugs))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Bug.findByIdAndDelete(req.params.id)
      .then(() => res.json('Bug deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Bug.findById(req.params.id)
      .then(bugs => {
        bugs.username = req.body.username;
        bugs.bugTitle = req.body.bugTitle;
        bugs.bugDescription = req.body.bugDescription;
        bugs.dateAssigned = Date.parse(req.body.dateAssigned);
  
        bugs.save()
          .then(() => res.json('Bug updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;