import { createPimlicoBundlerClient, createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { createPublicClient, http } from "viem";

export const publicClient = createPublicClient({
	transport: http("https://rpc.ankr.com/polygon_mumbai"),
});

export const bundlerClient = createPimlicoBundlerClient({
	transport: http(
		"https://api.pimlico.io/v1/mumbai/rpc?apikey=212f1fd6-65ec-4d51-a541-d7347ec22e12",
	),
});

export const paymasterClient = createPimlicoPaymasterClient({
	transport: http(
		"https://api.pimlico.io/v2/mumbai/rpc?apikey=212f1fd6-65ec-4d51-a541-d7347ec22e12",
	),
});