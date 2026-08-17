import { useConvexAuth } from "@convex-dev/auth/react";
import { Navigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function RequireAuth({ children }: { children: ReactNode }) {
	const { isAuthenticated, isLoading } = useConvexAuth();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center gap-2 py-16 text-slate-500">
				<Loader2 className="size-5 animate-spin" />
				Comprobando sesión...
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return children;
}
