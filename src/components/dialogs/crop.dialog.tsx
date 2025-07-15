"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { type FileWithPreview } from "@/hooks/use-file-upload";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Cropper, CropperCropArea, CropperDescription, CropperImage } from "@/components/ui/cropper";
import { useFormField } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

type Area = { x: number; y: number; width: number; height: number };

const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.setAttribute("crossOrigin", "anonymous");
		image.src = url;
	});

async function getCroppedImg(
	imageSrc: string,
	pixelCrop: Area,
	outputWidth: number = pixelCrop.width,
	outputHeight: number = pixelCrop.height
): Promise<Blob | null> {
	try {
		const image = await createImage(imageSrc);
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		if (!ctx) return null;

		canvas.width = outputWidth;
		canvas.height = outputHeight;

		ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, outputWidth, outputHeight);

		return new Promise((resolve) => {
			canvas.toBlob(
				(blob) => {
					resolve(blob);
				},
				"image/png",
				100
			);
		});
	} catch (error) {
		console.error("Error in getCroppedImg:", error);
		return null;
	}
}

interface CropDialogProps extends Partial<React.ComponentProps<typeof Cropper>> {
	files: FileWithPreview[];
	removeFileAction: (id: string) => void;
	outputWidth?: number;
	outputHeight?: number;
	finalImageUrl: string | null;
	setFinalImageUrlAction: (value: string | null) => void;
}

export function CropDialog({
	files,
	removeFileAction,
	finalImageUrl,
	setFinalImageUrlAction,
	outputWidth,
	outputHeight,
	className,
	...props
}: CropDialogProps) {
	const [zoom, setZoom] = useState(1);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const previousFileIdRef = useRef<string | undefined | null>(null);
	const fileId = files[0]?.id;
	const previewUrl = files[0]?.preview || null;

	const { name, setFieldValue } = useFormField();

	useEffect(() => {
		if (fileId && fileId !== previousFileIdRef.current) {
			setIsDialogOpen(true);
			setCroppedAreaPixels(null);
			setZoom(1);
		}
		previousFileIdRef.current = fileId;
	}, [fileId]);

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
				removeFileAction(fileId);
				setCroppedAreaPixels(null);
			}
			return;
		}

		try {
			const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels, outputWidth, outputHeight);
			if (!croppedBlob) throw new Error("Failed to generate cropped image blob.");

			const newFinalUrl = URL.createObjectURL(croppedBlob);
			const croppedFile = new File([croppedBlob], `${name}.png`, {
				type: croppedBlob.type,
				lastModified: Date.now()
			});

			if (finalImageUrl) {
				URL.revokeObjectURL(finalImageUrl);
			}

			setFinalImageUrlAction(newFinalUrl);
			setFieldValue(croppedFile);
		} catch (error) {
			console.error("Error during apply:", error);
		} finally {
			setIsDialogOpen(false);
		}
	};

	return (
		<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<AlertDialogContent className="h-175">
				<AlertDialogHeader className="mb-0 flex-row justify-between border-b px-4 py-3">
					<div className="flex items-center gap-x-3">
						<AlertDialogCancel variant="ghost" icon="back" size="icon" />
						<AlertDialogTitle>Edit media</AlertDialogTitle>
						<AlertDialogDescription />
					</div>
					<Button size="sm" onClick={handleApply} disabled={!previewUrl}>
						Apply
					</Button>
				</AlertDialogHeader>
				{previewUrl && (
					<Cropper
						className={cn("h-140", className)}
						image={previewUrl}
						zoom={zoom}
						onCropChange={handleCropChange}
						onZoomChange={setZoom}
						{...props}
					>
						<CropperDescription />
						<CropperImage />
						<CropperCropArea />
					</Cropper>
				)}
				<AlertDialogFooter className="mt-0 shrink-0 border-t px-4 py-6">
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
	);
}
