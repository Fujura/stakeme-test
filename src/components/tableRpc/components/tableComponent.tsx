import { INetworkData } from "@/interfaces/INetworkData";
import React, { FC } from "react";
import DisplayIP from "./dispayIP";
import boxIcon from "@/public/svg/box.svg";
import userIcon from "@/public/svg/user.svg";
import nodeOnIcon from "@/public/svg/nodeOn.svg";
import nodeOffIcon from "@/public/svg/nodeOff.svg";

interface TableRpcProps {
	networkData: INetworkData["cosmos"] | INetworkData["evm"];
}
const TableComponent: FC<TableRpcProps> = ({ networkData }) => {
	return (
		<div className="">
			<ul className="md:p-4 flex justify-center flex-col">
				{networkData.map((item, index) => (
					<li
						key={index}
						className="active:bg-[#0B0B0B] focus:bg-[#0B0B0B] px-[15px] py-[20px] relative h-max md:flex md:items-center  md:justify-between  "
					>
						<DisplayIP data={item} />

						<div className="hidden md:flex items-center justify-between w-[70vw]">
							<div className="flex gap-1 xs:gap-2 text-[#89C4FF] w-[180px] whitespace-nowrap ">
								<img src={userIcon.src} alt="box icon" />
								<p className="text-[18px] overflow-hidden text-ellipsis">
									{item.noder.moniker}
								</p>
							</div>

							<div className="flex gap-2 text-[#89C4FF]">
								<img src={boxIcon.src} alt="box icon" />
								<p className="text-[18px]">{item.uptime}</p>
							</div>

							<div className="flex gap-2 ">
								<img
									src={item.tx_index == "on" ? nodeOnIcon.src : nodeOffIcon.src}
									alt="box icon"
								/>
								<p className=" text-[18px]">
									{item.tx_index.charAt(0).toUpperCase() +
										item.tx_index.slice(1)}
								</p>
							</div>
						</div>

						<div className="md:hidden flex items-center justify-between gap-2 ">
							<div className="flex gap-1 xs:gap-2 text-[#89C4FF]">
								<img src={boxIcon.src} alt="box icon" />
								<p className="text-[13px] xs:text-[18px]">{item.uptime}</p>
							</div>

							<div className="flex gap-1 text-[#89C4FF]">
								<img src={userIcon.src} alt="box icon" />
								<p className="text-[13px] xs:text-[18px] overflow-hidden whitespace-nowrap text-ellipsis w-[100px] ">
									{item.noder.moniker}
								</p>
							</div>

							<div className="flex gap-1 ">
								<img
									src={item.tx_index == "on" ? nodeOnIcon.src : nodeOffIcon.src}
									alt="box icon"
								/>
								<p className="text-[13px]">
									{item.tx_index.charAt(0).toUpperCase() +
										item.tx_index.slice(1)}
								</p>
							</div>
						</div>

						<div className="w-[100%] -ml-3 h-0.5 bg-[#0B0B0B] absolute bottom-0" />
					</li>
				))}
			</ul>
		</div>
	);
};

export default TableComponent;
