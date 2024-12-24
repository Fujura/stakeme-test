"use client";
import React, { useState } from "react";
import MapImage from "@/public/svg/World Map Pattern.svg";

const MapComponent = () => {
	const [scale, setScale] = useState(1);

	const zoomIn = () => setScale((prevScale) => Math.min(prevScale + 0.5, 6));
	const zoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.5, 1));

	return (
		<div className="relative overflow-hidden w-full h-[500px]">
			<div
				className="absolute top-0 left-0 w-full h-full"
				style={{
					transform: `scale(${scale})`,
					transformOrigin: "center",
					transition: "transform 0.3s ease-in-out",
				}}
			>
				<img
					src={MapImage.src}
					alt="map"
					className="w-full h-full object-cover xl:object-contain"
				/>
			</div>

			<div className="flex flex-col gap-4 items-center absolute right-4 bottom-10">
				<button
					onClick={zoomIn}
					className="bg-[#484848] text-3xl rounded-md px-4 py-6 leading-[0]"
				>
					+
				</button>
				<button
					onClick={zoomOut}
					className="bg-[#484848] text-3xl rounded-md px-4 py-6 leading-[0]"
				>
					–
				</button>
			</div>
		</div>
	);
};

export default MapComponent;
