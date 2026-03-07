import { ABIDataTypes, BitcoinAbiTypes, OP_NET_ABI } from 'opnet';

export const PropertyNFTEvents = [];

export const PropertyNFTAbi = [
    {
        name: 'mintNFT',
        inputs: [
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'tokenId', type: ABIDataTypes.UINT256 },
        ],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'setMintPrice',
        inputs: [{ name: 'priceSats', type: ABIDataTypes.UINT64 }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'setMintingOpen',
        inputs: [{ name: 'open', type: ABIDataTypes.BOOL }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    ...PropertyNFTEvents,
    ...OP_NET_ABI,
];

export default PropertyNFTAbi;
