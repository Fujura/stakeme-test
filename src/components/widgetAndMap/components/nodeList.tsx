import React from "react";

const NodeList = ({ data }) => {
	if (!data) return;
	return (
		<ul className="flex flex-col gap-2">
			{data.map((item, index) => (
				<li className="flex gap-2 items-center" key={index}>
					<div
						className="w-[10px] h-[10px] rounded-sm"
						style={{ backgroundColor: item.color }}
					></div>
					<p className="text-[#7C8798] text-[13px] text-ellipsis whitespace-nowrap overflow-hidden max-w-[80px] xs:max-w-[100%]">
						{item.listName}
					</p>
				</li>
			))}
		</ul>
	);
};

export default NodeList;