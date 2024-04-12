import { createSmartAccountClient } from "permissionless";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
import { http } from "viem";
import { sepolia } from "viem/chains";
import { bundlerClient, paymasterClient, publicClient } from "./clients.js";

(async function () {
const account = await privateKeyToSimpleSmartAccount(publicClient, {
	privateKey:
		"0x36e512afe490fed9b9e89e3be886640083050dee973d6c913511870ee2a51cc9",
	factoryAddress: "0x9406Cc6185a346906296840746125a0E44976454", // simple account factory
	entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // global entrypoint
});

const smartAccountClient = createSmartAccountClient({
	account,
	chain: sepolia,
	transport: http(
		"https://api.pimlico.io/v1/mumbai/rpc?apikey=212f1fd6-65ec-4d51-a541-d7347ec22e12",
	),
	sponsorUserOperation: paymasterClient.sponsorUserOperation,
});

const gasPrices = await bundlerClient.getUserOperationGasPrice()

const txHash = await smartAccountClient.sendTransaction({
	to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
	value: 0n,
	data: "0x1234",
    maxFeePerGas: gasPrices.fast.maxFeePerGas,
    maxPriorityFeePerGas: gasPrices.fast.maxPriorityFeePerGas,
});
})();