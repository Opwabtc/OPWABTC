import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

const PROPERTY_NFT_ADDRESS = (import.meta.env.VITE_PROPERTY_NFT_ADDRESS as string) ?? '';
const OPSCAN_BASE = 'https://testnet.opscan.io/tx/';

interface MintForm {
  name: string;
  location: string;
  area_sqm: string;
  valuation_sats: string;
  property_type: 'residential' | 'commercial' | 'mixed';
  total_fractions: string;
  image_uri: string;
}

const EMPTY_FORM: MintForm = {
  name: '',
  location: '',
  area_sqm: '',
  valuation_sats: '',
  property_type: 'residential',
  total_fractions: '1000000',
  image_uri: '',
};

export const AdminMint: React.FC = () => {
  const { connected: isConnected } = useAppStore();
  
  

  const [form, setForm] = useState<MintForm>(EMPTY_FORM);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isConnected) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Connect your wallet to access the admin mint panel.
        </p>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTxHash(null);

    if (!PROPERTY_NFT_ADDRESS) {
      setError('VITE_PROPERTY_NFT_ADDRESS is not set. Deploy the contract first.');
      return;
    }

    setMinting(true);
    try {
      // Build the metadata URI (JSON encoded as data URI for testnet convenience)
      const metadata = {
        property_id: `prop-${Date.now()}`,
        name: form.name,
        location: form.location,
        area_sqm: Number(form.area_sqm),
        valuation_sats: Number(form.valuation_sats),
        property_type: form.property_type,
        total_fractions: Number(form.total_fractions),
        image_uri: form.image_uri,
      };
      const metadataUri = `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;

      // TODO: Call PropertyNFT.mint(metadataUri) via OP_WALLET signer
      // Example (once signer API is finalized):
      //   const signer = walletInstance.getSigner();
      //   const contract = getContract(PROPERTY_NFT_ADDRESS, PROPERTY_NFT_ABI, signer, network);
      //   const tx = await contract.mint(metadataUri);
      //   setTxHash(tx.txid);

      // Placeholder — show what would be sent
      console.log('[AdminMint] Would mint:', metadataUri);
      throw new Error(
        'Contract not deployed yet. Set VITE_PROPERTY_NFT_ADDRESS in .env to enable minting.',
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      console.log({ type: 'error', title: 'Mint Failed', message: msg });
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Admin — Mint Property NFT
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Only the contract owner wallet can mint. Contract:{' '}
        {PROPERTY_NFT_ADDRESS ? (
          <a
            href={`${OPSCAN_BASE}${PROPERTY_NFT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bitcoin-orange underline font-mono"
          >
            {PROPERTY_NFT_ADDRESS.slice(0, 10)}…
          </a>
        ) : (
          <span className="text-red-400">not configured</span>
        )}
      </p>

      <form onSubmit={handleMint} className="space-y-4">
        {[
          { label: 'Property Name', name: 'name', placeholder: 'Downtown Penthouse São Paulo' },
          { label: 'Location', name: 'location', placeholder: 'Av. Paulista 1000, São Paulo, BR' },
          { label: 'Area (m²)', name: 'area_sqm', placeholder: '120', type: 'number' },
          {
            label: 'Valuation (satoshis)',
            name: 'valuation_sats',
            placeholder: '5000000000',
            type: 'number',
          },
          {
            label: 'Total Fractions',
            name: 'total_fractions',
            placeholder: '1000000',
            type: 'number',
          },
          { label: 'Image URI (IPFS / https)', name: 'image_uri', placeholder: 'ipfs://Qm...' },
        ].map(({ label, name, placeholder, type = 'text' }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={(form as unknown as Record<string, string>)[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Property Type
          </label>
          <select
            name="property_type"
            value={form.property_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {txHash && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-700 dark:text-green-400">
            Minted! TX:{' '}
            <a
              href={`${OPSCAN_BASE}${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-mono"
            >
              {txHash.slice(0, 12)}…
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={minting}
          className="w-full bg-bitcoin-orange hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {minting ? 'Minting...' : 'Mint Property NFT'}
        </button>
      </form>
    </div>
  );
};
