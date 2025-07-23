"use client";

export default function Error({ error }: { error: Error }) {
	const isDevEnv = process.env.NODE_ENV === "development";
	const errorMessage = isDevEnv ? error.message : "Something went wrong, but don't fret - let's give it another shot.";

	return (
		<section className="flex h-dvh w-full items-center justify-center">
			<h2 className="text-primary text-center text-2xl font-extrabold">{errorMessage}</h2>
		</section>
	);
}
