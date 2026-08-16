import { Pencil, Trash2 } from "lucide-react";
import type { Dish } from "../../lib/mock-data";

interface DishCardProps {
	dish: Dish;
	onEdit: (dish: Dish) => void;
	onDelete: (id: string) => void;
	onToggleAvailable: (id: string) => void;
}

export function DishCard({
	dish,
	onEdit,
	onDelete,
	onToggleAvailable,
}: DishCardProps) {
	return (
		<div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
			<div className="relative flex h-28 items-center justify-center bg-slate-100 text-5xl">
				<span>{dish.image}</span>
				<span
					className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
						dish.available
							? "bg-emerald-100 text-emerald-700"
							: "bg-red-100 text-red-600"
					}`}
				>
					{dish.available ? "Disponible" : "Agotado"}
				</span>
			</div>

			<div className="flex flex-1 flex-col p-4">
				<div className="flex items-start justify-between gap-2">
					<h3 className="font-semibold text-slate-900">{dish.name}</h3>
					<span className="font-bold text-slate-900">
						${dish.price.toFixed(2)}
					</span>
				</div>
				<span className="mt-0.5 text-xs font-medium text-indigo-500">
					{dish.category}
				</span>
				<p className="mt-2 flex-1 text-sm text-slate-500">{dish.description}</p>

				<div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
					<button
						type="button"
						onClick={() => onToggleAvailable(dish.id)}
						className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
							dish.available ? "bg-emerald-500" : "bg-slate-300"
						}`}
						aria-label="Cambiar disponibilidad"
					>
						<span
							className={`inline-block size-4 transform rounded-full bg-white shadow transition-transform ${
								dish.available ? "translate-x-4" : "translate-x-0.5"
							}`}
						/>
					</button>
					<div className="flex gap-1">
						<button
							type="button"
							onClick={() => onEdit(dish)}
							className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
							aria-label="Editar"
						>
							<Pencil className="size-4" />
						</button>
						<button
							type="button"
							onClick={() => onDelete(dish.id)}
							className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
							aria-label="Eliminar"
						>
							<Trash2 className="size-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
