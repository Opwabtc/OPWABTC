import { ABIDataTypes, BitcoinAbiTypes, OP_NET_ABI } from 'opnet';

export const PropertyVaultEvents = [];

export const PropertyVaultAbi = [
    {
        name: 'configure',
        inputs: [
            { name: 'nft', type: ABIDataTypes.ADDRESS },
            { name: 'opway', type: ABIDataTypes.ADDRESS },
        ],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'setPropertyNft',
        inputs: [{ name: 'addr', type: ABIDataTypes.ADDRESS }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'listProperty',
        inputs: [
            { name: 'tokenId', type: ABIDataTypes.UINT256 },
            { name: 'maxOpway', type: ABIDataTypes.UINT256 },
        ],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'delistProperty',
        inputs: [{ name: 'tokenId', type: ABIDataTypes.UINT256 }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'purchaseProperty',
        inputs: [
            { name: 'tokenId', type: ABIDataTypes.UINT256 },
            { name: 'offerOpway', type: ABIDataTypes.UINT256 },
        ],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'getOwner',
        inputs: [{ name: 'tokenId', type: ABIDataTypes.UINT256 }],
        outputs: [{ name: 'owner', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'getMaxOpway',
        inputs: [{ name: 'tokenId', type: ABIDataTypes.UINT256 }],
        outputs: [{ name: 'maxOpway', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'isListed',
        inputs: [{ name: 'tokenId', type: ABIDataTypes.UINT256 }],
        outputs: [{ name: 'listed', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    ...PropertyVaultEvents,
    ...OP_NET_ABI,
];

export default PropertyVaultAbi;
