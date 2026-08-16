import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const dishValidator = v.object({
  name: v.string(),
  category: v.string(),
  price: v.number(),
  description: v.string(),
  image: v.string(),
  available: v.boolean(),
});

export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("dishes"),
      _creationTime: v.number(),
      ...dishValidator.fields,
    }),
  ),
  handler: async (ctx) => {
    return await ctx.db.query("dishes").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    price: v.number(),
    description: v.string(),
    image: v.string(),
    available: v.boolean(),
  },
  returns: v.id("dishes"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("dishes", {
      name: args.name,
      category: args.category,
      price: args.price,
      description: args.description,
      image: args.image,
      available: args.available,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("dishes"),
    name: v.string(),
    category: v.string(),
    price: v.number(),
    description: v.string(),
    image: v.string(),
    available: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const dish = await ctx.db.get(args.id);
    if (!dish) {
      throw new Error("Plato no encontrado");
    }
    await ctx.db.patch(args.id, {
      name: args.name,
      category: args.category,
      price: args.price,
      description: args.description,
      image: args.image,
      available: args.available,
    });
    return null;
  },
});

export const toggleAvailable = mutation({
  args: { id: v.id("dishes") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const dish = await ctx.db.get(args.id);
    if (!dish) {
      throw new Error("Plato no encontrado");
    }
    await ctx.db.patch(args.id, { available: !dish.available });
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("dishes") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});
