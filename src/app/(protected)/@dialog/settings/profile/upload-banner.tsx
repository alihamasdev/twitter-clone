"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { CropDialog } from "@/components/dialogs/crop.dialog";

interface UploadBannerProps {
	previousValue: string | null;
	disabled: boolean;
}

export function UploadBanner({ previousValue, disabled }: UploadBannerProps) {
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
					previousValue && (
						<Image
							src={previousValue}
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
