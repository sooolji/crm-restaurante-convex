import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { Order, OrderItem, OrderPriority } from "../../lib/mock-data";

interface OrderFormModalProps {
	open: boolean;
	onClose: () => void;
	onSave: (order: Order) => void;
}

interface DraftItem {
	id: string;
	name: string;
	qty: number;
	price: number;
}

const PRIORITIES: { value: OrderPriority; label: string }[] = [
	{ value: "low", label: "Baja" },
	{ value: "normal", label: "Normal" },
	{ value: "high", label: "Urgente" },
];

export function OrderFormModal({ open, onClose, onSave }: OrderFormModalProps) {
	const [table, setTable] = useState("");
	const [priority, setPriority] = useState<OrderPriority>("normal");
	const [note, setNote] = useState("");
	const [items, setItems] = useState<DraftItem[]>([
		{ id: crypto.randomUUID(), name: "", qty: 1, price: 0 },
	]);

	if (!open) return null;

	const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

	const updateItem = (id: string, patch: Partial<DraftItem>) =>
		setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));

	const addItem = () =>
		setItems((prev) => [
			...prev,
			{ id: crypto.randomUUID(), name: "", qty: 1, price: 0 },
		]);

	const removeItem = (id: string) =>
		setItems((prev) => prev.filter((i) => i.id !== id));

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		const cleanItems: OrderItem[] = items
			.filter((i) => i.name.trim())
			.map((i) => ({ id: i.id, name: i.name.trim(), qty: i.qty }));
		const now = new Date();
		const order: Order = {
			id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
			table: table.trim() || "Mesa",
			status: "pending",
			priority,
			items: cleanItems,
			total,
			note: note.trim() || undefined,
			createdAt: now.toLocaleTimeString("es-ES", {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};
		onSave(order);
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: modal backdrop close
		// biome-ignore lint/a11y/useKeyWithClickEvents: modal backdrop close
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
			onClick={onClose}
		>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: stop propagation */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: stop propagation */}
			<div
				className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-bold text-slate-900">Nuevo pedido</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
						aria-label="Cerrar"
					>
						<X className="size-5" />
					</button>
				</div>

				<form onSubmit={submit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="order-table"
								className="mb-1 block text-sm font-medium text-slate-700"
							>
								Mesa
							</label>
							<input
								id="order-table"
								required
								value={table}
								onChange={(e) => setTable(e.target.value)}
								placeholder="Mesa 5"
								className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
							/>
						</div>
						<div>
							<label
								htmlFor="order-priority"
								className="mb-1 block text-sm font-medium text-slate-700"
							>
								Prioridad
							</label>
							<select
								id="order-priority"
								value={priority}
								onChange={(e) => setPriority(e.target.value as OrderPriority)}
								className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
							>
								{PRIORITIES.map((p) => (
									<option key={p.value} value={p.value}>
										{p.label}
									</option>
								))}
							</select>
						</div>
					</div>

					<div>
						<div className="mb-1 flex items-center justify-between">
							<p className="block text-sm font-medium text-slate-700">Platos</p>
							<button
								type="button"
								onClick={addItem}
								className="flex items-center gap-1 rounded-lg text-xs font-semibold text-indigo-600 hover:text-indigo-700"
							>
								<Plus className="size-3.5" />
								Añadir plato
							</button>
						</div>
						<div className="space-y-2">
							{items.map((item) => (
								<div key={item.id} className="flex items-center gap-2">
									<input
										value={item.name}
										onChange={(e) =>
											updateItem(item.id, { name: e.target.value })
										}
										placeholder="Nombre del plato"
										className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
									/>
									<input
										type="number"
										min="1"
										value={item.qty}
										onChange={(e) =>
											updateItem(item.id, { qty: Number(e.target.value) })
										}
										className="w-16 rounded-lg border border-slate-300 px-2 py-2 text-sm focus:border-indigo-500 focus:outline-none"
										aria-label="Cantidad"
									/>
									<input
										type="number"
										min="0"
										step="0.01"
										value={item.price}
										onChange={(e) =>
											updateItem(item.id, { price: Number(e.target.value) })
										}
										placeholder="$"
										className="w-20 rounded-lg border border-slate-300 px-2 py-2 text-sm focus:border-indigo-500 focus:outline-none"
										aria-label="Precio unitario"
									/>
									<button
										type="button"
										onClick={() => removeItem(item.id)}
										disabled={items.length === 1}
										className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
										aria-label="Eliminar plato"
									>
										<Trash2 className="size-4" />
									</button>
								</div>
							))}
						</div>
					</div>

					<div>
						<label
							htmlFor="order-note"
							className="mb-1 block text-sm font-medium text-slate-700"
						>
							Nota
						</label>
						<textarea
							id="order-note"
							value={note}
							onChange={(e) => setNote(e.target.value)}
							rows={2}
							placeholder="Sin cebolla, sin gluten..."
							className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
						/>
					</div>

					<div className="flex items-center justify-between border-t border-slate-100 pt-4">
						<p className="text-sm text-slate-500">
							Total:{" "}
							<span className="font-bold text-slate-900">
								${total.toFixed(2)}
							</span>
						</p>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={onClose}
								className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
							>
								Crear pedido
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
