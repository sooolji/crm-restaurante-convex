import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import {
	CheckCircle2,
	ClipboardList,
	DollarSign,
	Loader2,
	Plus,
	Timer,
} from "lucide-react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { KanbanBoard } from "../components/kanban/KanbanBoard";
import { OrderFormModal } from "../components/kanban/OrderFormModal";
import type { NewOrderPayload, OrderStatus } from "../lib/mock-data";

export const Route = createFileRoute("/")({ component: Dashboard });

function Dashboard() {
	const orders = useQuery(api.orders.list);
	const createOrder = useMutation(api.orders.create);
	const updateStatus = useMutation(api.orders.updateStatus);
	const [modalOpen, setModalOpen] = useState(false);

	const data = orders ?? [];

	const active = data.filter((o) => o.status !== "delivered");
	const pending = active.filter((o) => o.status === "pending");
	const delivered = data.filter((o) => o.status === "delivered");
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

	const onMove = (orderId: Id<"orders">, status: OrderStatus) => {
		void updateStatus({ id: orderId, status });
	};

	const onSaveOrder = (payload: NewOrderPayload) => {
		void createOrder(payload).then(() => setModalOpen(false));
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

			{orders === undefined ? (
				<div className="flex items-center gap-2 py-16 text-slate-500">
					<Loader2 className="size-5 animate-spin" />
					Cargando pedidos...
				</div>
			) : (
				<KanbanBoard orders={data} onMove={onMove} />
			)}

			<OrderFormModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onSave={onSaveOrder}
			/>
		</div>
	);
}
