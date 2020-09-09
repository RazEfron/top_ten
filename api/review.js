const Review = require("../models/Review");
const textAPI = require("./textString");

function getReview(id) {
  return Review.findById(id)
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
        path: "description",
      },
    })
    .populate({
      path: "dishId",
      populate: {
        path: "name",
        path: "description",
      },
    })
    .populate({
      path: "versionId",
      populate: {
        path: "listId",
        populate: {
          path: "name",
          path: "description",
        },
      },
    });
}

function getManyReviews(condition = {}) {
  return Review.find(condition)
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
        path: "description",
      },
    })
    .populate({
      path: "dishId",
      populate: {
        path: "name",
        path: "description",
      },
    })
    .populate({
      path: "versionId",
      populate: {
        path: "listId",
        populate: {
          path: "name",
          path: "description",
        },
      },
    });
}

async function createReview(body) {
  let {
    versionId,
    description,
    rating,
    businessId,
    dishId,
    isHidden,
  } = body;

  description = await textAPI.create(description).catch((err) => {
    throw err;
  });

  let review = await Review.create({
    versionId,
    description,
    rating,
    businessId,
    dishId,
    isHidden,
  });

  let listVersion = await ListVersion.findOne({ _id: review.versionId });
  listVersion.reviews.push(review);
  await listVersion.save().catch((err) => {
    throw err;
  });

  return review;
}

async function deleteReview(id) {
  let review = await Review.findById(id);

  textAPI.delete(review.description).catch((err) => {
    throw err;
  });

  return Review.deleteOne({ _id: id });
}

async function updateReview(id, body) {
  let { versionId, description, rating, businessId, dishId, isHidden } = body;

  let review = await Review.findById(id);

  if (description) {
    await textAPI.update(review.description, description).catch((err) => {
      throw err;
    });
  }

  return Review.findOneAndUpdate(
    { _id: id },
    { versionId, rating, businessId, dishId, isHidden }
  )
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
        path: "description",
      },
    })
    .populate({
      path: "dishId",
      populate: {
        path: "name",
        path: "description",
      },
    })
    .populate({
      path: "versionId",
      populate: {
        path: "listId",
        populate: {
          path: "name",
          path: "description",
        },
      },
    });
}

function deleteReviews(array) {
  return Review.deleteMany({ _id: { $in: array } });
}

function updateRating(id, body) {
  const { overratedCount, underratedCount } = body;

  return Review.findOneAndUpdate(
    { _id: id },
    { overratedCount, underratedCount }
  )
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
        path: "description",
      },
    })
    .populate({
      path: "dishId",
      populate: {
        path: "name",
        path: "description",
      },
    })
    .populate({
      path: "versionId",
      populate: {
        path: "listId",
        populate: {
          path: "name",
          path: "description",
        },
      },
    });
}

module.exports = {
  get: getReview,
  getMany: getManyReviews,
  create: createReview,
  update: updateReview,
  delete: deleteReview,
  deleteMany: deleteReviews,
  updateRating,
};
