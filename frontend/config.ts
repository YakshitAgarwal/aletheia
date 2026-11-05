import { createConfig, http } from "wagmi";
import { hedera } from "wagmi/chains";

export const config = createConfig({
  chains: [hedera],
  transports: {
    [hedera.id]: http(),
  },
});
