// // Create New Version
// router.post("/:id", async (req, res) => {
//   await ListVersion.findById(req.params.id)
//     .populate("text")
//     .populate({
//       path: "reviews",
//       populate: {
//         path: "description",
//       },
//     })
//     .exec(async function (err, listVersion) {
//       if (err) console.log(err);

//       listVersion._id = undefined;
//       listVersion.isNew = true;

//       let oldText = await TextString.findById(listVersion.text._id);

//       listVersion.text = await TextString.create({
//         hebrew: oldText.hebrew,
//         english: oldText.english,
//       });

//       let newReviews = [];
//       for (let i = 0; i < listVersion.reviews.length; i++) {
//         const review = listVersion.reviews[i];
//         let {
//           overratedCount,
//           underratedCount,
//           isHidden,
//           versionId,
//           description,
//           rating,
//           businessId,
//           dishId,
//         } = review;
//         description = await TextString.create({
//           hebrew: oldText.hebrew,
//           english: oldText.english,
//         });
//         let reviewObject = await Review.create({
//           overratedCount,
//           underratedCount,
//           isHidden,
//           versionId,
//           rating,
//           businessId,
//           dishId,
//           description,
//         });
//         console.log(reviewObject);
//         newReviews.push(reviewObject);
//       }
//       listVersion.reviews = newReviews;
//       listVersion
//         .save()
//         .then((listVersion) => res.json(listVersion))
//         .catch((err) => res.json(err));
//     });
// });
