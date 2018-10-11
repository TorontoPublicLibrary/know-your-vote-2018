let ctfConfig

try {
  ctfConfig = require('./.contentful.json')
} catch (error) {
  ctfConfig = {}
}

module.exports = {
  'CTF_ABOUT_ENTRY_ID': process.env.CTF_ABOUT_ENTRY_ID ? process.env.CTF_ABOUT_ENTRY_ID : ctfConfig.CTF_ABOUT_ENTRY_ID,
  'CTF_ABOUT_VOTING_ENTRY_ID': process.env.CTF_ABOUT_VOTING_ENTRY_ID ? process.env.CTF_ABOUT_VOTING_ENTRY_ID : ctfConfig.CTF_ABOUT_VOTING_ENTRY_ID,
  'CTF_EVENTS_ENTRY_ID': process.env.CTF_EVENTS_ENTRY_ID ? process.env.CTF_EVENTS_ENTRY_ID : ctfConfig.CTF_EVENTS_ENTRY_ID,
  'CTF_ISSUES_ENTRY_ID': process.env.CTF_ISSUES_ENTRY_ID ? process.env.CTF_ISSUES_ENTRY_ID : ctfConfig.CTF_ISSUES_ENTRY_ID,
  'CTF_CONTACT_ENTRY_ID': process.env.CTF_CONTACT_ENTRY_ID ? process.env.CTF_CONTACT_ENTRY_ID : ctfConfig.CTF_CONTACT_ENTRY_ID,
  'CTF_HOME_ENTRY_ID': process.env.CTF_HOME_ENTRY_ID ? process.env.CTF_HOME_ENTRY_ID : ctfConfig.CTF_HOME_ENTRY_ID,
  'CTF_SPACE_ID': process.env.CTF_SPACE_ID ? process.env.CTF_SPACE_ID : ctfConfig.CTF_SPACE_ID,
  'CTF_CDA_ACCESS_TOKEN': process.env.CTF_CDA_ACCESS_TOKEN ? process.env.CTF_CDA_ACCESS_TOKEN : ctfConfig.CTF_CDA_ACCESS_TOKEN,
  'MAPBOX_ACCESS_TOKEN': process.env.MAPBOX_ACCESS_TOKEN ? process.env.MAPBOX_ACCESS_TOKEN : ctfConfig.MAPBOX_ACCESS_TOKEN
}
