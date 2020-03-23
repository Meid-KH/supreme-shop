const { forwardTo } = require("prisma-binding");

const Mutations = {
  //** CRUD **//

  // Create
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );
    // console.log(item);
    return item;
  },
  // Update
  async updateItem(parent, args, ctx, info) {
    // A copy of the arguments
    const updates = { ...args };
    // ...remove the ID ( you dont wanna update the ID, right ? )
    delete updates.id;
    // Run the mutation
    updatedItem = await ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
    return updatedItem;
  },
  // Delete
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title}`);
    // 2. Check if they own that item, or have the permissions
    // TODO
    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
