"use client";
import { INetworkData } from "@/interfaces/INetworkData";
import React, { FC, useEffect, useRef, useState } from "react";
import searchIcon from "@/public/svg/search.svg";
import arrowIcon from "@/public/svg/arrowDown.svg";

import TableComponent from "./components/tableComponent";

interface TableRpcProps {
	networkData: INetworkData;
}

const debounce = <T extends (...args: any[]) => void>(
	func: T,
	delay: number
) => {
	let timeout: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>): void => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), delay);
	};
};

const TableRpc: FC<TableRpcProps> = ({ networkData }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	// Фокус на инпут при клике на див
	const handleDivClick = () => {
		inputRef.current?.focus();
	};

	const [changeButton, setChangeButton] = useState<boolean>(true);
	const [filtredData, setFiltredData] = useState<
		INetworkData["cosmos"] | INetworkData["evm"]
	>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [debouncedQuery, setDebouncedQuery] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [sortField, setSortField] = useState<"uptime" | "tx_index" | null>(
		null
	);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	useEffect(() => {
		setFiltredData(changeButton ? networkData.cosmos : networkData.evm);
	}, [changeButton]);

	useEffect(() => {
		const handleDebounce = debounce(setDebouncedQuery, 300);
		handleDebounce(searchQuery);
	}, [searchQuery]);

	useEffect(() => {
		setIsLoading(true);
		const timeout = setTimeout(() => {
			let filtered = changeButton ? networkData.cosmos : networkData.evm;

			if (debouncedQuery) {
				filtered = filtered.filter((item) =>
					item.noder.moniker
						.toLowerCase()
						.includes(debouncedQuery.toLowerCase())
				);
			}

			if (sortField) {
				filtered = filtered.sort((a, b) => {
					const aValue =
						sortField === "uptime" ? parseFloat(a[sortField]) : a[sortField];
					const bValue =
						sortField === "uptime" ? parseFloat(b[sortField]) : b[sortField];

					if (sortOrder === "asc") {
						return aValue > bValue ? 1 : -1;
					} else {
						return aValue < bValue ? 1 : -1;
					}
				});
			}

			setFiltredData(filtered);
			setIsLoading(false);
		}, 500);
		return () => clearTimeout(timeout);
	}, [debouncedQuery, changeButton, sortField, sortOrder]);

	const toggleSort = (field: "uptime" | "tx_index") => {
		if (sortField === field) {
			setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSortField(field);
			setSortOrder("asc");
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center my-6 ">
				<h3 className="text-[19px]">RPC / REST / GRPs</h3>
				<div
					className="md:w-[100%] max-w-[400px] relative cursor-pointer"
					onClick={handleDivClick}
				>
					<input
						ref={inputRef}
						type="text"
						className="bg-black border-[#131313] border-2 text-[#707070] rounded-3xl placeholder:text-transparent w-[55px] focus:w-full md:w-[100%] md:placeholder:text-[#707070] placeholder:text-center focus:placeholder:text-transparent py-[5px] px-[20px] outline-none transition-all duration-300 ease-in-out"
						placeholder="Search mode"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<img
						src={searchIcon.src}
						alt="search icon"
						className="absolute top-2.5 right-5 pointer-events-none"
					/>
				</div>
			</div>
			<div className="flex gap-4 items-center">
				<button
					className="rounded-3xl px-[40px] py-[8px] text-[16px]"
					style={{
						backgroundColor: changeButton ? "#F2F2F2" : "#0B0B0B",
						color: changeButton ? "#000" : "#fff",
					}}
					onClick={() => setChangeButton(true)}
				>
					Cosmos
				</button>
				<button
					className="rounded-3xl px-[40px] py-[8px] text-[16px]"
					style={{
						backgroundColor: changeButton ? "#0B0B0B" : "#F2F2F2",
						color: changeButton ? "#fff" : "#000",
					}}
					onClick={() => setChangeButton(false)}
				>
					EVM
				</button>
			</div>

			<div className="mt-4">
				<div className="hidden md:flex justify-around items-center">
					<p className="text-[#707070] text-[16px]">Status, Location</p>
					<p className="text-[#707070] text-[16px]">Node</p>
					<button
						className="text-[#707070] text-[16px] flex gap-1 items-center"
						onClick={() => toggleSort("uptime")}
					>
						Block history{" "}
						<img
							src={arrowIcon.src}
							alt="arrow icon"
							className={`transition-transform ${
								sortField === "uptime" && sortOrder === "desc"
									? "rotate-180"
									: ""
							}`}
						/>
					</button>
					<button
						className="text-[#707070] text-[16px] flex gap-1 items-center"
						onClick={() => toggleSort("tx_index")}
					>
						Indexation{" "}
						<img
							src={arrowIcon.src}
							alt="arrow icon"
							className={`transition-transform ${
								sortField === "tx_index" && sortOrder === "desc"
									? "rotate-180"
									: ""
							}`}
						/>
					</button>
				</div>
				<div className="hidden md:flex m-auto w-[96%] h-0.5 bg-[#0B0B0B]" />

				<div className="min-h-[400px]">
					{isLoading ? (
						<div className="space-y-4 relative mt-4">
							{Array.from({ length: 5 }, (_, index) => (
								<div key={index}>
									<div
										key={index}
										className="h-[70px] w-full bg-[#0B0B0B] animate-pulse rounded-xl"
									></div>
								</div>
							))}
						</div>
					) : filtredData.length > 0 ? (
						<TableComponent networkData={filtredData} />
					) : (
						<p className="text-center mt-4 text-[#707070] text-xl">
							No nodes found
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default TableRpc;
