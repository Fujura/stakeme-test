import { FC } from "react";
import copyIcon from "@/public/svg/copy.svg";

interface IPData {
	apiIp?: string;
	rpcIp?: string;
	grpcIp?: string;
	evmIp?: string;
}

const DisplayIP: FC<{ data: IPData }> = ({ data }) => {
	const ipLabels: Record<string, string> = {
		apiIp: "REST",
		rpcIp: "RPC",
		grpcIp: "GRPC",
		evmIp: "EVM RPC",
	};

	const firstValidIP = Object.entries(data).find(
		([key, value]) => key in ipLabels && value
	);

	return (
		<div className="md:w-[340px]">
			{firstValidIP ? (
				<div
					className="flex items-center justify-between  md:justify-around gap-2 cursor-pointer "
					onClick={() => navigator.clipboard.writeText(firstValidIP[1])}
				>
					<p className=" text-[13px] xs:text-[18px]">
						{ipLabels[firstValidIP[0]]}
					</p>
					<p className=" text-[13px] xs:text-[18px]">
						http://{firstValidIP[1]}
					</p>
					<img src={copyIcon.src} alt="copy icon" />
				</div>
			) : (
				<p>No valid IP found</p>
			)}
		</div>
	);
};

export default DisplayIP;
