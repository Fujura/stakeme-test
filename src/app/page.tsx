import WidgetAndMap from "@/components/widgetAndMap/widgetAndMap";
import axios from "axios";

export default async function Home() {
	const { data } = await axios.get("http://72.5.42.40:3102/map-data");

	return (
		<div className="mx-4">
			<h1 className="text-xl p-6 ">Node Data center</h1>
			<WidgetAndMap mapData={data} />
		</div>
	);
}
