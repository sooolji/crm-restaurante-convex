export type OrderStatus = "pending" | "preparing" | "ready" | "delivered";
export type OrderPriority = "low" | "normal" | "high";

export interface OrderItem {
	id: string;
	name: string;
	qty: number;
}

export interface Order {
	id: string;
	table: string;
	status: OrderStatus;
	priority: OrderPriority;
	items: OrderItem[];
	total: number;
	createdAt: string;
	note?: string;
}

export interface Dish {
	id: string;
	name: string;
	category: string;
	price: number;
	description: string;
	image: string;
	available: boolean;
}

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

export const initialOrders: Order[] = [
	{
		id: "ORD-1024",
		table: "Mesa 3",
		status: "pending",
		priority: "high",
		items: [
			{ id: "i1", name: "Hamburguesa Clásica", qty: 2 },
			{ id: "i2", name: "Patatas Fritas", qty: 1 },
		],
		total: 28.5,
		createdAt: "10:24",
		note: "Sin cebolla",
	},
	{
		id: "ORD-1023",
		table: "Mesa 1",
		status: "pending",
		priority: "normal",
		items: [
			{ id: "i3", name: "Ensalada César", qty: 1 },
			{ id: "i4", name: "Agua Mineral", qty: 2 },
		],
		total: 18.9,
		createdAt: "10:31",
	},
	{
		id: "ORD-1022",
		table: "Mesa 7",
		status: "preparing",
		priority: "high",
		items: [
			{ id: "i5", name: "Pizza Margarita", qty: 1 },
			{ id: "i6", name: "Tiramisú", qty: 2 },
		],
		total: 26.4,
		createdAt: "10:15",
	},
	{
		id: "ORD-1021",
		table: "Mesa 2",
		status: "preparing",
		priority: "low",
		items: [{ id: "i7", name: "Risotto de Setas", qty: 1 }],
		total: 14.0,
		createdAt: "10:19",
	},
	{
		id: "ORD-1020",
		table: "Mesa 5",
		status: "ready",
		priority: "normal",
		items: [
			{ id: "i8", name: "Tacos al Pastor", qty: 3 },
			{ id: "i9", name: "Limonada", qty: 1 },
		],
		total: 19.5,
		createdAt: "09:52",
	},
	{
		id: "ORD-1019",
		table: "Mesa 4",
		status: "ready",
		priority: "low",
		items: [
			{ id: "i10", name: "Sopa de Verduras", qty: 1 },
			{ id: "i11", name: "Pan Artesanal", qty: 1 },
		],
		total: 11.2,
		createdAt: "10:05",
	},
	{
		id: "ORD-1018",
		table: "Mesa 6",
		status: "delivered",
		priority: "normal",
		items: [
			{ id: "i12", name: "Pasta Carbonara", qty: 1 },
			{ id: "i13", name: "Vino Tinto", qty: 1 },
		],
		total: 23.7,
		createdAt: "09:40",
	},
];

export const initialDishes: Dish[] = [
	{
		id: "d1",
		name: "Hamburguesa Clásica",
		category: "Hamburguesas",
		price: 12.5,
		description: "Carne 100% vacuno, queso cheddar, lechuga y tomate.",
		image: "🍔",
		available: true,
	},
	{
		id: "d2",
		name: "Pizza Margarita",
		category: "Pizzas",
		price: 11.9,
		description: "Salsa de tomate, mozzarella fresca y albahaca.",
		image: "🍕",
		available: true,
	},
	{
		id: "d3",
		name: "Ensalada César",
		category: "Entrantes",
		price: 9.9,
		description: "Lechuga romana, pollo, parmesano y croutons.",
		image: "🥗",
		available: true,
	},
	{
		id: "d4",
		name: "Risotto de Setas",
		category: "Principales",
		price: 14.0,
		description: "Arroz cremoso con setas silvestres y parmesano.",
		image: "🍚",
		available: true,
	},
	{
		id: "d5",
		name: "Tiramisú",
		category: "Postres",
		price: 6.5,
		description: "Bizcocho, café, mascarpone y cacao.",
		image: "🍰",
		available: true,
	},
	{
		id: "d6",
		name: "Limonada",
		category: "Bebidas",
		price: 4.0,
		description: "Limonada natural con hierbabuena.",
		image: "🍋",
		available: true,
	},
	{
		id: "d7",
		name: "Tacos al Pastor",
		category: "Principales",
		price: 9.5,
		description: "Tres tacos con piña, cilantro y cebolla.",
		image: "🌮",
		available: false,
	},
	{
		id: "d8",
		name: "Patatas Fritas",
		category: "Entrantes",
		price: 4.5,
		description: "Patatas crujientes con sal y pimentón.",
		image: "🍟",
		available: true,
	},
	{
		id: "d9",
		name: "Pasta Carbonara",
		category: "Principales",
		price: 13.5,
		description: "Espaguetis con panceta, huevo y pecorino.",
		image: "🍝",
		available: true,
	},
	{
		id: "d10",
		name: "Vino Tinto",
		category: "Bebidas",
		price: 8.0,
		description: "Copa de vino tinto reserva.",
		image: "🍷",
		available: true,
	},
];
