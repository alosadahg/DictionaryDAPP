import { verify } from '@noble/ed25519';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { FC, useCallback, useState } from 'react';
import { notify } from "../utils/notifications";

import { Program, AnchorProvider, web3, utils } from '@project-serum/anchor';
import idl from './dictionary.json'
import { PublicKey } from '@solana/web3.js';

const idl_string = JSON.stringify(idl);
const idl_object = JSON.parse(idl_string);
const programID = new PublicKey(idl.metadata.address);

export const AddToken: FC = () => {
    const ourWallet = useWallet();
    const { connection } = useConnection();
    const [keyword, setKeyword] = useState(String)
    const [type, setType] = useState(String)
    const [uses, setUses] = useState(String)
    const [description, setDescription] = useState(String)
    const [entries, setEntries] = useState([])

    const getProvider = () => {
        const provider = new AnchorProvider(connection, ourWallet, AnchorProvider.defaultOptions())
        return provider;
    }
    // console.log("wallet: ", ourWallet.publicKey.toString())

    const createEntry = async () => {
        try {
            const anchProvider = getProvider();
            const program = new Program(idl_object, programID, anchProvider);

            const [entry] = await PublicKey.findProgramAddressSync([
                utils.bytes.utf8.encode("tokenaccount"),
                anchProvider.wallet.publicKey.toBuffer()
            ], program.programId)

            await program.rpc.createEntry(keyword, type, description, uses, {
                accounts: {
                    entry,
                    user: anchProvider.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId,
                }
            })

            console.log("Successfully added the token!" + entry.toString())
        } catch (error) {
            console.error("Failed to add a token", error)
        }
    }

    const getEntries = async () => {
        const anchProvider = getProvider();
        const program = new Program(idl_object, programID, anchProvider);
        try {
            Promise.all((await connection.getProgramAccounts(programID)).map(async entry => ({
                ...(await program.account.entry.fetch(entry.pubkey)),
                pubkey: entry.pubkey
            }))).then(entries => {
                console.log(entries)
                setEntries(entries)
            })
        } catch (error) {
            console.error("Error in fetching the tokens")
        }
    }

    return (
        <div className="flex flex-row w-full justify-start">
            <>
                <div className="flex flex-col" style={{ minWidth: '300px' }}>
                    <div className="relative group items-center">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                    rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <label className="block text-gray-700 text-left">Token</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                value={keyword}
                                placeholder='Token'
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-left">Token Type</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                value={type}
                                placeholder='Token type (ex: keyword, class)'
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-left">Used in</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                value={uses}
                                placeholder='Used in (ex: programming languages)'
                                onChange={(e) => setUses(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-left">Description</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                value={description}
                                placeholder='Description details'
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="w-100">
                    </div>
                    <button
                        className="w-full btn bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                        onClick={createEntry}
                    >
                        <span className="block group-disabled:hidden">Add to Dictionary</span>
                    </button>
                </div>
                <div className="flex flex-col pl-4 overflow-y-auto" style={{ maxHeight: '370px', minWidth: '800px' }}>
                    <button
                        className="w-100 btn bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                        onClick={getEntries}
                    >
                        <span className="block w-100">Load Dictionary</span>
                    </button>
                    {entries.map((entry) => {
                        return (
                            <div key={entry.pubkey.toString()} className="p-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-md mb-4 text-left">
                                <div className="mb-2">
                                    <strong>Token:</strong> {entry.keyword.toString()}
                                </div>
                                <div className="mb-2">
                                    <strong>Type:</strong> {entry.tokentype.toString()}
                                </div>
                                <div className="mb-2">
                                    <strong>Description:</strong> {entry.description.toString()}
                                </div>
                                <div className="mb-2">
                                    <strong>Used in:</strong> {entry.uses.toString()}
                                </div>
                                <div className="mb-2">
                                    <strong>Contributor:</strong> {entry.contributor.toString()}
                                </div>
                            </div>
                        )
                    })}
                    {/* Right column content */}
                </div>
            </>
        </div>
    );
};
