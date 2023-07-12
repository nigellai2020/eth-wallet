#!/bin/bash

sed -i '1i /// <amd-module name="@ijstech/eth-wallet/contracts/index.ts" />' src/contracts/index.ts
sed -i '1i /// <amd-module name="@ijstech/eth-wallet/contracts/erc20.ts" />' src/contracts/erc20.ts
sed -i '1i /// <amd-module name="@ijstech/eth-wallet/constants.ts" />' src/constants.ts
sed -i '1i /// <amd-module name="@ijstech/eth-wallet/contract.ts" />' src/contract.ts
sed -i '1i /// <amd-module name="@ijstech/eth-wallet/eventBus.ts" />' src/eventBus.ts
sed -i '1i /// <amd-module name="@ijstech/eth-wallet/providers.json.ts" />' src/providers.json.ts
sed -i '1i /// <amd-module name="@ijstech/eth-wallet/types.ts" />' src/types.ts
sed -i '1i /// <amd-module name="@ijstech/eth-wallet/utils.ts" />' src/utils.ts
sed -i '1i /// <amd-module name="@ijstech/eth-wallet/wallet.ts" />' src/wallet.ts
sed -i '1i /// <amd-module name="@ijstech/eth-wallet/web3.ts" />' src/web3.ts