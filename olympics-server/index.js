const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const oktaAuth = require('./auth');
const fs = require('fs');
const csv = require('csv-parser');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

async function startApplication() {

  const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(bearerToken())
    .use(oktaAuth);

  const nocRegions = {};
  const athleteEvents = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream('data/noc_regions.csv')
      .pipe(csv())
      .on('data', data => nocRegions[data.NOC] = {
        code: data.NOC,
        region: data.region,
        notes: data.notes || undefined
      })
      .on('end', resolve);
  });

  await new Promise((resolve, reject) => {
    fs.createReadStream('data/athlete_events.csv')
      .pipe(csv())
      .on('data', data => {
        if (data.ID) {
          athleteEvents.push({
            id: data.ID,
            name: data.Name,
            sex: data.Sex,
            age: parseInt(data.Age, 10),
            height: data.Height!=="NA" ? parseInt(data.Height, 10) : undefined,
            weight: data.Weight!=="NA" ? parseInt(data.Weight, 10) : undefined,
            team: data.Team,
            noc: nocRegions[data.NOC],
            games: data.Games,
            year: parseInt(data.Year),
            season: data.Season,
            city: data.City,
            sport: data.Sport,
            event: data.Event,
            medal: data.Medal!=="NA" ? data.Medal : undefined,
          });
        }
      })
      .on('end', resolve);
  });

  const schema = buildSchema(`
  type Query {
    events(offset:Int = 0, limit:Int = 10, name:String = "", sport: String = "", event: String = "", medal:String = "", year:Int = -1): [AthleteEvent]
  }

  type AthleteEvent {
    id: ID
    name: String
    sex: String
    age: Int
    height: Int
    weight: Int
    team: String
    noc: NationalCommittee
    games: String
    year: Int
    season: String
    city: String
    sport: String
    event: String
    medal: String
  }

  type NationalCommittee {
    code: String
    region: String
    notes: String
  }
`);

  function searchFilter(args) {
    return (event) => {
      if (args.name && !event.name.toLowerCase().includes(args.name.toLowerCase())) return false;
      if (args.sport && !event.sport.toLowerCase().includes(args.sport.toLowerCase())) return false;
      if (args.event && !event.event.toLowerCase().includes(args.event.toLowerCase())) return false;
      if (args.medal && args.medal !== event.medal) return false;
      if (args.year > 0 && args.year !== event.year) return false;
      return true;
    }
  }

  const root = {
    events: (args) => {
      return athleteEvents.filter(searchFilter(args))
        .slice(args.offset, args.offset + args.limit);
    },
  };

  app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }));

  app.listen(8081, (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log('Olympic Results server listening on port 8081');
  });

}
startApplication();
