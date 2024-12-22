"use client";
import { headers } from "next/headers";
import React, { FC, useEffect, useState } from "react";
import CircleChart from "./circleChart";
import ColorsVariable from "./colorsVariable";
import { IMapData } from "@/interfaces/IMapData";
import NodeList from "./nodeList";
import ModalWindow from "./modalWindow";

interface IWidgetProps {
	mapData?: any[];
}

const WidgetComponent: FC<IWidgetProps> = ({ mapData }) => {
	const [nodeData, setNodeData] = useState<[string, unknown][] | undefined>();
	const [modalData, setModalData] = useState();
	const [isModalOpened, setModalOpened] = useState<boolean>(false);
	const colors = [
		"#1e90ff",
		"#50c878",
		"#8a2be2",
		"#ff4500",
		"#ffd700",
		"#7AA987",
	];
	useEffect(() => {
		if (mapData) {
			const groupedData = mapData?.reduce((acc, item) => {
				if (!acc[item.as]) {
					acc[item.as] = [];
				}
				acc[item.as].push(item);
				return acc;
			}, {});

			const sortedEntries = Object.entries(groupedData).sort(
				([, groupA], [, groupB]) => groupB.length - groupA.length
			);

			// Преобразуем в массив объектов
			const sortedGroupedData = sortedEntries.map(([key, value]) => ({
				name: key,
				nodes: value,
				listName: value[0]?.isp,
			}));

			setModalData(sortedGroupedData);

			const top6Entries = sortedGroupedData.slice(0, 6);

			const dataWithColors = top6Entries.map((item, index) => ({
				...item, // Распаковываем текущий объект
				color: colors[index], // Добавляем новое поле color
			}));
			// Сохраняем в стейт
			setNodeData(dataWithColors);
		}
	}, [mapData]);

	console.log(isModalOpened);

	return (
		<div className="md:mx-0 mx-auto">
			<div
				className="bg-[#0C0D0E] p-[15px] xs:p-[30px] rounded-[20px]  flex flex-col-reverse cursor-pointer active:bg-[#2b2e31] duration-150	md:hover:bg-[#0C0D0E] md:cursor-auto  md:flex-col"
				tabIndex={-1}
				onClick={(e) => {
					// Сброс фокуса с элемента

					if (window.innerWidth <= 768) {
						setModalOpened(true);
					}
				}}
			>
				<div className="flex flex-col md:flex-row md:justify-between">
					<h3 className="text-[18px]">Node Data center</h3>
					<div>
						<ColorsVariable data={nodeData} />
					</div>
				</div>
				<div className="flex items-center justify-between gap-5">
					<CircleChart data={nodeData} />
					<NodeList data={nodeData} />
				</div>

				<div className="hidden md:flex mt-6 justify-center">
					<button
						className="bg-[#9AB1CF26] text-[#9AB1CF] px-[40px] py-[4px] rounded-2xl hover:bg-[#252a3026] hover:text-[#7a7d82] duration-150"
						onClick={() => setModalOpened(true)}
					>
						View all centers
					</button>
				</div>
			</div>
			<ModalWindow
				isModalOpened={isModalOpened}
				modalData={modalData}
				setModalOpened={setModalOpened}
			/>
		</div>
	);
};

export default WidgetComponent;
