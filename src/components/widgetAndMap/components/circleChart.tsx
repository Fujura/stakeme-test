import { IGroupDataColor } from "@/interfaces/IGroupDataColor";
import React, { FC } from "react";

interface CircleChartProps {
	data: IGroupDataColor[] | null;
}
const CircleChart: FC<CircleChartProps> = ({ data }) => {
	if (!data) return null;
	const total = data.reduce((sum, item) => sum + item.nodes.length, 0);

	let cumulativeValue = 0;

	return (
		<svg
			width="200"
			height="200"
			viewBox="0 0 36 36"
			xmlns="http://www.w3.org/2000/svg"
			className="w-[140px] xs:w-[200px] "
		>
			{data.map((item, index) => {
				const startAngle = (cumulativeValue / total) * 100;
				cumulativeValue += item.nodes.length;
				const endAngle = (cumulativeValue / total) * 100;

				const dashLength =
					endAngle - startAngle > 1 ? endAngle - startAngle : 1;

				return (
					<circle
						key={index}
						cx="18"
						cy="18"
						r="16"
						fill="none"
						stroke={item.color}
						strokeWidth="2"
						strokeDasharray={`${dashLength} ${100 - dashLength}`}
						strokeDashoffset={-startAngle}
						strokeLinecap="round"
						transform="rotate(-90 18 18)"
						className="animate-dash opacity-0"
					/>
				);
			})}
		</svg>
	);
};

export default CircleChart;
