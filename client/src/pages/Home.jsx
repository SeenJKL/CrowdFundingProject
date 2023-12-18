import React from "react";
import CrowdfundingImage from "../assets/Crowdfunding.jpeg";
import DonorRankingImage from "../assets/Donor_ranking.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faMoneyBillAlt,
  faRunning,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="w-full rounded-[15px] bg-base-200 p-4 font-epilogue">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Welcome to Your Crowdfunding Platform
        </h1>
        <p className="text-gray-500">
          Empowering ideas and making dreams come true. Start your campaign or
          support others.
        </p>
      </div>

      {/* Image Section */}
      <div className="mb-8 flex justify-center">
        <img
          src={CrowdfundingImage}
          alt="Crowdfunding Platform"
          className="rounded-md"
        />
      </div>

      {/* Featured Campaigns Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Campaigns</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Featured Campaign Card 1 */}
          <div className="bg-base-100 p-4 rounded-md shadow-md">
            {/* Campaign Image */}
            <img
              src="https://assets.entrepreneur.com/content/3x2/2000/entitled-shipping-refund-what-know.jpg"
              alt="Campaign 1"
              className="w-full h-32 object-cover mb-4 rounded-md"
            />

            {/* Campaign Title */}
            <h3 className="text-lg font-semibold mb-2 text-base-content">
              Refund Capability
            </h3>

            {/* Campaign Description */}
            <p className="text-base-content mb-4">
              This feature empowers campaign creators to refund all donors at
              their discretion. By utilizing this functionality, campaign
              creators have the option to return contributions to all supporters
              and subsequently reopen the campaign. This provides flexibility
              for creators who may need to reassess their campaign strategy or
              address unforeseen circumstances.
            </p>
          </div>

          {/* Featured Campaign Card 2 */}
          <div className="bg-base-100 p-4 rounded-md shadow-md">
            {/* Campaign Image */}
            <img
              src="https://cdn1.vectorstock.com/i/1000x1000/24/05/withdraw-money-from-atm-slot-vector-10362405.jpg"
              alt="Campaign 2"
              className="w-full h-32 object-cover mb-4 rounded-md"
            />

            {/* Campaign Title */}
            <h3 className="text-lg font-semibold mb-2 text-base-content">
              Fund Withdrawal
            </h3>

            {/* Campaign Description */}
            <p className="text-base-content mb-4">
              Campaign creators can initiate a fund withdrawal once the campaign
              balance surpasses 50% of the predetermined goal. This feature
              ensures that creators can access the funds they've raised,
              offering a practical way to use the financial support received.
              However, it's important to note that upon withdrawal, the campaign
              will be automatically closed. This adds a level of transparency
              and helps creators manage their campaigns effectively.
            </p>
          </div>

          {/* Featured Campaign Card 3 */}
          <div className="bg-base-100 p-4 rounded-md shadow-md">
            {/* Campaign Image */}
            <img
              src={DonorRankingImage}
              alt="Campaign 3"
              className="w-full h-32 object-cover mb-4 rounded-md"
            />

            {/* Campaign Title */}
            <h3 className="text-lg font-semibold mb-2 text-base-content">
              Donor Ranking
            </h3>

            {/* Campaign Description */}
            <p className="text-base-content mb-4">
              The ranking feature provides a clear and concise display of all
              donors in the system, showcasing who contributed how much to each
              campaign. This transparency fosters a sense of recognition and
              appreciation for supporters. Campaign creators and visitors can
              easily view and understand the hierarchy of donations, enabling
              them to acknowledge and celebrate the contributions of individuals
              who have played a pivotal role in the success of a campaign.
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">What Our Users Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-8">
        {/* Testimonial Card 1 */}
        <div className="bg-base-100 p-4 rounded-md shadow-md">
          {/* Star Ranking */}
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
          </div>
          {/* User Testimonial */}
          <p className="text-base-content mb-4">
            "I had an incredible experience using this crowdfunding platform.
            The support from the community was overwhelming, and it truly made a
            difference in bringing my project to life. The transparency and ease
            of fund withdrawal added a layer of trust to the entire process.
            Thank you to everyone who contributed to my campaign!"
          </p>
          {/* User Name */}
          <p className="text-sm font-semibold text-base-content">John Doe</p>
        </div>
        {/* Testimonial Card 2 */}
        <div className="bg-base-100 p-4 rounded-md shadow-md">
          {/* Star Ranking */}
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
          </div>
          {/* User Testimonial */}
          <p className="text-base-content mb-4">
            "I never thought crowdfunding could be so impactful until I joined
            this platform. The ranking feature allowed me to express my
            gratitude to each donor personally. The campaign creators' ability
            to refund and reopen a campaign provided a safety net, making the
            entire process stress-free. Kudos to the team behind this amazing
            platform!"
          </p>
          {/* User Name */}
          <p className="text-sm font-semibold text-base-content">Jane Smith</p>
        </div>
        {/* Add more testimonial cards as needed */}
      </div>

      {/* How It Works Section */}
      <h2 className="text-2xl font-bold mb-4 ">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Step 1 */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-semibold">1</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Step 1</h3>
            <p className="text-gray-500">
              Sign up for an account on our platform to get started. Provide
              basic information and set up your campaign creator profile.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-semibold">2</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Step 2</h3>
            <p className="text-gray-500">
              Create a compelling campaign by adding details, images, and a
              funding goal. Clearly explain your project or cause to attract
              supporters.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-semibold">3</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Step 3</h3>
            <p className="text-gray-500">
              Share your campaign on social media and other channels to reach a
              wider audience. Engage with your supporters and keep them updated
              on your progress.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Statistics Icons */}
        <div className="flex items-center space-x-2 justify-between mx-20">
          {/* Total Campaigns */}
          <FontAwesomeIcon
            icon={faChartBar}
            className="text-3xl text-gray-500 mr-2"
          />
          <div>
            <p className="text-lg font-semibold mb-1">Total Campaigns</p>
            <p className="text-gray-500 text-xl font-bold">1,234</p>
          </div>
        </div>

        {/* Funds Raised */}
        <div className="flex items-center space-x-2 justify-between mx-20">
          <FontAwesomeIcon
            icon={faMoneyBillAlt}
            className="text-3xl text-gray-500 mr-2"
          />
          <div>
            <p className="text-lg font-semibold mb-1">Funds Raised</p>
            <p className="text-gray-500 text-xl font-bold">ETH 1,000,000</p>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="flex items-center space-x-2 justify-between mx-20">
          <FontAwesomeIcon
            icon={faRunning}
            className="text-3xl text-gray-500 mr-2"
          />
          <div>
            <p className="text-lg font-semibold mb-1">Active Campaigns</p>
            <p className="text-gray-500 text-xl font-bold">456</p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="mb-8 flex justify-center">
        <a
          href="create-campaign"
          className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold"
        >
          Create a Campaign
        </a>
        <a
          href="dashboard"
          className="ml-4 border border-green-500 text-green-500 px-6 py-3 rounded-full font-semibold"
        >
          Explore Campaigns
        </a>
      </div>
    </div>
  );
};

export default Home;
