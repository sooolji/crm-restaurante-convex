import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, UtensilsCrossed } from "lucide-react";

const NAV_ITEMS = [
	{ to: "/", label: "Pedidos", icon: LayoutDashboard },
	{ to: "/platos", label: "Platos", icon: UtensilsCrossed },
];

export function Sidebar() {
	const { pathname } = useLocation();

	return (
		<aside className="flex w-64 shrink-0 flex-col bg-slate-900 text-slate-100">
			<div className="flex items-center gap-3 border-b border-slate-800 px-6 py-5">
				<div className="flex size-10 items-center justify-center rounded-xl bg-amber-500 text-slate-900">
					<UtensilsCrossed className="size-5" />
				</div>
				<div>
					<p className="text-sm font-bold leading-tight">Sabor Real</p>
					<p className="text-xs text-slate-400">Gestión de restaurante</p>
				</div>
			</div>

			<nav className="flex-1 space-y-1 px-3 py-4">
				{NAV_ITEMS.map(({ to, label, icon: Icon }) => {
					const isActive = pathname === to;
					return (
						<Link
							key={to}
							to={to}
							className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
								isActive
									? "bg-slate-800 text-amber-400"
									: "text-slate-300 hover:bg-slate-800/60 hover:text-white"
							}`}
						>
							<Icon className="size-4" />
							{label}
						</Link>
					);
				})}
			</nav>

			<div className="border-t border-slate-800 px-6 py-4">
				<p className="text-xs text-slate-400">Abierto hoy</p>
				<p className="text-sm font-semibold text-emerald-400">12:00 – 23:00</p>
			</div>
		</aside>
	);
}
