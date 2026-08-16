import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const orderValidator = v.object({
  table: v.string(),
  status: v.union(
    v.literal("pending"),
    v.literal("preparing"),
    v.literal("ready"),
    v.literal("delivered"),
  ),
  priority: v.union(v.literal("low"), v.literal("normal"), v.literal("high")),
  items: v.array(v.object({ name: v.string(), qty: v.number() })),
  total: v.number(),
  note: v.optional(v.string()),
  createdAt: v.string(),
});

export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("orders"),
      _creationTime: v.number(),
      ...orderValidator.fields,
    }),
  ),
  handler: async (ctx) => {
    return await ctx.db.query("orders").collect();
  },
});

export const create = mutation({
  args: {
    table: v.string(),
    priority: v.union(v.literal("low"), v.literal("normal"), v.literal("high")),
    items: v.array(v.object({ name: v.string(), qty: v.number() })),
    total: v.number(),
    note: v.optional(v.string()),
    createdAt: v.string(),
  },
  returns: v.id("orders"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", {
      table: args.table,
      status: "pending",
      priority: args.priority,
      items: args.items,
      total: args.total,
      note: args.note,
      createdAt: args.createdAt,
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("preparing"),
      v.literal("ready"),
      v.literal("delivered"),
    ),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.id);
    if (!order) {
      throw new Error("Pedido no encontrado");
    }
    await ctx.db.patch(args.id, { status: args.status });
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("orders") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});
