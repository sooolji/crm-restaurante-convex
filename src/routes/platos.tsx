import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { DishCard } from "../components/dishes/DishCard";
import { DishFormModal } from "../components/dishes/DishFormModal";
import { DISH_CATEGORIES, type Dish, initialDishes } from "../lib/mock-data";

export const Route = createFileRoute("/platos")({ component: Dishes });

function Dishes() {
	const [dishes, setDishes] = useState(initialDishes);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("Todas");
	const [modalOpen, setModalOpen] = useState(false);
	const [editing, setEditing] = useState<Dish | null>(null);
	const [toDelete, setToDelete] = useState<Dish | null>(null);

	const filtered = dishes.filter((d) => {
		const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
		const matchesCategory = category === "Todas" || d.category === category;
		return matchesSearch && matchesCategory;
	});

	const saveDish = (dish: Dish) => {
		setDishes((prev) => {
			const exists = prev.some((d) => d.id === dish.id);
			return exists
				? prev.map((d) => (d.id === dish.id ? dish : d))
				: [...prev, dish];
		});
		setModalOpen(false);
		setEditing(null);
	};

	const toggleAvailable = (id: string) => {
		setDishes((prev) =>
			prev.map((d) => (d.id === id ? { ...d, available: !d.available } : d)),
		);
	};

	const openNew = () => {
		setEditing(null);
		setModalOpen(true);
	};

	const openEdit = (dish: Dish) => {
		setEditing(dish);
		setModalOpen(true);
	};

	return (
		<div className="p-6">
			<header className="mb-6 flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-slate-900">
						Administración de platos
					</h1>
					<p className="text-sm text-slate-500">
						Gestiona el catálogo del menú.
					</p>
				</div>
				<button
					type="button"
					onClick={openNew}
					className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
				>
					<Plus className="size-4" />
					Nuevo plato
				</button>
			</header>

			<div className="mb-6 flex flex-wrap items-center gap-3">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Buscar plato..."
						className="w-64 rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none"
					/>
				</div>
				<div className="flex flex-wrap gap-2">
					{["Todas", ...DISH_CATEGORIES].map((c) => (
						<button
							key={c}
							type="button"
							onClick={() => setCategory(c)}
							className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
								category === c
									? "bg-slate-900 text-white"
									: "bg-white text-slate-600 hover:bg-slate-200"
							}`}
						>
							{c}
						</button>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filtered.map((dish) => (
					<DishCard
						key={dish.id}
						dish={dish}
						onEdit={openEdit}
						onDelete={(id) =>
							setToDelete(dishes.find((d) => d.id === id) ?? null)
						}
						onToggleAvailable={toggleAvailable}
					/>
				))}
			</div>

			{filtered.length === 0 && (
				<p className="py-16 text-center text-sm text-slate-500">
					No se encontraron platos con ese filtro.
				</p>
			)}

			<DishFormModal
				open={modalOpen}
				dish={editing}
				onClose={() => {
					setModalOpen(false);
					setEditing(null);
				}}
				onSave={saveDish}
			/>

			{toDelete && (
				// biome-ignore lint/a11y/noStaticElementInteractions: modal backdrop close
				// biome-ignore lint/a11y/useKeyWithClickEvents: modal backdrop close
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
					onClick={() => setToDelete(null)}
				>
					{/* biome-ignore lint/a11y/noStaticElementInteractions: stop propagation */}
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: stop propagation */}
					<div
						className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
						onClick={(e) => e.stopPropagation()}
					>
						<h2 className="text-lg font-bold text-slate-900">Eliminar plato</h2>
						<p className="mt-2 text-sm text-slate-500">
							¿Seguro que quieres eliminar{" "}
							<span className="font-semibold">{toDelete.name}</span>? Esta
							acción no se puede deshacer.
						</p>
						<div className="mt-4 flex justify-end gap-2">
							<button
								type="button"
								onClick={() => setToDelete(null)}
								className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
							>
								Cancelar
							</button>
							<button
								type="button"
								onClick={() => {
									setDishes((prev) => prev.filter((d) => d.id !== toDelete.id));
									setToDelete(null);
								}}
								className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
							>
								Eliminar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
