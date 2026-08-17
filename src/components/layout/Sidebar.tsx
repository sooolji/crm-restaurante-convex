import { useAuthActions } from "@convex-dev/auth/react";
import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, UtensilsCrossed, X } from "lucide-react";

const NAV_ITEMS = [
	{ to: "/", label: "Pedidos", icon: LayoutDashboard },
	{ to: "/platos", label: "Platos", icon: UtensilsCrossed },
];

interface SidebarProps {
	mobileOpen: boolean;
	onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
	const { pathname } = useLocation();
	const { signOut } = useAuthActions();

	return (
		<>
			{mobileOpen && (
				// biome-ignore lint/a11y/noStaticElementInteractions: mobile backdrop close
				// biome-ignore lint/a11y/useKeyWithClickEvents: mobile backdrop close
				<div
					className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
					onClick={onMobileClose}
				/>
			)}
			<aside
				className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col bg-slate-900 text-slate-100 transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
					mobileOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex items-center gap-3 border-b border-slate-800 px-6 py-5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-amber-500 text-slate-900">
						<UtensilsCrossed className="size-5" />
					</div>
					<div className="flex-1">
						<p className="text-sm font-bold leading-tight">Sabor Real</p>
						<p className="text-xs text-slate-400">Gestión de restaurante</p>
					</div>
					<button
						type="button"
						onClick={onMobileClose}
						className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
						aria-label="Cerrar menú"
					>
						<X className="size-5" />
					</button>
				</div>

				<nav className="flex-1 space-y-1 px-3 py-4">
					{NAV_ITEMS.map(({ to, label, icon: Icon }) => {
						const isActive = pathname === to;
						return (
							<Link
								key={to}
								to={to}
								onClick={onMobileClose}
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
					<p className="text-sm font-semibold text-emerald-400">
						12:00 – 23:00
					</p>
				</div>

				<div className="border-t border-slate-800 px-3 py-3">
					<button
						type="button"
						onClick={() => void signOut()}
						className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
					>
						<LogOut className="size-4" />
						Cerrar sesión
					</button>
				</div>
			</aside>
		</>
	);
}
