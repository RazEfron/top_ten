const Business = require("../models/Business");
const textAPI = require("./textString");
const branchAPI = require("./branch");

function getBusiness(id) {
  return Business.findById(id).populate("displayName").populate("description")
}

function getManyBusinesses(condition = {}) {
  return Business.find(condition).populate("displayName").populate("description")
}

async function createBusiness(body) {
    let { displayName, description, isHidden } = body;

    displayName = await textAPI.create(displayName)
        .catch(err => { throw err })
    description = await textAPI.create(description)
        .catch(err => { throw err })
    
    return Business.create({
        displayName, 
        description,
        isHidden
    })
}

async function deleteBusiness(id) {
    let business = await Business.findById(id)

    textAPI.deleteMany([business.displayName, business.description])
        .catch(err => {throw err})

    branchAPI.deleteMany(id)
        .catch(err => {throw err})

    return Business.deleteOne({ _id: id })
}

async function updateBusiness(id, body) {
    let {  displayName, description, isHidden } = body

    let business = await Business.findById(id)
  
    if (displayName) {
      await textAPI.update(business.displayName, displayName)
        .catch((err) => {throw err});
    }

   if (description) {
      await textAPI.update(business.description, description)
        .catch((err) => {throw err});
    }

  return Business.findOneAndUpdate(
    { _id: id },
    { isHidden },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .populate("displayName")
    .populate("description");
}

module.exports = {
  get: getBusiness,
  getMany: getManyBusinesses,
  create: createBusiness,
  update: updateBusiness,
  delete: deleteBusiness,
};
