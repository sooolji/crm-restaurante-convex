import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  dishes: defineTable({
    name: v.string(),
    category: v.string(),
    price: v.number(),
    description: v.string(),
    image: v.string(),
    available: v.boolean(),
  }).index("by_category", ["category"]),
  orders: defineTable({
    table: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("preparing"),
      v.literal("ready"),
      v.literal("delivered"),
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("normal"),
      v.literal("high"),
    ),
    items: v.array(v.object({ name: v.string(), qty: v.number() })),
    total: v.number(),
    note: v.optional(v.string()),
    createdAt: v.string(),
  }).index("by_status", ["status"]),
});
