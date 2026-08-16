import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { DISH_CATEGORIES, type Dish } from "../../lib/mock-data";

interface DishFormModalProps {
	open: boolean;
	dish: Dish | null;
	onClose: () => void;
	onSave: (dish: Dish) => void;
}

const EMPTY: Omit<Dish, "id"> = {
	name: "",
	category: DISH_CATEGORIES[0],
	price: 0,
	description: "",
	image: "🍽️",
	available: true,
};

export function DishFormModal({
	open,
	dish,
	onClose,
	onSave,
}: DishFormModalProps) {
	const [form, setForm] = useState<Dish>({ id: "", ...EMPTY });

	useEffect(() => {
		if (open) {
			setForm(dish ? { ...dish } : { id: crypto.randomUUID(), ...EMPTY });
		}
	}, [open, dish]);

	if (!open) return null;

	const update = <K extends keyof Dish>(key: K, value: Dish[K]) =>
		setForm((f) => ({ ...f, [key]: value }));

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(form);
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
				className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-bold text-slate-900">
						{dish ? "Editar plato" : "Nuevo plato"}
					</h2>
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
					<div>
						<label
							htmlFor="dish-name"
							className="mb-1 block text-sm font-medium text-slate-700"
						>
							Nombre
						</label>
						<input
							required
							value={form.name}
							onChange={(e) => update("name", e.target.value)}
							className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
							placeholder="Nombre del plato"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="dish-category"
								className="mb-1 block text-sm font-medium text-slate-700"
							>
								Categoría
							</label>
							<select
								id="dish-category"
								value={form.category}
								onChange={(e) => update("category", e.target.value)}
								className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
							>
								{DISH_CATEGORIES.map((c) => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								htmlFor="dish-price"
								className="mb-1 block text-sm font-medium text-slate-700"
							>
								Precio ($)
							</label>
							<input
								id="dish-price"
								required
								type="number"
								min="0"
								step="0.01"
								value={form.price}
								onChange={(e) => update("price", Number(e.target.value))}
								className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="dish-desc"
							className="mb-1 block text-sm font-medium text-slate-700"
						>
							Descripción
						</label>
						<textarea
							id="dish-desc"
							value={form.description}
							onChange={(e) => update("description", e.target.value)}
							rows={3}
							className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
							placeholder="Descripción breve"
						/>
					</div>

					<div>
						<label
							htmlFor="dish-image"
							className="mb-1 block text-sm font-medium text-slate-700"
						>
							Icono / imagen
						</label>
						<input
							id="dish-image"
							value={form.image}
							onChange={(e) => update("image", e.target.value)}
							className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
							placeholder="🍕"
						/>
					</div>

					<div className="flex items-center justify-between border-t border-slate-100 pt-4">
						<label className="flex items-center gap-2 text-sm text-slate-700">
							<input
								type="checkbox"
								checked={form.available}
								onChange={(e) => update("available", e.target.checked)}
								className="size-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
							/>
							Disponible
						</label>
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
								Guardar
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
