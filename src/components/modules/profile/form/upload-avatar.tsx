"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";

import { useAuth } from "@/context/auth-context";
import { useFileUpload } from "@/hooks/use-file-upload";
import { getCroppedImg, type Area } from "@/utils/image.helpers";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarImage } from "@/components/modules/user";
import { Cropper, CropperCropArea, CropperDescription, CropperImage } from "@/components/ui/cropper";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter
} from "@/components/ui/alert-dialog";

export function UploadAvatar({ onChange }: { onChange: (...event: any[]) => void }) {
	const { user } = useAuth();
	const [{ files }, { openFileDialog, removeFile, getInputProps }] = useFileUpload();

	const fileId = files[0]?.id;
	const previewUrl = files[0]?.preview || null;

	const [zoom, setZoom] = useState(1);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const previousFileIdRef = useRef<string | undefined | null>(null);

	const handleCropChange = useCallback((pixels: Area | null) => {
		setCroppedAreaPixels(pixels);
	}, []);

	const handleApply = async () => {
		if (!previewUrl || !fileId || !croppedAreaPixels) {
			console.error("Missing data for apply:", {
				previewUrl,
				fileId,
				croppedAreaPixels
			});
			if (fileId) {
				removeFile(fileId);
				setCroppedAreaPixels(null);
			}
			return;
		}

		try {
			const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels, 300, 300);
			if (!croppedBlob) throw new Error("Failed to generate cropped image blob.");

			const newFinalUrl = URL.createObjectURL(croppedBlob);

			if (finalImageUrl) {
				URL.revokeObjectURL(finalImageUrl);
			}

			setFinalImageUrl(newFinalUrl);
			setIsDialogOpen(false);

			const croppedFile = new File([croppedBlob], `avatar.png`, {
				type: croppedBlob.type,
				lastModified: Date.now()
			});
			onChange(croppedFile);
		} catch (error) {
			console.error("Error during apply:", error);
			setIsDialogOpen(false);
		}
	};

	useEffect(() => {
		const currentFinalUrl = finalImageUrl;
		return () => {
			if (currentFinalUrl && currentFinalUrl.startsWith("blob:")) {
				URL.revokeObjectURL(currentFinalUrl);
			}
		};
	}, [finalImageUrl]);

	useEffect(() => {
		if (fileId && fileId !== previousFileIdRef.current) {
			setIsDialogOpen(true);
			setCroppedAreaPixels(null);
			setZoom(1);
		}
		previousFileIdRef.current = fileId;
	}, [fileId]);

	return (
		<Fragment>
			<div className="absolute -bottom-12 left-4 lg:-bottom-15">
				<Avatar className="size-25 justify-between border-6 opacity-100 lg:size-33 [&_img]:opacity-80">
					{finalImageUrl ? (
						<img src={finalImageUrl} className="aspect-square size-full object-cover" alt="User avatar" />
					) : (
						<AvatarImage src={user.avatar} />
					)}
					<Button
						size="icon"
						icon="upload"
						aria-label="Add photo"
						className="bg-background hover:bg-background/80 absolute-center"
						onClick={openFileDialog}
					/>
				</Avatar>
				<input name="avatar" className="sr-only" tabIndex={-1} onChange={onChange} {...getInputProps()} />
			</div>

			<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<AlertDialogContent className="gap-0 p-0 sm:max-w-140 *:[button]:hidden">
					<AlertDialogHeader className="mb-0 flex-row justify-between border-b px-4 py-3">
						<div className="flex items-center gap-x-3">
							<Button
								variant="ghost"
								icon="back"
								size="icon"
								aria-label="Close"
								onClick={() => setIsDialogOpen(false)}
							/>
							<AlertDialogTitle className="@lg/dialog:text-xl">Edit media</AlertDialogTitle>
							<AlertDialogDescription hidden />
						</div>
						<Button size="sm" onClick={handleApply} disabled={!previewUrl} autoFocus>
							Apply
						</Button>
					</AlertDialogHeader>
					{previewUrl && (
						<Cropper
							className="h-96 sm:h-120"
							image={previewUrl}
							zoom={zoom}
							onCropChange={handleCropChange}
							onZoomChange={setZoom}
						>
							<CropperDescription />
							<CropperImage />
							<CropperCropArea className="rounded-full" />
						</Cropper>
					)}
					<AlertDialogFooter className="mt-0 border-t px-4 py-6">
						<div className="mx-auto flex w-full max-w-80 items-center gap-4">
							<ZoomOutIcon className="text-muted-foreground shrink-0" size={16} />
							<Slider
								defaultValue={[1]}
								value={[zoom]}
								min={1}
								max={4}
								step={0.1}
								onValueChange={(value) => setZoom(value[0])}
							/>
							<ZoomInIcon className="text-muted-foreground shrink-0" size={16} />
						</div>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Fragment>
	);
}
