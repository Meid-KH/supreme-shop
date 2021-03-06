const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
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
  },
  async signup(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // Finalllllly we return the user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. Check if user exist already
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(
        `There is no account associated with the email: ${email}`
      );
    }
    // 2. Check if teh user password is correct
    const is_valid = await bcrypt.compare(password, user.password);
    if (!is_valid) {
      throw new Error(`Incorrect password!`);
    }
    // 3. Gen the token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookies.
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // 5. Return a message
    return user;

    // { message: "See you again 🎵🎶" };
  }
};

module.exports = Mutations;
