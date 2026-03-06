import { ABIDataTypes, BitcoinAbiTypes, OP_NET_ABI } from 'opnet';

export const OPWACoinEvents = [];

export const OPWACoinAbi = [
    {
        name: 'setTreasury',
        inputs: [{ name: 'pubkey', type: ABIDataTypes.ADDRESS }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
        onlyOwner: true,
    },
    {
        name: 'setPrice',
        inputs: [{ name: 'newPrice', type: ABIDataTypes.UINT256 }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
        onlyOwner: true,
    },
    {
        name: 'getPrice',
        inputs: [],
        outputs: [{ name: 'price', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'getTreasury',
        inputs: [],
        outputs: [{ name: 'treasury', type: ABIDataTypes.ADDRESS }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'buy',
        inputs: [
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    ...OPWACoinEvents,
    ...OP_NET_ABI,
];

export default OPWACoinAbi;
