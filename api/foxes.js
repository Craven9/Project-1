export default async function handler(request, res) {
  try {
    const foxData = { "photos": [] };

    for (let i = 1; i <= 50; i++) {
      foxData.photos.push({
        "id": i,
        "name": getNameForId(i),
        "likes": getLikesForId(i),
        "featured": getFeaturedForId(i),
        "tags": getTagsForId(i),
        "author": {
          "first": getAuthorForId(i).split(' ')[0],
          "last": getAuthorForId(i).split(' ')[1]
        },
        "links": [
          {
            "link": `https://randomfox.ca/images/${i}.jpg`,
            "label": "View Full Size"
          },
          {
            "link": `https://randomfox.ca/gallery/photo-${i}`,
            "label": "Photo Details"
          },
          {
            "link": `https://randomfox.ca/photographer/${getAuthorForId(i).toLowerCase().replace(' ', '-')}`,
            "label": "Photographer Profile"
          }
        ],
        "description": getDescriptionForId(i),
        "dateTaken": getDateForId(i),
        "thumbnail": `https://randomfox.ca/images/${i}.jpg`,
        "fullSize": `https://randomfox.ca/images/${i}.jpg`
      });
    }

    res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    
    res.json(foxData);
    
  } catch (error) {
    console.error('Error serving fox data:', error);
    res.status(500).json({ error: 'Failed to serve fox data' });
  }
}

function getAuthorForId(id) {
  const authors = [
    'Sarah Johnson', 'Michael Chen', 'Isabella Martinez', 'Alexander Wilson', 'Samantha Thompson',
    'Benjamin Davis', 'Katherine Rodriguez', 'Christopher Anderson', 'Jessica Parker', 'Robert Brown',
    'Amanda Williams', 'Nicholas Taylor', 'Stephanie Moore', 'Daniel Harris', 'Michelle Clark',
    'Ryan Lewis', 'Lauren Walker', 'Kevin Hall', 'Brittany Young', 'Jonathan King',
    'Megan Wright', 'Gregory Green', 'Rachel Adams', 'Tyler Baker', 'Cynthia Nelson',
    'Marcus Carter', 'Heather Mitchell', 'Andrew Perez', 'Victoria Roberts', 'Charles Turner',
    'Emily Johnson', 'David Wilson', 'Ashley Martinez', 'Brian Anderson', 'Jennifer Thompson',
    'Matthew Garcia', 'Sarah Rodriguez', 'Joshua Lewis', 'Amanda Lee', 'Christopher Walker',
    'Nicole Hall', 'Anthony Allen', 'Kimberly Young', 'Mark Wright', 'Lisa Lopez',
    'Steven Hill', 'Karen Scott', 'Paul Green', 'Nancy Adams', 'Daniel Baker'
  ];
  return authors[(id - 1) % authors.length];
}

function getNameForId(id) {
  const names = [
    'Sleeping Fox', 'Playful Fox Kit', 'Dad and Son', 'Best Buds', 'Sleepy Fox Family',
    'Gentle Meadow Fox', 'Curious Mountain Fox', 'Arctic Blue Fox', 'Cheerful Meadow Fox', 'Snow-Dusted Wanderer',
    'Forest Explorer', 'Morning Hunt', 'Autumn Colors', 'Stargazing Fox', 'Spring Awakening',
    'Woodland Wanderer', 'Sunset Silhouette', 'Winter Portrait', 'Summer Breeze', 'Mountain Climber',
    'Valley Runner', 'Creek Drinker', 'Field Hunter', 'Tree Climber', 'Rock Hopper',
    'Grass Dancer', 'Flower Sniffer', 'Moon Gazer', 'Sun Bather', 'Wind Chaser',
    'Rain Walker', 'Snow Player', 'Ice Skater', 'Mud Roller', 'Sand Digger',
    'Leaf Jumper', 'Stick Carrier', 'Berry Picker', 'Fish Catcher', 'Bird Watcher',
    'Butterfly Chaser', 'Bee Follower', 'Rabbit Hunter', 'Mouse Stalker', 'Squirrel Teaser',
    'Owl Listener', 'Eagle Spotter', 'Hawk Evader', 'Deer Friend', 'Bear Avoider'
  ];
  return names[(id - 1) % names.length];
}

function getLikesForId(id) {
  const likes = [
    342, 567, 1024, 856, 732, 489, 623, 912, 445, 587,
    234, 456, 789, 321, 654, 298, 167, 543, 876, 345,
    678, 234, 567, 890, 123, 456, 789, 102, 345, 678,
    901, 234, 567, 890, 123, 456, 789, 102, 345, 678,
    901, 234, 567, 890, 123, 456, 789, 102, 345, 678
  ];
  return likes[(id - 1) % likes.length];
}

function getFeaturedForId(id) {
  const featured = [
    true, false, true, true, false, true, false, true, false, true,
    false, true, false, true, false, false, true, false, true, false,
    true, false, false, true, false, true, false, true, true, false,
    false, true, false, false, true, false, true, false, true, false,
    false, true, false, true, false, false, true, false, true, false
  ];
  return featured[(id - 1) % featured.length];
}

