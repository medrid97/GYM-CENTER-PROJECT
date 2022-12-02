const express = require('express') ;

const router = require("express").Router();

const {
    getAllCourses,
    newCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
   

} = require('../controllers/course')




router.route('/courses').get(getAllCourses);
router.route('/course/:id').get(getSingleCourse);

router.route('/course/new').post(newCourse);

/*router.route('/course/:id')
    .put( updateCourse)
    .delete( deleteCourse);*/




module.exports = router;
