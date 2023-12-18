const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdFunding", function () {
  let crowdfunding;
  let owner;
  let nonOwner;
  let donor;
  const title = "Test Campaign";
  const description = "This is a test campaign.";
  const target = 1000;
  const deadline = Math.floor(Date.now() / 1000) + 3600; // Set deadline 1 hour from now
  const image = "test_image_url";

  beforeEach(async function () {
    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    crowdfunding = await CrowdFunding.deploy();
    [owner, donor, nonOwner] = await ethers.getSigners();
  });
  it("Should allow donors to contribute to the campaign", async function () {
    const campaignId = 0;
    const donationAmount = ethers.parseEther("1");
    await crowdfunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline + 3600,
      image
    );
    // Donate to the campaign
    await crowdfunding
      .connect(donor)
      .donateToCampaign(campaignId, { value: donationAmount });

    // Check the updated state of the campaign
    const campaign = await crowdfunding.campaigns(0);
    const [donators, donations] = await crowdfunding.getDonators(0);

    // Assertions
    expect(campaign.amountCollected).to.equal(donationAmount);
    expect(donators).to.have.lengthOf(1);
    expect(donators[0]).to.equal(donor.address);
    expect(donations).to.have.lengthOf(1);
    expect(donations[0]).to.equal(donationAmount);
  });

  it("Should create a campaign with valid parameters", async function () {
    // Create a new campaign
    await crowdfunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline,
      image
    );

    // Retrieve the campaign details
    const campaign = await crowdfunding.campaigns(0);

    // Perform assertions
    expect(campaign.owner).to.equal(owner.address);
    expect(campaign.title).to.equal(title);
    expect(campaign.description).to.equal(description);
    expect(campaign.target).to.equal(target);
    expect(campaign.deadline).to.equal(deadline);
    expect(campaign.amountCollected).to.equal(0);
    expect(campaign.image).to.equal(image);
    expect(campaign.status).to.equal(0); // CampaignStatus.Open
  });

  it("Should reject creating a campaign with a past deadline", async function () {
    // Set the deadline to a past date
    const pastDeadline = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago

    // Attempt to create a new campaign with a past deadline
    await expect(
      crowdfunding.createCampaign(
        owner.address,
        title,
        description,
        target,
        pastDeadline,
        image
      )
    ).to.be.revertedWith("The deadline should be a date in the future.");
  });

  it("Should reject creating a campaign with a zero target", async function () {
    // Attempt to create a new campaign with a zero target
    await expect(
      crowdfunding.createCampaign(
        owner.address,
        title,
        description,
        0,
        deadline,
        image
      )
    ).to.be.revertedWith("Target amount must be greater than 0");
  });

  it("Should return correct campaign count", async function () {
    // Create two campaigns
    await crowdfunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline,
      image
    );
    await crowdfunding.createCampaign(
      owner.address,
      "Second Campaign",
      "Another description",
      2000,
      deadline + 3600,
      "second_image_url"
    );

    // Check the total number of campaigns
    const totalCampaigns = await crowdfunding.numberOfCampaigns();
    expect(totalCampaigns).to.equal(2);
  });

  // test function donateToCampaign

  it("Should reject donations to a closed campaign", async function () {
    const campaignId = 0;

    // Create a campaign
    await crowdfunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline,
      image
    );
    var donationAmount = (target / 2 + 1).toString();
    // Donate to the campaign first
    await crowdfunding
      .connect(donor)
      .donateToCampaign(campaignId, { value: donationAmount });

    // Close the campaign
    await crowdfunding.connect(owner).withdrawFunds(campaignId);

    donationAmount = ethers.parseEther("1000");

    // Try to donate to a closed campaign
    await expect(
      crowdfunding
        .connect(owner)
        .donateToCampaign(campaignId, { value: donationAmount })
    ).to.be.revertedWith("Campaign is closed");
  });

  it("Should reject donations of zero amount", async function () {
    const campaignId = 0;
    const donationAmount = ethers.parseEther("0");

    await expect(
      crowdfunding
        .connect(owner)
        .donateToCampaign(campaignId, { value: donationAmount })
    ).to.be.revertedWith("Amount should be positive and more than 0");
  });

  // test function getDonators

  // test function getCampaigns
  it("Should return the correct details of all campaigns", async function () {
    const campaignDetails1 = {
      title: "First Campaign",
      description: "Description of the first campaign.",
      target: 1000,
      deadline: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      image: "first_image_url",
    };

    const campaignDetails2 = {
      title: "Second Campaign",
      description: "Description of the second campaign.",
      target: 2000,
      deadline: Math.floor(Date.now() / 1000) + 7200, // 2 hours from now
      image: "second_image_url",
    };

    // Create 2 campaign
    await crowdfunding.createCampaign(
      owner.address,
      campaignDetails1.title,
      campaignDetails1.description,
      campaignDetails1.target,
      campaignDetails1.deadline,
      campaignDetails1.image
    );

    await crowdfunding.createCampaign(
      owner.address,
      campaignDetails2.title,
      campaignDetails2.description,
      campaignDetails2.target,
      campaignDetails2.deadline,
      campaignDetails2.image
    );

    const campaigns = await crowdfunding.getCampaigns();

    expect(campaigns.length).to.equal(2);
    expect(campaigns[0].title).to.equal(campaignDetails1.title);
    expect(campaigns[0].description).to.equal(campaignDetails1.description);

    expect(campaigns[1].title).to.equal(campaignDetails2.title);
    expect(campaigns[1].description).to.equal(campaignDetails2.description);
  });

  // test function refundDonors
  it("Should allow only the campaign owner to refund donors", async function () {
    // Create a campaign
    await crowdfunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline,
      image
    );
    const campaignId = 0;
    const donationAmount = ethers.parseEther("0.1"); // 0.1 ETH

    // Make donation
    await crowdfunding
      .connect(nonOwner)
      .donateToCampaign(campaignId, { value: donationAmount });

    // Attempt to refund donors as a non-owner
    await expect(
      crowdfunding.connect(nonOwner).refundDonors(campaignId)
    ).to.be.revertedWith("Only the campaign owner can refund funds");

    // // Attempt to refund donors as the owner
    // await expect(crowdfunding.connect(owner).refundDonors(campaignId))
    //   .to.emit(crowdfunding, "DonorsRefunded")
    //   .withArgs(campaignId);
  });

  it("Should revert refunding if no funds are collected", async function () {
    // Create a campaign with no donations
    await crowdfunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline,
      image
    );
    const campaignId = 0;

    // Attempt to refund donors when no funds are collected
    await expect(
      crowdfunding.connect(owner).refundDonors(campaignId)
    ).to.be.revertedWith("No fund to refund");
  });

  // test function reopenCampaingFromRefund

  it("Should allow only the campaign owner to reopen a refunded campaign", async function () {
    // Create a campaign
    await crowdfunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline,
      image
    );
    const campaignId = 0;

    await crowdfunding
      .connect(donor)
      .donateToCampaign(campaignId, { value: ethers.parseEther("0.1") });

    await crowdfunding.connect(owner).refundDonors(campaignId);

    // Attempt to reopen the campaign as a non-owner
    await expect(
      crowdfunding.connect(nonOwner).reopenCampaingFromRefund(campaignId)
    ).to.be.revertedWith("Only the campaign owner can reopen the campaign");

    // Attempt to reopen the campaign as the owner
    await expect(
      crowdfunding.connect(owner).reopenCampaingFromRefund(campaignId)
    ).to.not.be.reverted;
  });

  // test function withdrawFunds

  it("Should allow only the campaign owner to withdraw funds", async function () {
    // Create a campaign and make it eligible for fund withdrawal
    await crowdfunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline,
      image
    );
    const campaignId = 0;
    const Amount = ethers.parseEther((target / 2).toString());

    // Donor donate to campaign
    await crowdfunding.connect(donor).donateToCampaign(campaignId, {
      value: Amount,
    });

    // Attempt to withdraw funds as a non-owner
    await expect(
      crowdfunding.connect(nonOwner).withdrawFunds(campaignId)
    ).to.be.revertedWith("Only the campaign owner can withdraw funds");

    // Attempt to withdraw funds as the owner
    await expect(crowdfunding.connect(owner).withdrawFunds(campaignId)).to.not
      .be.reverted;
  });

  it("Should not allow withdrawing funds if the campaign is not open", async function () {
    // Create a campaign with a past deadline
    await crowdfunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline,
      image
    );
    const campaignId = 0;
    const Amount = ethers.parseEther((target / 2).toString());

    // Donor donate to campaign
    await crowdfunding.connect(donor).donateToCampaign(campaignId, {
      value: Amount,
    });

    await crowdfunding.connect(owner).withdrawFunds(campaignId);

    // Attempt to withdraw funds from a campaign with a past deadline
    await expect(
      crowdfunding.connect(owner).withdrawFunds(campaignId)
    ).to.be.revertedWith("Campaign is closed");
  });

  it("Should not allow withdrawing funds if less than 50% of the target is reached", async function () {
    // Create a campaign
    await crowdfunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline,
      image
    );
    const campaignId = 0;

    // Donate less than 50% of the target
    const donationAmount = (target / 2 - 1).toString();
    await crowdfunding
      .connect(donor)
      .donateToCampaign(campaignId, { value: donationAmount });

    // Attempt to withdraw funds with less than 50% of the target collected
    await expect(
      crowdfunding.connect(owner).withdrawFunds(campaignId)
    ).to.be.revertedWith(
      "Funds can only be withdrawn if more than 50% of the target is reached"
    );
  });
});
