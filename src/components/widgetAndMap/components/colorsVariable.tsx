import { IGroupedData } from "@/interfaces/IGroupData";
import React, { FC } from "react";

interface ColorsVariableProps {
	data: IGroupedData[] | null;
}
const ColorsVariable: FC<ColorsVariableProps> = ({ data }) => {
	const colors: string[] = [
		"#1e90ff",
		"#50c878",
		"#8a2be2",
		"#ff4500",
		"#ffd700",
		"#7AA987",
	];
	return (
		<div className="flex items-center gap-3 ">
			<div className="flex">
				{colors.map((item: string, index: number) => (
					<div
						key={index}
						className={`w-[20px] h-[20px] rounded-[50%]`}
						style={{
							backgroundColor: item,
							marginLeft: index > 0 ? "-13px" : 0,
						}}
					></div>
				))}
			</div>
			<p className="text-xl">{data && data.length}</p>
		</div>
	);
};

export default ColorsVariable;
