"use client";
import React, {
	Dispatch,
	FC,
	MouseEvent,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import ColorsVariable from "./colorsVariable";
import closeIcon from "@/public/svg/close.svg";
import userIcon from "@/public/svg/user.svg";
import { ModalPagination } from "./modalPagination";
import { IGroupedData } from "@/interfaces/IGroupData";

interface IModalProps {
	isModalOpened: boolean;
	setModalOpened: Dispatch<SetStateAction<boolean>>;
	modalData: IGroupedData[];
}

const ModalWindow: FC<IModalProps> = ({
	isModalOpened,
	setModalOpened,
	modalData,
}) => {
	const [pageCount, setPageCount] = useState<number | null>(null);

	const [page, setPage] = useState<number>(1);
	const [items, setItems] = useState<IGroupedData[]>();

	useEffect(() => {
		if (modalData) {
			const startIndex = (page - 1) * 5;
			const endIndex = startIndex + 5;

			setItems(modalData.slice(startIndex, endIndex));
		}

		setPageCount(Math.round(modalData.length / 5));
	}, [page, modalData]);

	const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setModalOpened(false);
		}
	};

	useEffect(() => {
		if (isModalOpened) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isModalOpened]);

	if (!modalData || modalData.length === 0) {
		return null;
	}

	const total = modalData.reduce((sum, item) => sum + item.nodes.length, 0);

	return (
		<div>
			{isModalOpened && (
				<div
					className="fixed inset-0 bg-gray-800 bg-opacity-[40%] flex justify-center items-center z-40"
					onClick={handleOverlayClick}
				>
					<div className="bg-[#0F0F0F] p-6 rounded-3xl shadow-lg w-96 max-w-full z-50 animate-modal relative md:w-[90%] xl:w-[70%]">
						<div className="flex items-center gap-4">
							<h2 className="text-[18px] font-bold md:text-[25px]">
								Node Data Center
							</h2>
							{modalData && <ColorsVariable data={modalData} />}
						</div>

						<ul className="px-2 my-4 flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
							{items &&
								items.map((item, index) => {
									const percentRatio = parseFloat(
										((item.nodes.length / total) * 100).toFixed(2)
									);

									return (
										<li
											className="flex items-center justify-between md:max-w-[400px]"
											key={index}
										>
											<div className="flex items-center gap-2">
												<div className="flex gap-1">
													<p>{item.nodes.length}</p>
													<img src={userIcon.src} alt="user icon" />
												</div>
												<p className="text-[15px] whitespace-nowrap overflow-hidden max-w-[140px] xs:max-w-[200px] text-ellipsis">
													{item.listName}
												</p>
											</div>
											<div className="bg-[#9AB1CF29] text-[#7C8798] px-[20px] text-[15px] rounded-2xl">
												{percentRatio}%
											</div>
										</li>
									);
								})}
						</ul>

						<button
							className="p-[10px] absolute top-5 right-2 xs:right-4"
							onClick={() => setModalOpened(false)}
						>
							<img src={closeIcon.src} alt="close button" />
						</button>

						<ModalPagination
							page={page}
							setPage={setPage}
							pageCount={pageCount}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ModalWindow;
