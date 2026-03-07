import { ABIDataTypes, BitcoinAbiTypes, OP_NET_ABI } from 'opnet';

export const USDOPEvents = [];

export const USDOPAbi = [
    {
        name: 'setMinter',
        inputs: [{ name: 'minter', type: ABIDataTypes.ADDRESS }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'getMinter',
        inputs: [],
        outputs: [{ name: 'minter', type: ABIDataTypes.ADDRESS }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'mintUSDOP',
        inputs: [
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    ...USDOPEvents,
    ...OP_NET_ABI,
];

export default USDOPAbi;
