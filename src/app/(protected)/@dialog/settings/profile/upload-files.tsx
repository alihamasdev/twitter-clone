"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CropDialog } from "@/components/dialogs/crop.dialog";

interface UploadAvatarProps {
	defaultValue: string;
	disabled: boolean;
}

export function UploadAvatar({ defaultValue, disabled }: UploadAvatarProps) {
	const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
	const [{ files }, { openFileDialog, removeFile, getInputProps }] = useFileUpload();

	useEffect(() => {
		const currentFinalUrl = finalImageUrl;
		return () => {
			if (currentFinalUrl && currentFinalUrl.startsWith("blob:")) {
				URL.revokeObjectURL(currentFinalUrl);
			}
		};
	}, [finalImageUrl]);

	return (
		<Fragment>
			<div className="absolute -bottom-12 left-4 lg:-bottom-15">
				<Avatar className="size-25 justify-between border-6 opacity-100 lg:size-33">
					<AvatarImage src={finalImageUrl ? finalImageUrl : defaultValue} alt="avatar" className="opacity-80" />
					<Button
						size="icon"
						icon="upload"
						disabled={disabled}
						onClick={openFileDialog}
						aria-label="upload new avatar"
						className="bg-background hover:bg-background/80 absolute-center"
					/>
				</Avatar>
				<input className="sr-only" tabIndex={-1} {...getInputProps()} />
			</div>

			<CropDialog
				files={files}
				removeFileAction={removeFile}
				finalImageUrl={finalImageUrl}
				setFinalImageUrlAction={setFinalImageUrl}
				aspectRatio={1 / 1}
				outputWidth={400}
				outputHeight={400}
				className="*:data-[slot='cropper-crop-area']:rounded-full"
			/>
		</Fragment>
	);
}

interface UploadBannerProps {
	defaultValue: string | null;
	disabled: boolean;
}

export function UploadBanner({ defaultValue, disabled }: UploadBannerProps) {
	const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
	const [{ files }, { openFileDialog, removeFile, getInputProps }] = useFileUpload();

	useEffect(() => {
		const currentFinalUrl = finalImageUrl;
		return () => {
			if (currentFinalUrl && currentFinalUrl.startsWith("blob:")) {
				URL.revokeObjectURL(currentFinalUrl);
			}
		};
	}, [finalImageUrl]);

	return (
		<Fragment>
			<div className="bg-image aspect-header relative w-full overflow-hidden [&_img]:opacity-80">
				{finalImageUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={finalImageUrl} className="aspect-header w-full object-cover object-center" alt="User Header" />
				) : (
					defaultValue && (
						<Image
							src={defaultValue}
							width={600}
							height={200}
							alt="banner"
							className="aspect-header w-full object-cover"
						/>
					)
				)}

				<Button
					size="icon"
					icon="upload"
					disabled={disabled}
					onClick={openFileDialog}
					aria-label="upload new banner"
					className="bg-background hover:bg-background/80 absolute-center"
				/>

				<input className="sr-only" tabIndex={-1} {...getInputProps()} />
			</div>

			<CropDialog
				files={files}
				removeFileAction={removeFile}
				finalImageUrl={finalImageUrl}
				setFinalImageUrlAction={setFinalImageUrl}
				aspectRatio={3 / 1}
				outputWidth={1500}
				outputHeight={500}
			/>
		</Fragment>
	);
}
