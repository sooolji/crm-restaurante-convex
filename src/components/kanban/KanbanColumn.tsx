import type { Doc, Id } from "../../../convex/_generated/dataModel";
import type { OrderStatus } from "../../lib/mock-data";
import { OrderCard } from "./OrderCard";

const COLUMN_STYLES: Record<OrderStatus, string> = {
	pending: "bg-slate-200/70",
	preparing: "bg-amber-100/70",
	ready: "bg-emerald-100/70",
	delivered: "bg-slate-100/70",
};

const DOT_COLORS: Record<OrderStatus, string> = {
	pending: "bg-slate-500",
	preparing: "bg-amber-500",
	ready: "bg-emerald-500",
	delivered: "bg-slate-400",
};

interface KanbanColumnProps {
	status: OrderStatus;
	label: string;
	orders: Doc<"orders">[];
	onMove: (orderId: Id<"orders">, next: OrderStatus) => void;
	onDragStart: (e: React.DragEvent, orderId: Id<"orders">) => void;
	onDrop: (e: React.DragEvent, status: OrderStatus) => void;
	onDragOver: (e: React.DragEvent) => void;
	isOver: boolean;
	onDragEnter: () => void;
	onDragLeave: () => void;
}

export function KanbanColumn({
	status,
	label,
	orders,
	onMove,
	onDragStart,
	onDrop,
	onDragOver,
	isOver,
	onDragEnter,
	onDragLeave,
}: KanbanColumnProps) {
	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: HTML5 drag & drop target
		<div
			onDrop={(e) => onDrop(e, status)}
			onDragOver={onDragOver}
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			className={`flex min-h-[70vh] flex-1 shrink-0 flex-col rounded-2xl p-3 transition-colors ${COLUMN_STYLES[status]} ${
				isOver ? "ring-2 ring-indigo-400" : ""
			}`}
		>
			<div className="mb-3 flex items-center justify-between px-1">
				<div className="flex items-center gap-2">
					<span className={`size-2.5 rounded-full ${DOT_COLORS[status]}`} />
					<h3 className="text-sm font-bold text-slate-800">{label}</h3>
				</div>
				<span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 shadow-sm">
					{orders.length}
				</span>
			</div>

			<div className="flex flex-1 flex-col gap-3 overflow-y-auto">
				{orders.length === 0 ? (
					<div className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-6 text-center text-xs text-slate-500">
						Arrastra un pedido aquí
					</div>
				) : (
					orders.map((order) => (
						<OrderCard
							key={order._id}
							order={order}
							onMove={onMove}
							onDragStart={onDragStart}
							dragOver={false}
						/>
					))
				)}
			</div>
		</div>
	);
}
