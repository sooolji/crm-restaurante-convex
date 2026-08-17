import { useAuthActions, useConvexAuth } from "@convex-dev/auth/react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { ConvexError } from "convex/values";
import { Loader2, LogIn } from "lucide-react";
import { type FormEvent, useState } from "react";
import { AuthLayout } from "../components/auth/AuthLayout";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
	const { signIn } = useAuthActions();
	const { isAuthenticated, isLoading } = useConvexAuth();
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setSubmitting(true);
		const formData = new FormData(event.currentTarget);
		formData.set("flow", "signIn");
		void signIn("password", formData)
			.catch((err: unknown) => {
				setError(
					err instanceof ConvexError && typeof err.data === "string"
						? err.data
						: "No se pudo iniciar sesión. Inténtalo de nuevo.",
				);
			})
			.finally(() => setSubmitting(false));
	};

	if (isLoading) {
		return (
			<AuthLayout>
				<div className="flex items-center justify-center gap-2 py-16 text-slate-500">
					<Loader2 className="size-5 animate-spin" />
					Cargando...
				</div>
			</AuthLayout>
		);
	}

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}

	return (
		<AuthLayout>
			<div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
				<h1 className="text-xl font-bold text-slate-900">Iniciar sesión</h1>
				<p className="mt-1 text-sm text-slate-500">
					Accede a la gestión de pedidos y platos.
				</p>

				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
					<div>
						<label
							htmlFor="email"
							className="mb-1.5 block text-sm font-medium text-slate-700"
						>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							autoComplete="email"
							placeholder="tu@correo.com"
							className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="mb-1.5 block text-sm font-medium text-slate-700"
						>
							Contraseña
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							autoComplete="current-password"
							placeholder="••••••••"
							className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
						/>
					</div>

					{error && (
						<p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
							{error}
						</p>
					)}

					<button
						type="submit"
						disabled={submitting}
						className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{submitting ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							<LogIn className="size-4" />
						)}
						{submitting ? "Iniciando sesión..." : "Iniciar sesión"}
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-slate-500">
					¿No tienes cuenta?{" "}
					<Link
						to="/register"
						className="font-medium text-indigo-600 hover:text-indigo-700"
					>
						Regístrate
					</Link>
				</p>
			</div>
		</AuthLayout>
	);
}
