import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

const DISHES = [
  { name: "Hamburguesa Clásica", category: "Hamburguesas", price: 12.5, description: "Carne 100% vacuno, queso cheddar, lechuga y tomate.", image: "🍔" },
  { name: "Pizza Margarita", category: "Pizzas", price: 11.9, description: "Salsa de tomate, mozzarella fresca y albahaca.", image: "🍕" },
  { name: "Ensalada César", category: "Entrantes", price: 9.9, description: "Lechuga romana, pollo, parmesano y croutons.", image: "🥗" },
  { name: "Risotto de Setas", category: "Principales", price: 14.0, description: "Arroz cremoso con setas silvestres y parmesano.", image: "🍚" },
  { name: "Tiramisú", category: "Postres", price: 6.5, description: "Bizcocho, café, mascarpone y cacao.", image: "🍰" },
  { name: "Limonada", category: "Bebidas", price: 4.0, description: "Limonada natural con hierbabuena.", image: "🍋" },
  { name: "Tacos al Pastor", category: "Principales", price: 9.5, description: "Tres tacos con piña, cilantro y cebolla.", image: "🌮" },
  { name: "Patatas Fritas", category: "Entrantes", price: 4.5, description: "Patatas crujientes con sal y pimentón.", image: "🍟" },
  { name: "Pasta Carbonara", category: "Principales", price: 13.5, description: "Espaguetis con panceta, huevo y pecorino.", image: "🍝" },
  { name: "Vino Tinto", category: "Bebidas", price: 8.0, description: "Copa de vino tinto reserva.", image: "🍷" },
];

type SeedOrder = {
  table: string;
  status: "pending" | "preparing" | "ready" | "delivered";
  priority: "low" | "normal" | "high";
  items: { name: string; qty: number }[];
  total: number;
  note?: string;
  createdAt: string;
};

const ORDERS: SeedOrder[] = [
  { table: "Mesa 3", status: "pending", priority: "high", items: [{ name: "Hamburguesa Clásica", qty: 2 }, { name: "Patatas Fritas", qty: 1 }], total: 28.5, note: "Sin cebolla", createdAt: "10:24" },
  { table: "Mesa 1", status: "pending", priority: "normal", items: [{ name: "Ensalada César", qty: 1 }, { name: "Agua Mineral", qty: 2 }], total: 18.9, createdAt: "10:31" },
  { table: "Mesa 7", status: "preparing", priority: "high", items: [{ name: "Pizza Margarita", qty: 1 }, { name: "Tiramisú", qty: 2 }], total: 26.4, createdAt: "10:15" },
  { table: "Mesa 2", status: "preparing", priority: "low", items: [{ name: "Risotto de Setas", qty: 1 }], total: 14.0, createdAt: "10:19" },
  { table: "Mesa 5", status: "ready", priority: "normal", items: [{ name: "Tacos al Pastor", qty: 3 }, { name: "Limonada", qty: 1 }], total: 19.5, createdAt: "09:52" },
  { table: "Mesa 4", status: "ready", priority: "low", items: [{ name: "Sopa de Verduras", qty: 1 }, { name: "Pan Artesanal", qty: 1 }], total: 11.2, createdAt: "10:05" },
  { table: "Mesa 6", status: "delivered", priority: "normal", items: [{ name: "Pasta Carbonara", qty: 1 }, { name: "Vino Tinto", qty: 1 }], total: 23.7, createdAt: "09:40" },
];

export const seed = internalMutation({
  args: {},
  returns: v.object({ dishes: v.number(), orders: v.number() }),
  handler: async (ctx) => {
    const existingDishes = await ctx.db.query("dishes").collect();
    for (const dish of existingDishes) {
      await ctx.db.delete(dish._id);
    }
    const existingOrders = await ctx.db.query("orders").collect();
    for (const order of existingOrders) {
      await ctx.db.delete(order._id);
    }

    for (const dish of DISHES) {
      await ctx.db.insert("dishes", { ...dish, available: true });
    }
    for (const order of ORDERS) {
      await ctx.db.insert("orders", {
        table: order.table,
        status: order.status,
        priority: order.priority,
        items: order.items,
        total: order.total,
        note: order.note,
        createdAt: order.createdAt,
      });
    }

    return { dishes: DISHES.length, orders: ORDERS.length };
  },
});
