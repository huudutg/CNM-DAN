import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x84584BF1Fad76aAa7bf44307474f23813d7826bC'
)

export default instance;