import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x8d2340c8EB7f5E860999e2703899319D20747A0B'
)

export default instance;