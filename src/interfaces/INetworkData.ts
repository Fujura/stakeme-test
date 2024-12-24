export interface INetworkData {
	cosmos: {
		noder: {
			moniker: string;
			address: string;
		};
		apiIp?: string;
		rpcIp?: string;
		grpcIp?: string;
		evmIp?: string;
		uptime: string;

		tx_index: string;
	}[];
	evm: {
		noder: {
			moniker: string;
			address: string;
		};
		apiIp?: string;
		rpcIp?: string;
		grpcIp?: string;
		evmIp?: string;
		uptime: string;
		tx_index: string;
	}[];
}
