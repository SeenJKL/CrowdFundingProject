import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { loader } from "../assets";
import { Loader } from "../components";
const Ranking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [donatorRankings, setDonatorRankings] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    findDonatorRankings(data);
    setIsLoading(false);
  };

  const findDonatorRankings = (campaignsData) => {
    let donatorRanking = {};

    campaignsData.forEach((campaign) => {
      if (
        campaign.donators &&
        campaign.donations &&
        campaign.donators.length === campaign.donations.length
      ) {
        campaign.donators.forEach((donator, index) => {
          donatorRanking[donator] =
            (donatorRanking[donator] || 0) + campaign.donations[index];
        });
      }
    });

    const sortedDonators = Object.entries(donatorRanking).sort(
      (a, b) => b[1] - a[1]
    );

    const rankings = sortedDonators.map(([address, amount], index) => ({
      address,
      amount,
      rank: index + 1,
    }));

    setDonatorRankings(rankings);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <h1 className="w-full flex justify-center md:flex-row flex-col mt-10 gap-[30px] text-base-content font-epilogue font-bold text-[30px]">
        Donator Rankings
      </h1>
      {/* Start Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg font-epilogue mt-[10px] rankingtable">
        {isLoading ? (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        ) : (
          <table className="w-full text-left">
            <thead className="uppercase bg-base-300 text-base-content font-bold text-[15px]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Total Donation (ETH)
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-base-content">
              {donatorRankings.map((donator, index) => (
                <tr
                  key={index}
                  className="bg-base-100 border-b  dark:border-gray-1000 hover:bg-base-200" //hover:bg-[#2c2f32]
                >
                  <th scope="row" className="px-10 py-4 ">
                    {donator.rank}
                  </th>
                  <td className="px-6 py-4">{donator.address}</td>
                  <td className="px-6 py-4">{donator.amount.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Ranking;
