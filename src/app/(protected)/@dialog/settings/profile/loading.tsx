import { Spinner } from "@/components/ui/spinner";

export default function EditProfileLoading() {
	return (
		<div className="flex-center size-full">
			<Spinner className="mt-0" />
		</div>
	);
}
