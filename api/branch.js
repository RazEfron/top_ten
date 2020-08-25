const Branch = require("../models/Branch");

function getBranch(id) {
  return Branch.findById(id);
}

function getManyBranches(condition = {}) {
  return Branch.find(condition);
}

function createBranch(body) {
  return Branch.create(body);
}

function deleteBranch(id) {
  return Branch.deleteOne({ _id: id });
}

function updateBranch(id, body) {
  return Branch.findOneAndUpdate({ _id: id }, body, {
    new: true,
    useFindAndModify: false,
  });
}

function deleteBranches(businessId) {
  return Branch.deleteMany({ businessId });
}

module.exports = {
  get: getBranch,
  getMany: getManyBranches,
  create: createBranch,
  update: updateBranch,
  delete: deleteBranch,
  deleteMany: deleteBranches,
};
