import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xCA5060cd41BfE3af5c78DF4669435b70c664Ff1c"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
      donators: campaign.donators,
      donations: campaign.donations.map((donation) =>
        parseFloat(ethers.utils.formatEther(donation))
      ),
      status: campaign.status,
    }));
    return parsedCampaings;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  const getUserDonateCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const donatedCampaigns = allCampaigns.filter((campaign) =>
      campaign.donators.includes(address)
    );
    return donatedCampaigns;
  };

  const donate = async (pId, amount) => {
    try {
      const data = await contract.call("donateToCampaign", [pId], {
        value: ethers.utils.parseEther(amount),
      });
      return data;
    } catch (error) {
      console.log("Incomplete Donate");
    }
  };

  const withdrwal = async (pId) => {
    try {
      const data = await contract.call("withdrawFunds", [pId]);
      return data;
    } catch (error) {
      console.log("Incomplete Withdraw");
    }
  };

  const refund = async (pId) => {
    try {
      const data = await contract.call("refundDonors", [pId]);
    } catch (error) {
      console.log("Incomplete Refund");
    }
  };
  const reopen = async (pId) => {
    try {
      const data = await contract.call("reopenCampaingFromRefund", [pId]);
    } catch (error) {
      console.log("Incomplete Reopen");
    }
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        getUserDonateCampaigns,
        donate,
        withdrwal,
        refund,
        reopen,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
