import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Scripts,
	useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Menu, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import ConvexProvider from "../integrations/convex/provider";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Sabor Real · CRM Restaurante",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { pathname } = useLocation();
	const isAuthPage = pathname === "/login" || pathname === "/register";

	return (
		<html lang="es">
			<head>
				<HeadContent />
			</head>
			<body>
				<ConvexProvider>
					<div className="flex min-h-screen">
						{!isAuthPage && (
							<Sidebar
								mobileOpen={mobileOpen}
								onMobileClose={() => setMobileOpen(false)}
							/>
						)}
						<div className="flex min-w-0 flex-1 flex-col bg-slate-50">
							{!isAuthPage && (
								<header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
									<button
										type="button"
										onClick={() => setMobileOpen(true)}
										className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
										aria-label="Abrir menú"
									>
										<Menu className="size-5" />
									</button>
									<div className="flex items-center gap-2">
										<div className="flex size-8 items-center justify-center rounded-lg bg-amber-500 text-slate-900">
											<UtensilsCrossed className="size-4" />
										</div>
										<p className="text-sm font-bold text-slate-900">
											Sabor Real
										</p>
									</div>
								</header>
							)}
							<main className="flex-1">{children}</main>
						</div>
					</div>
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				</ConvexProvider>
				<Scripts />
			</body>
		</html>
	);
}
