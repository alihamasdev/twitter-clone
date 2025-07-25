"use client";

import { Fragment, useEffect, useState } from "react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CropDialog } from "@/components/dialogs/crop.dialog";

interface UploadAvatarProps {
	previousValue: string;
	disabled: boolean;
}

export function UploadAvatar({ previousValue, disabled }: UploadAvatarProps) {
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
					<AvatarImage src={finalImageUrl ? finalImageUrl : previousValue} alt="avatar" className="opacity-80" />
					<Button
						size="icon"
						icon="upload"
						disabled={disabled}
						onClick={openFileDialog}
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
