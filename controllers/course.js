const Course = require("../models/Course");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const cloudinary = require("cloudinary");

// Create new course   =>   /api/v1/admin/course/new
/*exports.newCourse = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    console.log("!!!")
    images.push(req.body.images);
  } else {
    console.log("@@@")
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "courses",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    course,
  });
});*/
exports.newCourse = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body)
  let images = [];
  if (typeof req.body.images === "string") {
    console.log("!!!")
    images.push(req.body.images);
  } else {
    console.log("@@@")
    images = req.body.images;
    console.log(images)
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "courses",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    course,
  });
});


exports.getAllCourses = catchAsyncErrors(async (req, res, next) => {
  const courses = await Course.find();

  res.status(200).json({
    success: true,
    courses,
  });
});

// Get single course details   =>   /api/v1/course/:id
exports.getSingleCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  res.status(200).json({
    success: true,
    course,
  });
});

// Update course  =>   /api/v1/admin/course/:id
exports.updateCourse = catchAsyncErrors(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the course
    for (let i = 0; i < course.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        course.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "courses",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    course,
  });
});

// Delete Course  =>   /api/v1/admin/course/:id
exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  // Deleting images associated with the course
  for (let i = 0; i < course.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      course.images[i].public_id
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: "Course is deleted.",
  });
});