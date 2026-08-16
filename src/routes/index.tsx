import { createFileRoute } from "@tanstack/react-router";
import {
	CheckCircle2,
	ClipboardList,
	DollarSign,
	Plus,
	Timer,
} from "lucide-react";
import { useState } from "react";
import { KanbanBoard } from "../components/kanban/KanbanBoard";
import { OrderFormModal } from "../components/kanban/OrderFormModal";
import { initialOrders, type Order } from "../lib/mock-data";

export const Route = createFileRoute("/")({ component: Dashboard });

function Dashboard() {
	const [orders, setOrders] = useState(initialOrders);
	const [modalOpen, setModalOpen] = useState(false);

	const active = orders.filter((o) => o.status !== "delivered");
	const pending = active.filter((o) => o.status === "pending");
	const delivered = orders.filter((o) => o.status === "delivered");
	const total = delivered.reduce((sum, o) => sum + o.total, 0);

	const stats = [
		{
			label: "Pedidos activos",
			value: active.length,
			icon: ClipboardList,
			color: "text-indigo-600 bg-indigo-100",
		},
		{
			label: "En cola",
			value: pending.length,
			icon: Timer,
			color: "text-amber-600 bg-amber-100",
		},
		{
			label: "Entregados hoy",
			value: delivered.length,
			icon: CheckCircle2,
			color: "text-emerald-600 bg-emerald-100",
		},
		{
			label: "Facturado hoy",
			value: `$${total.toFixed(2)}`,
			icon: DollarSign,
			color: "text-slate-700 bg-slate-200",
		},
	];

	const addOrder = (order: Order) => {
		setOrders((prev) => [order, ...prev]);
		setModalOpen(false);
	};

	return (
		<div className="p-6">
			<header className="mb-6 flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-slate-900">
						Pedidos en tiempo real
					</h1>
					<p className="text-sm text-slate-500">
						Arrastra las tarjetas entre columnas para actualizar el estado.
					</p>
				</div>
				<button
					type="button"
					onClick={() => setModalOpen(true)}
					className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
				>
					<Plus className="size-4" />
					Nuevo pedido
				</button>
			</header>

			<div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
				{stats.map(({ label, value, icon: Icon, color }) => (
					<div
						key={label}
						className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
					>
						<div
							className={`flex size-11 items-center justify-center rounded-xl ${color}`}
						>
							<Icon className="size-5" />
						</div>
						<div>
							<p className="text-xl font-bold text-slate-900">{value}</p>
							<p className="text-xs text-slate-500">{label}</p>
						</div>
					</div>
				))}
			</div>

			<KanbanBoard orders={orders} setOrders={setOrders} />

			<OrderFormModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onSave={addOrder}
			/>
		</div>
	);
}
