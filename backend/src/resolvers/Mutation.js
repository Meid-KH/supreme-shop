const Mutations = {
  createDog(parent, args, ctx, info) {
    // create Dog
    global.dogs = global.dog || [];
    const newDog = { name: args.name };

    global.dogs.push(newDog);

    return newDog;
  }
};

module.exports = Mutations;
