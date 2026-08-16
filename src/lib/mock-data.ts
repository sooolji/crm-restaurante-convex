export type OrderStatus = "pending" | "preparing" | "ready" | "delivered";
export type OrderPriority = "low" | "normal" | "high";

export const ORDER_STATUSES: { value: OrderStatus; label: string }[] = [
	{ value: "pending", label: "Pendiente" },
	{ value: "preparing", label: "En preparación" },
	{ value: "ready", label: "Listo" },
	{ value: "delivered", label: "Entregado" },
];

export const DISH_CATEGORIES = [
	"Entrantes",
	"Principales",
	"Pizzas",
	"Hamburguesas",
	"Postres",
	"Bebidas",
];

export interface NewOrderPayload {
	table: string;
	priority: OrderPriority;
	items: { name: string; qty: number }[];
	total: number;
	note?: string;
	createdAt: string;
}

export interface DishPayload {
	name: string;
	category: string;
	price: number;
	description: string;
	image: string;
	available: boolean;
}
