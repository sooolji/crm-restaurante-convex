import { useState } from "react";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { ORDER_STATUSES, type OrderStatus } from "../../lib/mock-data";
import { KanbanColumn } from "./KanbanColumn";

interface KanbanBoardProps {
	orders: Doc<"orders">[];
	onMove: (orderId: Id<"orders">, status: OrderStatus) => void;
}

export function KanbanBoard({ orders, onMove }: KanbanBoardProps) {
	const [dragOver, setDragOver] = useState<OrderStatus | null>(null);

	const onDragStart = (e: React.DragEvent, orderId: Id<"orders">) => {
		e.dataTransfer.setData("text/plain", orderId);
		e.dataTransfer.effectAllowed = "move";
	};

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const onDrop = (e: React.DragEvent, status: OrderStatus) => {
		e.preventDefault();
		const orderId = e.dataTransfer.getData("text/plain") as Id<"orders">;
		onMove(orderId, status);
		setDragOver(null);
	};

	return (
		<div className="flex gap-4 overflow-x-auto pb-4 lg:h-full">
			{ORDER_STATUSES.map(({ value, label }) => (
				<KanbanColumn
					key={value}
					status={value}
					label={label}
					orders={orders.filter((o) => o.status === value)}
					onMove={onMove}
					onDragStart={onDragStart}
					onDrop={onDrop}
					onDragOver={onDragOver}
					isOver={dragOver === value}
					onDragEnter={() => setDragOver(value)}
					onDragLeave={() => setDragOver(null)}
				/>
			))}
		</div>
	);
}
