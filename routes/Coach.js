const express = require('express')

const router = require("express").Router();

const {
    getAllCoachs,
    newCoach,
    getSingleCoach,
    updateCoach,
    deleteCoach,
   

} = require('../controllers/coach')




router.route('/coachs').get(getAllCoachs);
router.route('/coach/:id').get(getSingleCoach);

router.route('/coach/new').post(newCoach);

router.route('/coach/:id')
    .put( updateCoach)
    .delete( deleteCoach);




module.exports = router;