function getTagsForId(id) {
  const tagSets = [
    ['wildlife', 'nature', 'fox'],
    ['kit', 'young', 'playful'],
    ['family', 'heartwarming', 'bond'],
    ['friendship', 'young', 'bond'],
    ['family', 'peaceful', 'bonds'],
    ['sunset', 'meadow', 'peaceful'],
    ['curious', 'mountain', 'sunset'],
    ['arctic', 'snow', 'winter'],
    ['cheerful', 'joy', 'playful'],
    ['winter', 'wanderer', 'snow'],
    ['forest', 'explorer', 'wildlife'],
    ['morning', 'hunt', 'focused'],
    ['autumn', 'colors', 'seasonal'],
    ['night', 'stars', 'peaceful'],
    ['spring', 'flowers', 'renewal'],
    ['woodland', 'adventure', 'wild'],
    ['sunset', 'silhouette', 'dramatic'],
    ['winter', 'portrait', 'elegant'],
    ['summer', 'breeze', 'warm'],
    ['mountain', 'climber', 'agile'],
    ['valley', 'runner', 'swift'],
    ['creek', 'water', 'thirsty'],
    ['field', 'hunter', 'stalking'],
    ['tree', 'climber', 'athletic'],
    ['rock', 'hopper', 'nimble'],
    ['grass', 'dancer', 'graceful'],
    ['flower', 'sniffer', 'curious'],
    ['moon', 'gazer', 'nocturnal'],
    ['sun', 'bather', 'relaxed'],
    ['wind', 'chaser', 'energetic'],
    ['rain', 'walker', 'resilient'],
    ['snow', 'player', 'joyful']
  ];
  return tagSets[(id - 1) % tagSets.length];
}

function getDescriptionForId(id) {
  const descriptions = [
    'A sleeping fox captured in its natural habitat, showcasing the peaceful side of these remarkable woodland creatures.',
    'An adorable fox kit displaying playful behavior, demonstrating the charming nature of young foxes in the wild.',
    'A heartwarming moment between a father fox and his young son. The father stands proudly and calm, while the curious little one looks up to him with admiration, gently nuzzling his nose.',
    'These two young foxes, nestled closely together, perfectly capture the spirit of friendship and trust found in nature.',
    'A peaceful fox family resting together, showing the strong social bonds between fox parents and their kits.',
    'Bathed in the soft light of sunset, this fox turns its head with a calm, almost thoughtful expression.',
    'With ears up and eyes wide, this fox leans in close to the camera, its playful curiosity on full display.',
    'Half-buried in the snow, this stunning blue-tinted fox locks its gaze forward, alert and ready to pounce.',
    'Caught mid-laugh, this fox radiates pure joy as sunlight dances across its vibrant orange fur.',
    'Trekking through a gentle snowfall, this fox\'s coat glistens with delicate white flakes.',
    'A curious fox exploring the dense forest undergrowth, alert and ready for adventure.',
    'A fox intently focused during its morning hunting routine, showcasing natural predatory instincts.',
    'A beautiful fox surrounded by vibrant autumn foliage, perfectly camouflaged in nature\'s palette.',
    'A contemplative fox under the starlit sky, captured in a moment of quiet reflection.',
    'A young fox among blooming spring flowers, representing the renewal and joy of the season.',
    'A magnificent fox displaying natural behavior in its woodland habitat.',
    'Captured in a moment of pure wilderness beauty and grace.',
    'This stunning photograph showcases the fox\'s alert and intelligent nature.',
    'A beautiful representation of wildlife photography at its finest.',
    'The perfect blend of natural lighting and wild animal photography.'
  ];
  return descriptions[(id - 1) % descriptions.length];
}

function getDateForId(id) {
  const baseDates = [
    '2015-09-15T18:30:00Z', '2020-08-22T14:15:00Z', '2022-07-11T09:45:00Z', '2017-06-05T06:30:00Z', '2017-05-18T11:20:00Z',
    '2019-04-30T19:45:00Z', '2014-03-20T16:10:00Z', '2022-02-28T13:15:00Z', '2021-01-14T08:30:00Z', '2012-12-03T15:45:00Z',
    '2021-09-15T14:22:00Z', '2020-06-08T07:15:00Z', '2019-10-23T16:45:00Z', '2021-12-14T22:30:00Z', '2020-04-18T11:20:00Z',
    '2018-01-15T10:30:00Z', '2018-03-22T14:45:00Z', '2018-05-18T08:20:00Z', '2018-07-09T16:15:00Z', '2018-09-12T12:40:00Z',
    '2018-11-25T09:55:00Z', '2019-02-14T13:25:00Z', '2019-04-30T11:10:00Z', '2019-06-17T15:35:00Z', '2019-08-28T07:50:00Z',
    '2019-10-11T17:20:00Z', '2019-12-03T14:05:00Z', '2020-01-20T10:15:00Z', '2020-03-15T16:40:00Z', '2020-05-22T12:25:00Z',
    '2020-07-18T08:55:00Z', '2020-09-30T13:10:00Z', '2020-11-14T15:45:00Z', '2021-01-08T11:30:00Z', '2021-03-25T09:20:00Z',
    '2021-05-12T14:55:00Z', '2021-07-29T16:10:00Z', '2021-09-16T12:35:00Z', '2021-11-22T10:45:00Z', '2022-01-18T15:20:00Z',
    '2022-03-14T13:40:00Z', '2022-05-26T11:15:00Z', '2022-07-11T17:25:00Z', '2022-09-08T09:50:00Z', '2022-11-19T14:30:00Z',
    '2023-01-25T12:05:00Z', '2023-03-17T16:35:00Z', '2023-05-22T10:20:00Z', '2023-07-14T13:45:00Z', '2023-09-30T15:10:00Z'
  ];
  return baseDates[(id - 1) % baseDates.length];
}