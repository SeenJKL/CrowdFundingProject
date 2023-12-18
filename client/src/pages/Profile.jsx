import React, { useState, useEffect } from "react";

import { DisplayUserCampaigns } from "../components";
import { useStateContext } from "../context";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createdCampaigns, setCreateCampaigns] = useState([]);
  const [donatedCapaigns, setdonatedCapaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();
  const {
    address: address_1,
    contract: contract_1,
    getUserDonateCampaigns,
  } = useStateContext();
  const fetchCreatedCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCreateCampaigns(data);
    setIsLoading(false);
  };
  const fetchDonatedCampaigns = async () => {
    setIsLoading(true);
    const data_2 = await getUserDonateCampaigns();
    setdonatedCapaigns(data_2);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCreatedCampaigns();
  }, [address, contract]);
  useEffect(() => {
    if (contract_1) fetchDonatedCampaigns();
  }, [address_1, contract_1]);
  return (
    <DisplayUserCampaigns
      isLoading={isLoading}
      createdCampaigns={createdCampaigns}
      donatedCapaigns={donatedCapaigns}
    />
  );
};

export default Profile;
