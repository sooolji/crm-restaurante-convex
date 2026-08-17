import { UtensilsCrossed } from "lucide-react";
import type { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
			<div className="w-full max-w-md">
				<div className="mb-6 flex items-center justify-center gap-3">
					<div className="flex size-12 items-center justify-center rounded-xl bg-amber-500 text-slate-900">
						<UtensilsCrossed className="size-6" />
					</div>
					<div>
						<p className="text-lg font-bold leading-tight text-slate-900">
							Sabor Real
						</p>
						<p className="text-sm text-slate-500">CRM Restaurante</p>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}
