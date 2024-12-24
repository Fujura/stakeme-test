import TableRpc from "@/components/tableRpc/tableRpc";
import WidgetAndMap from "@/components/widgetAndMap/widgetAndMap";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API;
export default async function Home() {
	const { data: mapData } = await axios.get(`${API}/map-data`);
	const { data: networkData } = await axios.get(`${API}/network-data`);
	return (
		<div className="mx-4">
			<h1 className="text-xl p-6 ">Node Data center</h1>
			<WidgetAndMap mapData={mapData} />
			<TableRpc networkData={networkData.rpcs} />
		</div>
	);
}
