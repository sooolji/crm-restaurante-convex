import { useState } from "react";
import {
	ORDER_STATUSES,
	type Order,
	type OrderStatus,
} from "../../lib/mock-data";
import { KanbanColumn } from "./KanbanColumn";

interface KanbanBoardProps {
	orders: Order[];
	setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export function KanbanBoard({ orders, setOrders }: KanbanBoardProps) {
	const [dragOver, setDragOver] = useState<OrderStatus | null>(null);

	const setStatus = (orderId: string, status: OrderStatus) => {
		setOrders((prev) =>
			prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
		);
	};

	const onMove = (orderId: string, next: OrderStatus) =>
		setStatus(orderId, next);

	const onDragStart = (e: React.DragEvent, orderId: string) => {
		e.dataTransfer.setData("text/plain", orderId);
		e.dataTransfer.effectAllowed = "move";
	};

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const onDrop = (e: React.DragEvent, status: OrderStatus) => {
		e.preventDefault();
		const orderId = e.dataTransfer.getData("text/plain");
		setStatus(orderId, status);
		setDragOver(null);
	};

	const setDragOverColumn = (status: OrderStatus | null) => setDragOver(status);

	return (
		<div className="flex gap-4 pb-4">
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
					onDragEnter={() => setDragOverColumn(value)}
					onDragLeave={() => setDragOverColumn(null)}
				/>
			))}
		</div>
	);
}
