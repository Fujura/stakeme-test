import React, { FC } from "react";
import WidgetComponent from "./components/widgetComponent";
import MapComponent from "./components/mapComponent";
import { IMapData } from "@/interfaces/IMapData";

interface WidgetAndMapProps {
	mapData: IMapData[];
}

const WidgetAndMap: FC<WidgetAndMapProps> = async ({ mapData }) => {
	return (
		<div className="flex flex-col-reverse items-start md:flex-row mt-10">
			{mapData && <WidgetComponent mapData={mapData} />}
			<MapComponent />
		</div>
	);
};

export default WidgetAndMap;
