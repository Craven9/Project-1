export default async function handler(request, res) {
  try {
    const foxData = {
      "photos": [
        {
          "id": 1,
          "name": "Sleeping Fox",
          "likes": 342,
          "featured": true,
          "tags": ["wildlife", "nature", "fox"],
          "author": {
            "first": "Sarah",
            "last": "Johnson"
          },
          "links": [
            {
              "link": "https://randomfox.ca/images/1.jpg",
              "label": "View Full Size"
            },
            {
              "link": "https://randomfox.ca/flicker/1",
              "label": "View on Flickr"
            },
            {
              "link": "https://randomfox.ca/photographer/sarah",
              "label": "Photographer Profile"
            }
          ],
          "description": "A sleeping fox captured in its natural habitat, showcasing the peaceful side of these remarkable woodland creatures.",
          "dateTaken": "2015-09-15T18:30:00Z",
          "thumbnail": "https://randomfox.ca/images/1.jpg",
          "fullSize": "https://randomfox.ca/images/1.jpg"
        },
        {
          "id": 2,
          "name": "Playful Fox Kit",
          "likes": 567,
          "featured": false,
          "tags": ["kit", "young", "playful"],
          "author": {
            "first": "Michael",
            "last": "Chen"
          },
          "links": [
            {
              "link": "https://randomfox.ca/images/2.jpg",
              "label": "View Full Size"
            },
            {
              "link": "https://randomfox.ca/gallery/kits",
              "label": "More Fox Kits"
            },
            {
              "link": "https://randomfox.ca/photographer/michael",
              "label": "Photographer Profile"
            }
          ],
          "description": "An adorable fox kit displaying playful behavior, demonstrating the charming nature of young foxes in the wild.",
          "dateTaken": "2020-08-22T14:15:00Z",
          "thumbnail": "https://randomfox.ca/images/2.jpg",
          "fullSize": "https://randomfox.ca/images/2.jpg"
        },
        {
          "id": 3,
          "name": "Dad and Son",
          "likes": 1024,
          "featured": true,
          "tags": ["family", "heartwarming", "bond"],
          "author": {
            "first": "Isabella",
            "last": "Martinez"
          },
          "links": [
            {
              "link": "https://randomfox.ca/images/3.jpg",
              "label": "View Full Size"
            },
            {
              "link": "https://randomfox.ca/series/family-bonds",
              "label": "Family Bonds Series"
            },
            {
              "link": "https://randomfox.ca/photographer/isabella",
              "label": "Photographer Profile"
            }
          ],
          "description": "A heartwarming moment between a father fox and his young son. The father stands proudly and calm, while the curious little one looks up to him with admiration, gently nuzzling his nose.",
          "dateTaken": "2022-07-11T09:45:00Z",
          "thumbnail": "https://randomfox.ca/images/3.jpg",
          "fullSize": "https://randomfox.ca/images/3.jpg"
        },
        {
          "id": 4,
          "name": "Best Buds",
          "likes": 856,
          "featured": true,
          "tags": ["friendship", "young", "bond"],
          "author": {
            "first": "Alexander",
            "last": "Wilson"
          },
          "links": [
            {
              "link": "https://randomfox.ca/images/4.jpg",
              "label": "View Full Size"
            },
            {
              "link": "https://randomfox.ca/series/friendship",
              "label": "Friendship Series"
            },
            {
              "link": "https://randomfox.ca/photographer/alexander",
              "label": "Photographer Profile"
            }
          ],
          "description": "These two young foxes, nestled closely together, perfectly capture the spirit of friendship and trust found in nature. Their soft, golden-red fur blends beautifully with the forest background, and their bright, curious eyes reflect both intelligence and playfulness. The top fox gently rests its chin on the other's head, showing a quiet bond that suggests they've grown up exploring the woods side by side.",
          "dateTaken": "2017-06-05T06:30:00Z",
          "thumbnail": "https://randomfox.ca/images/4.jpg",
          "fullSize": "https://randomfox.ca/images/4.jpg"
        },
        {
          "id": 5,
          "name": "Sleepy Fox Family",
          "likes": 732,
          "featured": false,
          "tags": ["family", "peaceful", "bonds"],
          "author": {
            "first": "Samantha",
            "last": "Thompson"
          },
          "links": [
            {
              "link": "https://randomfox.ca/images/5.jpg",
              "label": "View Full Size"
            },
            {
              "link": "https://randomfox.ca/series/family-life",
              "label": "Family Life Series"
            },
            {
              "link": "https://randomfox.ca/photographer/samantha",
              "label": "Photographer Profile"
            }
          ],
          "description": "A peaceful fox family resting together, showing the strong social bonds between fox parents and their kits.",
          "dateTaken": "2017-05-18T11:20:00Z",
          "thumbnail": "https://randomfox.ca/images/5.jpg",
          "fullSize": "https://randomfox.ca/images/5.jpg"
        },
        {
          "id": 6,
          "name": "Gentle Meadow Fox",
          "likes": 489,
          "featured": true,
          "tags": ["sunset", "meadow", "peaceful"],
          "author": {
            "first": "Benjamin",
            "last": "Davis"
          },
          "links": [
            {
              "link": "https://randomfox.ca/images/6.jpg",
              "label": "View Full Size"
            },
            {
              "link": "https://randomfox.ca/series/sunset-wildlife",
              "label": "Sunset Wildlife Series"
            },
            {
              "link": "https://randomfox.ca/photographer/benjamin",
              "label": "Photographer Profile"
            }
          ],
          "description": "Bathed in the soft light of sunset, this fox turns its head with a calm, almost thoughtful expression. Its fur glows with warm orange and white tones, and the tall grass around it gives the scene a peaceful, late-day glow. The fox looks curious but relaxed, perfectly at home in the quiet meadow as it enjoys the final light of day.",
          "dateTaken": "2019-04-30T19:45:00Z",
          "thumbnail": "https://randomfox.ca/images/6.jpg",
          "fullSize": "https://randomfox.ca/images/6.jpg"
        },
        {
          "id": 7,
          "name": "Curious Mountain Fox",
          "likes": 623,
          "featured": false,
          "tags": ["curious", "mountain", "sunset"],
          "author": {
            "first": "Katherine",
            "last": "Rodriguez"
          },
          "links": [
            {
              "link": "https://randomfox.ca/images/7.jpg",
              "label": "View Full Size"
            },
            {
              "link": "https://randomfox.ca/series/mountain-wildlife",
              "label": "Mountain Wildlife Series"
            },
            {
              "link": "https://randomfox.ca/photographer/katherine",
              "label": "Photographer Profile"
            }
          ],
          "description": "With ears up and eyes wide, this fox leans in close to the camera, its playful curiosity on full display. Behind it, the sun sets over rugged hills, casting a golden hue across the landscape. The image feels lively and spontaneous — a moment where the wild meets wonder, showing just how inquisitive and intelligent these creatures can be.",
          "dateTaken": "2014-03-20T16:10:00Z",
          "thumbnail": "https://randomfox.ca/images/7.jpg",
          "fullSize": "https://randomfox.ca/images/7.jpg"
        },
        {
          "id": 8,
          "name": "Arctic Blue Fox",
          "likes": 912,
          "featured": true,
          "tags": ["arctic", "snow", "winter"],
          "author": {
            "first": "Christopher",
            "last": "Anderson"
          },
          "links": [
            {
              "link": "https://randomfox.ca/images/8.jpg",
              "label": "View Full Size"
            },
            {
              "link": "https://randomfox.ca/series/arctic-foxes",
              "label": "Arctic Foxes Series"
            },
            {
              "link": "https://randomfox.ca/photographer/christopher",
              "label": "Photographer Profile"
            }
          ],
          "description": "Half-buried in the snow, this stunning blue-tinted fox locks its gaze forward, alert and ready to pounce. Its fur blends beautifully with the icy surroundings, making it almost invisible in the winter landscape. The contrast of deep blue against white snow creates a mysterious, almost mythical presence — a predator perfectly adapted to its frozen world.",
          "dateTaken": "2022-02-28T13:15:00Z",
          "thumbnail": "https://randomfox.ca/images/8.jpg",
          "fullSize": "https://randomfox.ca/images/8.jpg"
        },
        {
          "id": 9,
          "name": "Cheerful Meadow Fox",
          "likes": 445,
          "featured": false,
          "tags": ["cheerful", "joy", "playful"],
          "author": {
            "first": "Jessica",
            "last": "Parker"
          },
          "links": [
            {
              "link": "https://randomfox.ca/images/9.jpg",
              "label": "View Full Size"
            },
            {
              "link": "https://randomfox.ca/series/happy-foxes",
              "label": "Happy Foxes Series"
            },
            {
              "link": "https://randomfox.ca/photographer/jessica",
              "label": "Photographer Profile"
            }
          ],
          "description": "Caught mid-laugh, this fox radiates pure joy as sunlight dances across its vibrant orange fur. Surrounded by green grass, it seems to be enjoying the freedom and playfulness of the open field. Its bright expression and lively stance capture the lighthearted side of nature—a moment where happiness feels completely unguarded and real.",
          "dateTaken": "2021-01-14T08:30:00Z",
          "thumbnail": "https://randomfox.ca/images/9.jpg",
          "fullSize": "https://randomfox.ca/images/9.jpg"
        },
        {
          "id": 10,
          "name": "Snow-Dusted Wanderer",
          "likes": 587,
          "featured": true,
          "tags": ["winter", "wanderer", "snow"],
          "author": {
            "first": "Robert",
            "last": "Brown"
          },
          "links": [
            {
              "link": "https://randomfox.ca/images/10.jpg",
              "label": "View Full Size"
            },
            {
              "link": "https://randomfox.ca/series/winter-foxes",
              "label": "Winter Foxes Series"
            },
            {
              "link": "https://randomfox.ca/photographer/robert",
              "label": "Photographer Profile"
            }
          ],
          "description": "Trekking through a gentle snowfall, this fox's coat glistens with delicate white flakes. Its focused gaze and steady stride show quiet determination, perfectly suited for the chill of winter. The soft blur of falling snow gives the image a calm, almost cinematic beauty, as if time has slowed to honor this lone traveler's resilience.",
          "dateTaken": "2012-12-03T15:45:00Z",
          "thumbnail": "https://randomfox.ca/images/10.jpg",
          "fullSize": "https://randomfox.ca/images/10.jpg"
        }
      ]
    };

    for (let i = 11; i <= 50; i++) {
      const authorName = generateAuthorName();
      foxData.photos.push({
        "id": i,
        "name": `Fox Photo ${i}`,
        "likes": Math.floor(Math.random() * 1000) + 50,
        "featured": Math.random() > 0.7,
        "tags": generateTags(),
        "author": {
          "first": authorName.split(' ')[0],
          "last": authorName.split(' ')[1] || "Unknown"
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
            "link": `https://randomfox.ca/photographer/${authorName.toLowerCase().replace(' ', '-')}`,
            "label": "Photographer Profile"
          }
        ],
        "description": `A beautiful fox photo captured in the wild. This stunning image showcases the natural beauty and grace of foxes in their habitat.`,
        "dateTaken": new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
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

function generateAuthorName() {
  const names = [
    'Amanda Williams', 'Nicholas Taylor', 'Stephanie Moore', 'Daniel Harris', 'Michelle Clark',
    'Ryan Lewis', 'Lauren Walker', 'Kevin Hall', 'Brittany Young', 'Jonathan King',
    'Megan Wright', 'Gregory Green', 'Rachel Adams', 'Tyler Baker', 'Cynthia Nelson',
    'Marcus Carter', 'Heather Mitchell', 'Andrew Perez', 'Victoria Roberts', 'Charles Turner'
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function generateTags() {
  const allTags = [
    'wildlife', 'nature', 'fox', 'forest', 'cute', 'wild', 'animal', 'red-fox', 
    'photography', 'outdoors', 'mammals', 'furry', 'beautiful', 'natural', 'hunting',
    'sleeping', 'playful', 'family', 'kit', 'adult', 'winter', 'snow', 'autumn'
  ];
  
  const numTags = Math.floor(Math.random() * 3) + 2;
  const shuffled = allTags.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numTags);
}