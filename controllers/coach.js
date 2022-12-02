const Coach = require("../models/Coach");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const cloudinary = require("cloudinary");

// Create new coach   =>   /api/v1/admin/coach/new
exports.newCoach = catchAsyncErrors(async (req, res, next) => {
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
      folder: "coachs",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  

  const coach = await Coach.create(req.body);

  res.status(201).json({
    success: true,
    coach,
  });
});

exports.getAllCoachs = catchAsyncErrors(async (req, res, next) => {
  const coachs = await Coach.find();

  res.status(200).json({
    success: true,
    coachs,
  });
});

// Get single coach details   =>   /api/v1/coach/:id
exports.getSingleCoach = catchAsyncErrors(async (req, res, next) => {
  const coach = await Coach.findById(req.params.id);

  if (!coach) {
    return next(new ErrorHandler("Coach not found", 404));
  }

  res.status(200).json({
    success: true,
    coach,
  });
});

// Update Coach   =>   /api/v1/admin/coach/:id
exports.updateCoach = catchAsyncErrors(async (req, res, next) => {
  let coach = await Coach.findById(req.params.id);

  if (!coach) {
    return next(new ErrorHandler("Coach not found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the coach
    for (let i = 0; i < coach.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        coach.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "coachs",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  coach = await Coach.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    coach,
  });
});

// Delete Coach   =>   /api/v1/admin/coach/:id
exports.deleteCoach = catchAsyncErrors(async (req, res, next) => {
  const coach = await Coach.findById(req.params.id);

  if (!coach) {
    return next(new ErrorHandler("Coach not found", 404));
  }

  // Deleting images associated with the coach
  for (let i = 0; i < coach.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      coach.images[i].public_id
    );
  }

  await coach.remove();

  res.status(200).json({
    success: true,
    message: "Coach is deleted.",
  });
});

