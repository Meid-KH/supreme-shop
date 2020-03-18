const Query = {
  dogs(parent, args, ctx, info) {
    global.dogs = global.dog || [];

    return global.dogs;
  }
};

module.exports = Query;
