// import BoilerPlate from '../../components/BoilerPlate';
import * as React from "react";
import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import BoilerPlate from "../../components/BoilerPlate";

const Starter = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const [balances, setBalances] = React.useState<number | null>(0);

    React.useEffect(() => {
        const getBalance = async () => {
            if (connection && publicKey) {
                const info = await connection.getAccountInfo(publicKey);
                console.log({ info });

                setBalances(info!.lamports / web3.LAMPORTS_PER_SOL);
            }
        };
        getBalance();
    }, [connection, publicKey]);
    return (
        <main className="min-h-screen bg-red-500 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 border ">
                <div className="p-4 rounded-lg  bg-[#2a302f] h-60 col-span-1 lg:col-start-2 lg:col-end-4">
                    <div className="flex justify-between items-center ">
                        <h2 className="text-3xl font-semibold">
                            account info ✨
                        </h2>
                    </div>

                    <div className="mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2">
                        <ul className="p-2">
                            <li className="flex justify-between">
                                <p className="tracking-wider">
                                    Wallet is connected...
                                </p>
                                <p className="text-turbine-green italic font-semibold">
                                    {publicKey ? "yes" : "no"}
                                </p>
                            </li>
                            <li className="flex justify-between mt-4 text-sm">
                                <p className="tracking-wider">Balance...</p>
                                <p className="text-turbine-green italic font-semibold">
                                    {balances}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Starter;
