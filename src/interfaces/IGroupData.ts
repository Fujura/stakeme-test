import { IMapData } from "./IMapData";

export interface IGroupedData {
	name: string; // Значение `as`
	nodes: IMapData[]; // Список объектов `IMapData`
	listName: string; // Значение `isp`
	color?: string; // Цвет для отображения (опционально)
}
