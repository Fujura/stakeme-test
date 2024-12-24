import { Dispatch, SetStateAction } from "react";
import prev from "@/public/svg/prev.svg";
import doublePrev from "@/public/svg/doublePrev.svg";
import next from "@/public/svg/next.svg";
import doubleNext from "@/public/svg/doubleNext.svg";

interface ModalPaginationProps {
	page: number;
	pageCount: number | null;
	setPage: Dispatch<SetStateAction<number>>;
}

export function ModalPagination({
	page,
	pageCount,
	setPage,
}: ModalPaginationProps) {
	if (!pageCount) return;
	const getPageNumbers = () => {
		const pages = [];
		const delta = 1;

		for (
			let i = Math.max(1, page - delta);
			i <= Math.min(pageCount, page + delta);
			i++
		) {
			pages.push(i);
		}

		return pages;
	};

	const pages = getPageNumbers();

	return (
		<div className="flex justify-center md:justify-end">
			<div className="flex items-center h-10 xs:gap-2">
				<div className={page === 1 ? "opacity-50 pointer-events-none" : ""}>
					<div
						onClick={(e) => {
							e.preventDefault();
							if (page > 2) setPage((prev) => prev - 2);
							else if (page > 1) setPage((prev) => prev - 1);
						}}
						className="cursor-pointer"
					>
						<img src={doublePrev.src} alt="prev icon" />
					</div>
				</div>

				<div className={page === 1 ? "opacity-50 pointer-events-none" : ""}>
					<div
						onClick={(e) => {
							e.preventDefault();
							if (page > 1) setPage((prev) => prev - 1);
						}}
						className="cursor-pointer"
					>
						<img src={prev.src} alt="prev icon" />
					</div>
				</div>

				<div className="flex items-center mx-4 gap-6  xs:gap-8 xs:mx-6 md:gap-10">
					{pages.map(
						(pageNumber) =>
							pageNumber !== pageCount && (
								<div key={pageNumber}>
									<div
										className={`${
											page == pageNumber ? "text-gray-400" : "text-white"
										} cursor-pointer`}
										onClick={(e) => {
											e.preventDefault();
											setPage(pageNumber);
										}}
									>
										{pageNumber}
									</div>
								</div>
							)
					)}

					{page + 1 < pageCount && (
						<div>
							<div className="text-white">...</div>
						</div>
					)}

					<div
						className={`${
							page == pageCount ? "text-gray-400" : "text-white"
						} cursor-pointer`}
						onClick={(e) => {
							e.preventDefault();
							setPage(pageCount);
						}}
					>
						{pageCount}
					</div>
				</div>
				<div
					className={page === pageCount ? "opacity-50 pointer-events-none" : ""}
				>
					<div
						onClick={(e) => {
							e.preventDefault();
							if (page < pageCount) setPage((prev) => prev + 1);
						}}
						className="cursor-pointer"
					>
						<img src={next.src} alt="next icon" />
					</div>
				</div>

				<div
					className={page === pageCount ? "opacity-50 pointer-events-none" : ""}
				>
					<div
						onClick={(e) => {
							e.preventDefault();
							if (page < pageCount - 1) setPage((prev) => prev + 2);
							else if (page < pageCount) setPage((prev) => prev + 1);
						}}
						className="cursor-pointer"
					>
						<img src={doubleNext.src} alt="prev icon" />
					</div>
				</div>
			</div>
		</div>
	);
}
