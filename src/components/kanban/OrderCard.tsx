import { Clock, Flag, MoveLeft, MoveRight } from "lucide-react";
import type { Order, OrderStatus } from "../../lib/mock-data";

const PRIORITY_STYLES: Record<Order["priority"], string> = {
	high: "bg-red-100 text-red-700 border-red-200",
	normal: "bg-amber-100 text-amber-700 border-amber-200",
	low: "bg-slate-100 text-slate-600 border-slate-200",
};

const PRIORITY_LABEL: Record<Order["priority"], string> = {
	high: "Urgente",
	normal: "Normal",
	low: "Baja",
};

interface OrderCardProps {
	order: Order;
	onMove: (orderId: string, next: OrderStatus) => void;
	onDragStart: (e: React.DragEvent, orderId: string) => void;
	dragOver: boolean;
}

export function OrderCard({
	order,
	onMove,
	onDragStart,
	dragOver,
}: OrderCardProps) {
	const statusIndex = ["pending", "preparing", "ready", "delivered"].indexOf(
		order.status,
	);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: HTML5 draggable card
		<div
			draggable
			onDragStart={(e) => onDragStart(e, order.id)}
			className={`group cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all active:cursor-grabbing hover:shadow-md ${
				dragOver ? "ring-2 ring-indigo-300" : ""
			}`}
		>
			<div className="flex items-start justify-between gap-2">
				<div>
					<p className="font-semibold text-slate-900">{order.table}</p>
					<p className="text-xs text-slate-500">#{order.id.split("-")[1]}</p>
				</div>
				<span
					className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${PRIORITY_STYLES[order.priority]}`}
				>
					<Flag className="size-3" />
					{PRIORITY_LABEL[order.priority]}
				</span>
			</div>

			<ul className="mt-3 space-y-1">
				{order.items.map((item) => (
					<li
						key={item.id}
						className="flex justify-between text-sm text-slate-700"
					>
						<span>
							<span className="font-semibold text-slate-900">{item.qty}×</span>{" "}
							{item.name}
						</span>
					</li>
				))}
			</ul>

			{order.note && (
				<p className="mt-2 rounded-lg bg-amber-50 px-2 py-1 text-xs text-amber-700">
					Nota: {order.note}
				</p>
			)}

			<div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
				<span className="flex items-center gap-1 text-xs text-slate-500">
					<Clock className="size-3" />
					{order.createdAt}
				</span>
				<span className="font-bold text-slate-900">
					${order.total.toFixed(2)}
				</span>
			</div>

			<div className="mt-3 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
				<button
					type="button"
					onClick={() => onMove(order.id, "pending")}
					disabled={statusIndex === 0}
					className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
					aria-label="Mover atrás"
				>
					<MoveLeft className="size-4" />
				</button>
				<button
					type="button"
					onClick={() => onMove(order.id, "delivered")}
					disabled={statusIndex === 3}
					className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
					aria-label="Mover adelante"
				>
					<MoveRight className="size-4" />
				</button>
			</div>
		</div>
	);
}
