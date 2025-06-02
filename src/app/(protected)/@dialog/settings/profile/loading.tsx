import { Spinner } from "@/components/ui/spinner";

export default function EditProfileLoading() {
	return (
		<div className="size-full flex-center">
			<Spinner className="mt-0" />
		</div>
	);
}
