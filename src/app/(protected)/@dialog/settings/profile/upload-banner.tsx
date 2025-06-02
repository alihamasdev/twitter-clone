"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { type User } from "@prisma/client";
import { type ControllerRenderProps } from "react-hook-form";

import { type ProfileSchema } from "@/lib/validation";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { CropDialog } from "@/components/dialogs/crop.dialog";

interface UploadBannerProps {
	field: ControllerRenderProps<ProfileSchema, "banner">;
	previousValue: User["bannerUrl"];
}

export function UploadBanner({ field, previousValue }: UploadBannerProps) {
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
					onClick={openFileDialog}
					className="bg-background hover:bg-background/80 absolute-center"
				/>

				<input name={field.name} className="sr-only" tabIndex={-1} {...getInputProps()} />
			</div>

			<CropDialog
				files={files}
				removeFileAction={removeFile}
				finalImageUrl={finalImageUrl}
				setFinalImageUrlAction={setFinalImageUrl}
				formChangeAction={field.onChange}
				fileName={`banner.png`}
				aspectRatio={3 / 1}
				outputWidth={1500}
				outputHeight={500}
			/>
		</Fragment>
	);
}
