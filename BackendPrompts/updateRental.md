Rental


GET
/api/rentals


Parameters
Cancel
Name	Description
Language
string
(query)

--
Currency
string
(query)

--
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/rentals' \
  -H 'accept: text/plain'
Request URL
https://realestate44.runasp.net/api/rentals
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "",
  "data": {
    "items": [
      {
        "id": 10,
        "code": "RENT-NC-CHL-103",
        "name": "Luxury Lagoon View Chalet",
        "description": "A luxury two-bedroom chalet in the North Coast, featuring a spacious terrace, modern furniture, and direct access to the crystal lagoon.",
        "rentalLocation": {
          "id": 7,
          "name": "Sheikh Zayed",
          "description": "Sheikh Zayed City is an upscale, boutique urban oasis celebrated for its tree-lined avenues, elite lifestyle clubs, fine dining promenades, and pedestrian-friendly compounds. It is ideal for families and professionals seeking secure, luxury rental properties including townhouses, modern duplexes, and garden apartments with quick access to the Cairo-Alexandria Desert Road.",
          "videoUrl": "videos/RentalLocations/66423b59-f97d-431a-9e45-2e4ff1224331.mp4"
        },
        "floor": "First Floor",
        "bedroomNo": 2,
        "bathroomNo": 2,
        "capacity": 5,
        "size": 135,
        "prices": [
          {
            "id": 37,
            "currency": "USD",
            "price": 95
          }
        ],
        "propertyType": 0,
        "isAvailable": true,
        "isFeatured": true,
        "hasSeaView": false,
        "hasPoolView": true,
        "hasGardenView": true,
        "hasMountainView": false,
        "hasCityView": false,
        "rulesCancellation": "Free cancellation up to 7 days before check-in. Pets are not allowed.",
        "notes": "Quiet hours are from 11:00 PM to 08:00 AM.",
        "listingDetails": {
          "lateCheckIn": "Self check-in with a smart lock after 03:00 PM.",
          "services": [
            "High-Speed Wi-Fi",
            "Complimentary Beach Chairs",
            "Private Parking"
          ],
          "extraPeopleFee": 15,
          "familyFriendly": true,
          "privateEntrance": true,
          "extraPeople": "One child under 12 years old can stay free of charge."
        },
        "categoryItems": [
          {
            "id": 3,
            "name": "Fully Equipped Kitchen",
            "icon": "TbToolsKitchen2",
            "displayOrder": 1
          }
        ],
        "infoAreaPlaces": [
          {
            "id": 3,
            "name": "Senzo Mall",
            "distance": "4.0 km"
          }
        ],
        "images": [],
        "createdBy": "admin@realestate.com",
        "createdAt": "2026-11-14T12:35:44.8596382",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 9,
        "code": "RENT-NC-CHL-102",
        "name": "Sunset Horizon Lagoon Chalet",
        "description": "Modern 2-bedroom seaside chalet located steps from the crystal lagoon in Sidi Abdel Rahman. Boasting a sun-drenched private terrace, contemporary open-concept kitchen, and direct lagoon beach access.",
        "rentalLocation": {
          "id": 6,
          "name": "North Coast",
          "description": "The North Coast (Sahel) is Egypt's crown jewel for Mediterranean summer escapes and luxury beachfront rentals. Stretching along pristine white sand beaches and crystal-turquoise waters, prime areas such as Ras El Hekma and Sidi Abdel Rahman feature ultra-luxurious seaside chalets, private beach villas, and resort apartments perfect for high-yield vacation stays and seasonal retreats.",
          "videoUrl": "videos/RentalLocations/b167d1ae-8dd0-4643-a090-69dc135f00d4.mp4"
        },
        "floor": "1st Floor",
        "bedroomNo": 2,
        "bathroomNo": 2,
        "capacity": 4,
        "size": 135,
        "prices": [
          {
            "id": 33,
            "currency": "USD",
            "price": 240
          }
        ],
        "propertyType": 8,
        "isAvailable": true,
        "isFeatured": true,
        "hasSeaView": false,
        "hasPoolView": true,
        "hasGardenView": true,
        "hasMountainView": false,
        "hasCityView": false,
        "rulesCancellation": "Free cancellation up to 7 days before arrival. No pets permitted inside.",
        "notes": "Quiet hours observed from 11:00 PM to 08:00 AM.",
        "listingDetails": {
          "lateCheckIn": "Self check-in with smart lock after 03:00 PM",
          "services": [
            "High-Speed Wi-Fi",
            "Complimentary Beach Chairs"
          ],
          "extraPeopleFee": 30,
          "familyFriendly": true,
          "privateEntrance": true,
          "extraPeople": "Maximum 1 child under 12 free of charge"
        },
        "categoryItems": [
          {
            "id": 3,
            "name": "Fully Equipped Kitchen",
            "icon": "TbToolsKitchen2",
            "displayOrder": 1
          },
          {
            "id": 4,
            "name": "Coffee Machine",
            "icon": "TbCoffee",
            "displayOrder": 2
          },
          {
            "id": 6,
            "name": "Hot Rain Shower",
            "icon": "MdShower",
            "displayOrder": 1
          },
          {
            "id": 9,
            "name": "King or Queen Bed with Linens",
            "icon": "TbBed",
            "displayOrder": 1
          },
          {
            "id": 11,
            "name": "Room-Darkening Curtains",
            "icon": "MdOutlineCurtains",
            "displayOrder": 3
          },
          {
            "id": 13,
            "name": "High-Speed Wi-Fi",
            "icon": "TbWifi",
            "displayOrder": 1
          },
          {
            "id": 14,
            "name": "Smart TV with Satellite",
            "icon": "MdTv",
            "displayOrder": 2
          },
          {
            "id": 16,
            "name": "Air Conditioning",
            "icon": "TbAirConditioning",
            "displayOrder": 1
          },
          {
            "id": 17,
            "name": "Ceiling Fan",
            "icon": "TbPropeller",
            "displayOrder": 2
          },
          {
            "id": 22,
            "name": "Private Swimming Pool",
            "icon": "MdPool",
            "displayOrder": 1
          },
          {
            "id": 32,
            "name": "In-Unit Washing Machine",
            "icon": "TbWashMachine",
            "displayOrder": 2
          }
        ],
        "infoAreaPlaces": [
          {
            "id": 3,
            "name": "Senzo Mall",
            "distance": "4.0 km"
          },
          {
            "id": 14,
            "name": "Hurgada Red Sea Coast",
            "distance": "0.2 km"
          }
        ],
        "images": [
          {
            "id": 25,
            "imageUrl": "images/Rentals/a2f8ec75-5caf-4dbd-b364-15e6f7d60ce9.webp",
            "isPrimary": true,
            "sortOrder": 0
          },
          {
            "id": 26,
            "imageUrl": "images/Rentals/ae53e169-cbcd-4cae-83bf-161bf3e5c829.webp",
            "isPrimary": false,
            "sortOrder": 1
          },
          {
            "id": 27,
            "imageUrl": "images/Rentals/29d16062-f5a4-4b21-855e-0e51c76a328e.webp",
            "isPrimary": false,
            "sortOrder": 2
          },
          {
            "id": 28,
            "imageUrl": "images/Rentals/344724ad-8c55-4380-92cd-1a85f2880c29.webp",
            "isPrimary": false,
            "sortOrder": 3
          },
          {
            "id": 29,
            "imageUrl": "images/Rentals/010ec018-5752-4d4e-87f6-90b48525c365.webp",
            "isPrimary": false,
            "sortOrder": 4
          }
        ],
        "createdBy": "Mo@gmail.com",
        "createdAt": "2026-11-13T13:30:27.7197941",
        "updatedBy": "admin@realestate.com",
        "updatedAt": "2026-11-13T17:13:54.7983183"
      },
      {
        "id": 8,
        "code": "RENT-ZAY-TWN-301",
        "name": "Emerald Garden Townhouse in Sheikh Zayed",
        "description": "Charming 3-bedroom family townhouse nestled inside a prestigious gated compound in Sheikh Zayed. Features a private landscaped garden with outdoor BBQ grill, modern smart home controls, and proximity to international schools and elite clubs.",
        "rentalLocation": {
          "id": 7,
          "name": "Sheikh Zayed",
          "description": "Sheikh Zayed City is an upscale, boutique urban oasis celebrated for its tree-lined avenues, elite lifestyle clubs, fine dining promenades, and pedestrian-friendly compounds. It is ideal for families and professionals seeking secure, luxury rental properties including townhouses, modern duplexes, and garden apartments with quick access to the Cairo-Alexandria Desert Road.",
          "videoUrl": "videos/RentalLocations/66423b59-f97d-431a-9e45-2e4ff1224331.mp4"
        },
        "floor": "Ground + 1st Floor + Roof",
        "bedroomNo": 3,
        "bathroomNo": 3,
        "capacity": 6,
        "size": 290,
        "prices": [
          {
            "id": 29,
            "currency": "USD",
            "price": 290
          }
        ],
        "propertyType": 2,
        "isAvailable": true,
        "isFeatured": true,
        "hasSeaView": false,
        "hasPoolView": false,
        "hasGardenView": true,
        "hasMountainView": false,
        "hasCityView": false,
        "rulesCancellation": "Free cancellation up to 5 days prior to arrival. Family-friendly property.",
        "notes": "Compound security requires visitor ID pre-registration.",
        "listingDetails": {
          "lateCheckIn": "24/7 security gate check-in with compound pass",
          "services": [
            "Private Garden Maintenance",
            "Compound Clubhouse Access",
            "Children Playground Access"
          ],
          "extraPeopleFee": 35,
          "familyFriendly": true,
          "privateEntrance": true,
          "extraPeople": "Maximum 2 additional children allowed"
        },
        "categoryItems": [
          {
            "id": 3,
            "name": "Fully Equipped Kitchen",
            "icon": "TbToolsKitchen2",
            "displayOrder": 1
          },
          {
            "id": 4,
            "name": "Coffee Machine",
            "icon": "TbCoffee",
            "displayOrder": 2
          },
          {
            "id": 5,
            "name": "Dining Table and Chairs",
            "icon": "MdOutlineTableRestaurant",
            "displayOrder": 3
          },
          {
            "id": 6,
            "name": "Hot Rain Shower",
            "icon": "MdShower",
            "displayOrder": 1
          },
          {
            "id": 7,
            "name": "Bathtub",
            "icon": "TbBath",
            "displayOrder": 2
          },
          {
            "id": 9,
            "name": "King or Queen Bed with Linens",
            "icon": "TbBed",
            "displayOrder": 1
          },
          {
            "id": 10,
            "name": "Wardrobe and Clothes Hangers",
            "icon": "TbHanger",
            "displayOrder": 2
          },
          {
            "id": 13,
            "name": "High-Speed Wi-Fi",
            "icon": "TbWifi",
            "displayOrder": 1
          },
          {
            "id": 14,
            "name": "Smart TV with Satellite",
            "icon": "MdTv",
            "displayOrder": 2
          },
          {
            "id": 16,
            "name": "Air Conditioning",
            "icon": "TbAirConditioning",
            "displayOrder": 1
          },
          {
            "id": 19,
            "name": "Keyless Smart Lock",
            "icon": "TbKey",
            "displayOrder": 1
          },
          {
            "id": 23,
            "name": "Outdoor BBQ Area",
            "icon": "MdOutdoorGrill",
            "displayOrder": 2
          },
          {
            "id": 24,
            "name": "Private Garden",
            "icon": "TbPlant",
            "displayOrder": 3
          },
          {
            "id": 25,
            "name": "Gym Access",
            "icon": "TbBarbell",
            "displayOrder": 1
          },
          {
            "id": 31,
            "name": "Daily Housekeeping Service",
            "icon": "MdRoomService",
            "displayOrder": 1
          },
          {
            "id": 32,
            "name": "In-Unit Washing Machine",
            "icon": "TbWashMachine",
            "displayOrder": 2
          }
        ],
        "infoAreaPlaces": [
          {
            "id": 3,
            "name": "Senzo Mall",
            "distance": "2.5 km"
          },
          {
            "id": 8,
            "name": "El Kawther District",
            "distance": "1.0 km"
          }
        ],
        "images": [
          {
            "id": 20,
            "imageUrl": "images/Rentals/4a7f867b-4b28-40a4-b408-cb7f31e6b1c9.webp",
            "isPrimary": true,
            "sortOrder": 0
          },
          {
            "id": 21,
            "imageUrl": "images/Rentals/e21e9ab8-dddc-4838-8823-cc6f7153764b.webp",
            "isPrimary": false,
            "sortOrder": 1
          },
          {
            "id": 22,
            "imageUrl": "images/Rentals/ae4a92de-1e49-46a5-a034-e6196b90f26b.webp",
            "isPrimary": false,
            "sortOrder": 2
          },
          {
            "id": 23,
            "imageUrl": "images/Rentals/866ae903-2963-4b2e-9c01-5a75eedacec7.webp",
            "isPrimary": false,
            "sortOrder": 3
          },
          {
            "id": 24,
            "imageUrl": "images/Rentals/ecab6a1c-fa70-499d-a31b-876c4aea8510.webp",
            "isPrimary": false,
            "sortOrder": 4
          }
        ],
        "createdBy": "Mo@gmail.com",
        "createdAt": "2026-11-13T13:29:50.7787863",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 7,
        "code": "RENT-CAI-APT-201",
        "name": "Parkview Executive Suite in New Cairo",
        "description": "Sophisticated 2-bedroom executive apartment situated in the heart of the Fifth Settlement near 90th Street. Designed for business travelers and luxury seekers, featuring high-speed optical fiber Wi-Fi, ergonomic workspace, and underground parking.",
        "rentalLocation": {
          "id": 5,
          "name": "New Cairo",
          "description": "New Cairo and the Fifth Settlement represent Egypt's most sought-after modern urban destination. Boasting premium gated compounds, high-end shopping districts like 90th Street, and state-of-the-art corporate centers, New Cairo offers an elevated rental market with contemporary luxury apartments, penthouses, and private pool villas tailored for executives, expatriates, and modern families.",
          "videoUrl": "videos/RentalLocations/ba7b2dc2-4b58-4247-a786-90552cdc7c13.mp4"
        },
        "floor": "2nd Floor",
        "bedroomNo": 2,
        "bathroomNo": 2,
        "capacity": 4,
        "size": 160,
        "prices": [
          {
            "id": 25,
            "currency": "USD",
            "price": 180
          }
        ],
        "propertyType": 0,
        "isAvailable": true,
        "isFeatured": true,
        "hasSeaView": false,
        "hasPoolView": false,
        "hasGardenView": true,
        "hasMountainView": false,
        "hasCityView": true,
        "rulesCancellation": "Flexible cancellation up to 48 hours before check-in for business travelers.",
        "notes": "High-speed fiber internet with backup battery included for remote workers.",
        "listingDetails": {
          "lateCheckIn": "24-hour reception desk and digital key access",
          "services": [
            "Underground Assigned Parking",
            "High-Speed Fiber Internet",
            "Dry Cleaning on Request"
          ],
          "extraPeopleFee": 25,
          "familyFriendly": true,
          "privateEntrance": false,
          "extraPeople": "1 additional adult or child allowed"
        },
        "categoryItems": [
          {
            "id": 3,
            "name": "Fully Equipped Kitchen",
            "icon": "TbToolsKitchen2",
            "displayOrder": 1
          },
          {
            "id": 4,
            "name": "Coffee Machine",
            "icon": "TbCoffee",
            "displayOrder": 2
          },
          {
            "id": 6,
            "name": "Hot Rain Shower",
            "icon": "MdShower",
            "displayOrder": 1
          },
          {
            "id": 9,
            "name": "King or Queen Bed with Linens",
            "icon": "TbBed",
            "displayOrder": 1
          },
          {
            "id": 12,
            "name": "Dedicated Workspace and Desk",
            "icon": "TbDesk",
            "displayOrder": 4
          },
          {
            "id": 13,
            "name": "High-Speed Wi-Fi",
            "icon": "TbWifi",
            "displayOrder": 1
          },
          {
            "id": 14,
            "name": "Smart TV with Satellite",
            "icon": "MdTv",
            "displayOrder": 2
          },
          {
            "id": 15,
            "name": "Laptop-Friendly Workspace",
            "icon": "TbDesk",
            "displayOrder": 3
          },
          {
            "id": 16,
            "name": "Air Conditioning",
            "icon": "TbAirConditioning",
            "displayOrder": 1
          },
          {
            "id": 19,
            "name": "Keyless Smart Lock",
            "icon": "TbKey",
            "displayOrder": 1
          },
          {
            "id": 25,
            "name": "Gym Access",
            "icon": "TbBarbell",
            "displayOrder": 1
          },
          {
            "id": 30,
            "name": "EV Charging Station",
            "icon": "TbChargingPile",
            "displayOrder": 3
          }
        ],
        "infoAreaPlaces": [
          {
            "id": 2,
            "name": "Hurghada International Airport",
            "distance": "18.0 km"
          },
          {
            "id": 3,
            "name": "Senzo Mall",
            "distance": "1.5 km"
          }
        ],
        "images": [
          {
            "id": 15,
            "imageUrl": "images/Rentals/aa10f3d5-8a01-4197-8442-ad735b40aa3f.webp",
            "isPrimary": true,
            "sortOrder": 0
          },
          {
            "id": 16,
            "imageUrl": "images/Rentals/d705b2a0-00aa-4788-8093-52a2ee3200bb.webp",
            "isPrimary": false,
            "sortOrder": 1
          },
          {
            "id": 17,
            "imageUrl": "images/Rentals/587bdc8f-d1b4-4b74-aefd-f6b640adba7b.webp",
            "isPrimary": false,
            "sortOrder": 2
          },
          {
            "id": 18,
            "imageUrl": "images/Rentals/835698ba-ddc5-48dc-aa30-6d2432e2171e.webp",
            "isPrimary": false,
            "sortOrder": 3
          },
          {
            "id": 19,
            "imageUrl": "images/Rentals/464bad03-bde4-4cbf-a1b8-d3744c5a1aea.webp",
            "isPrimary": false,
            "sortOrder": 4
          }
        ],
        "createdBy": "Mo@gmail.com",
        "createdAt": "2026-11-13T13:29:42.8437102",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 6,
        "code": "RENT-NC-PNT-103",
        "name": "The Royal Sky Penthouse with Private Jacuzzi",
        "description": "Exclusive top-floor penthouse offering 360-degree views of the Mediterranean Sea. Features an expansive rooftop terrace with heated jacuzzi, outdoor dining lounge, and master suite with walk-in closet.",
        "rentalLocation": {
          "id": 6,
          "name": "North Coast",
          "description": "The North Coast (Sahel) is Egypt's crown jewel for Mediterranean summer escapes and luxury beachfront rentals. Stretching along pristine white sand beaches and crystal-turquoise waters, prime areas such as Ras El Hekma and Sidi Abdel Rahman feature ultra-luxurious seaside chalets, private beach villas, and resort apartments perfect for high-yield vacation stays and seasonal retreats.",
          "videoUrl": "videos/RentalLocations/b167d1ae-8dd0-4643-a090-69dc135f00d4.mp4"
        },
        "floor": "3rd Floor & Private Roof",
        "bedroomNo": 3,
        "bathroomNo": 3,
        "capacity": 6,
        "size": 240,
        "prices": [
          {
            "id": 21,
            "currency": "USD",
            "price": 420
          }
        ],
        "propertyType": 4,
        "isAvailable": true,
        "isFeatured": true,
        "hasSeaView": true,
        "hasPoolView": true,
        "hasGardenView": false,
        "hasMountainView": false,
        "hasCityView": true,
        "rulesCancellation": "Free cancellation up to 10 days before check-in. Strict non-smoking policy.",
        "notes": "Rooftop terrace music allowed until midnight at moderate volume.",
        "listingDetails": {
          "lateCheckIn": "24/7 keyless entry with customized access code",
          "services": [
            "Heated Jacuzzi Maintenance",
            "Smart TV with Premium Streaming",
            "Daily Pool & Terrace Cleaning"
          ],
          "extraPeopleFee": 40,
          "familyFriendly": true,
          "privateEntrance": true,
          "extraPeople": "Up to 2 additional guests with foldable luxury beds"
        },
        "categoryItems": [
          {
            "id": 3,
            "name": "Fully Equipped Kitchen",
            "icon": "TbToolsKitchen2",
            "displayOrder": 1
          },
          {
            "id": 6,
            "name": "Hot Rain Shower",
            "icon": "MdShower",
            "displayOrder": 1
          },
          {
            "id": 7,
            "name": "Bathtub",
            "icon": "TbBath",
            "displayOrder": 2
          },
          {
            "id": 9,
            "name": "King or Queen Bed with Linens",
            "icon": "TbBed",
            "displayOrder": 1
          },
          {
            "id": 13,
            "name": "High-Speed Wi-Fi",
            "icon": "TbWifi",
            "displayOrder": 1
          },
          {
            "id": 14,
            "name": "Smart TV with Satellite",
            "icon": "MdTv",
            "displayOrder": 2
          },
          {
            "id": 16,
            "name": "Air Conditioning",
            "icon": "TbAirConditioning",
            "displayOrder": 1
          },
          {
            "id": 20,
            "name": "In-Room Safety Safe",
            "icon": "TbLock",
            "displayOrder": 2
          },
          {
            "id": 23,
            "name": "Outdoor BBQ Area",
            "icon": "MdOutdoorGrill",
            "displayOrder": 2
          },
          {
            "id": 26,
            "name": "Jacuzzi and Hot Tub",
            "icon": "MdHotTub",
            "displayOrder": 2
          },
          {
            "id": 28,
            "name": "24/7 Concierge Desk",
            "icon": "FaBellConcierge",
            "displayOrder": 1
          }
        ],
        "infoAreaPlaces": [
          {
            "id": 6,
            "name": "Hurghada Marina",
            "distance": "2.0 km"
          },
          {
            "id": 14,
            "name": "Hurgada Red Sea Coast",
            "distance": "0.3 km"
          }
        ],
        "images": [
          {
            "id": 10,
            "imageUrl": "images/Rentals/f0edc344-8c3b-43eb-855e-380bec138b40.webp",
            "isPrimary": true,
            "sortOrder": 0
          },
          {
            "id": 11,
            "imageUrl": "images/Rentals/845fb9dd-8c44-474d-8e2b-4f67e6f52c28.webp",
            "isPrimary": false,
            "sortOrder": 1
          },
          {
            "id": 12,
            "imageUrl": "images/Rentals/d1d9de0a-fe3a-4de3-818b-d5df87907f92.webp",
            "isPrimary": false,
            "sortOrder": 2
          },
          {
            "id": 13,
            "imageUrl": "images/Rentals/445094ef-f89a-4d83-a8c6-b10bf9d79ab0.webp",
            "isPrimary": false,
            "sortOrder": 3
          },
          {
            "id": 14,
            "imageUrl": "images/Rentals/42a31d82-cff7-4af5-87cb-23b5fea6531b.webp",
            "isPrimary": false,
            "sortOrder": 4
          }
        ],
        "createdBy": "Mo@gmail.com",
        "createdAt": "2026-11-13T13:29:35.8549203",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 5,
        "code": "RENT-NC-VIL-101",
        "name": "Azure Coastline Luxury Beachfront Villa",
        "description": "Experience Mediterranean luxury at its finest in this spectacular 4-bedroom beachfront villa on the North Coast. Featuring a private infinity pool, direct beach access, panoramic sea views, and designer interiors. Perfectly appointed for family vacations and discerning travelers seeking privacy and elegance.",
        "rentalLocation": {
          "id": 6,
          "name": "North Coast",
          "description": "The North Coast (Sahel) is Egypt's crown jewel for Mediterranean summer escapes and luxury beachfront rentals. Stretching along pristine white sand beaches and crystal-turquoise waters, prime areas such as Ras El Hekma and Sidi Abdel Rahman feature ultra-luxurious seaside chalets, private beach villas, and resort apartments perfect for high-yield vacation stays and seasonal retreats.",
          "videoUrl": "videos/RentalLocations/b167d1ae-8dd0-4643-a090-69dc135f00d4.mp4"
        },
        "floor": "Ground + 1st Floor",
        "bedroomNo": 4,
        "bathroomNo": 4,
        "capacity": 8,
        "size": 380,
        "prices": [
          {
            "id": 17,
            "currency": "USD",
            "price": 650
          }
        ],
        "propertyType": 1,
        "isAvailable": true,
        "isFeatured": true,
        "hasSeaView": true,
        "hasPoolView": true,
        "hasGardenView": true,
        "hasMountainView": false,
        "hasCityView": false,
        "rulesCancellation": "Free cancellation up to 14 days before check-in. 50% refund between 7 and 14 days. No smoking indoors.",
        "notes": "Special weekly and monthly rates available. Private yacht charter booking upon request.",
        "listingDetails": {
          "lateCheckIn": "Available on request up to 02:00 AM",
          "services": [
            "Daily Housekeeping",
            "Private Chef on Request",
            "Airport Transfer",
            "Beach Towels Service"
          ],
          "extraPeopleFee": 50,
          "familyFriendly": true,
          "privateEntrance": true,
          "extraPeople": "Maximum 2 additional guests upon request"
        },
        "categoryItems": [
          {
            "id": 3,
            "name": "Fully Equipped Kitchen",
            "icon": "TbToolsKitchen2",
            "displayOrder": 1
          },
          {
            "id": 4,
            "name": "Coffee Machine",
            "icon": "TbCoffee",
            "displayOrder": 2
          },
          {
            "id": 5,
            "name": "Dining Table and Chairs",
            "icon": "MdOutlineTableRestaurant",
            "displayOrder": 3
          },
          {
            "id": 6,
            "name": "Hot Rain Shower",
            "icon": "MdShower",
            "displayOrder": 1
          },
          {
            "id": 7,
            "name": "Bathtub",
            "icon": "TbBath",
            "displayOrder": 2
          },
          {
            "id": 9,
            "name": "King or Queen Bed with Linens",
            "icon": "TbBed",
            "displayOrder": 1
          },
          {
            "id": 13,
            "name": "High-Speed Wi-Fi",
            "icon": "TbWifi",
            "displayOrder": 1
          },
          {
            "id": 14,
            "name": "Smart TV with Satellite",
            "icon": "MdTv",
            "displayOrder": 2
          },
          {
            "id": 16,
            "name": "Air Conditioning",
            "icon": "TbAirConditioning",
            "displayOrder": 1
          },
          {
            "id": 19,
            "name": "Keyless Smart Lock",
            "icon": "TbKey",
            "displayOrder": 1
          },
          {
            "id": 22,
            "name": "Private Swimming Pool",
            "icon": "MdPool",
            "displayOrder": 1
          },
          {
            "id": 23,
            "name": "Outdoor BBQ Area",
            "icon": "MdOutdoorGrill",
            "displayOrder": 2
          },
          {
            "id": 24,
            "name": "Private Garden",
            "icon": "TbPlant",
            "displayOrder": 3
          },
          {
            "id": 28,
            "name": "24/7 Concierge Desk",
            "icon": "FaBellConcierge",
            "displayOrder": 1
          },
          {
            "id": 31,
            "name": "Daily Housekeeping Service",
            "icon": "MdRoomService",
            "displayOrder": 1
          }
        ],
        "infoAreaPlaces": [
          {
            "id": 6,
            "name": "Hurghada Marina",
            "distance": "3.5 km"
          },
          {
            "id": 14,
            "name": "Hurgada Red Sea Coast",
            "distance": "Direct Access (0 km)"
          }
        ],
        "images": [
          {
            "id": 4,
            "imageUrl": "images/Rentals/66153ce9-827a-48a5-a2ff-6ffb16be4f80.webp",
            "isPrimary": true,
            "sortOrder": 0
          },
          {
            "id": 5,
            "imageUrl": "images/Rentals/03fda326-454f-47ea-8783-a00b0ae69add.webp",
            "isPrimary": false,
            "sortOrder": 1
          },
          {
            "id": 6,
            "imageUrl": "images/Rentals/dacfe8d4-9880-434e-99c6-b0a342ecd403.webp",
            "isPrimary": false,
            "sortOrder": 2
          },
          {
            "id": 7,
            "imageUrl": "images/Rentals/5aab2753-128a-41ce-97c8-68b9d21ef4be.webp",
            "isPrimary": false,
            "sortOrder": 3
          },
          {
            "id": 8,
            "imageUrl": "images/Rentals/d535f280-870a-4a6d-97e6-cfcf5856077f.webp",
            "isPrimary": false,
            "sortOrder": 4
          },
          {
            "id": 9,
            "imageUrl": "images/Rentals/1fa3fe33-afb4-4837-9a1d-f5c52f9e9c70.webp",
            "isPrimary": false,
            "sortOrder": 5
          }
        ],
        "createdBy": "Mo@gmail.com",
        "createdAt": "2026-11-13T13:29:25.0105082",
        "updatedBy": null,
        "updatedAt": null
      }
    ],
    "pageNumber": 1,
    "totalPages": 1,
    "totalCount": 6,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,15 Nov 2026 13:14:50 GMT 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": {
    "items": [
      {
        "id": 0,
        "code": "string",
        "name": "string",
        "description": "string",
        "rentalLocation": {
          "id": 0,
          "name": "string",
          "description": "string",
          "videoUrl": "string"
        },
        "floor": "string",
        "bedroomNo": 0,
        "bathroomNo": 0,
        "capacity": 0,
        "size": 0,
        "prices": [
          {
            "id": 0,
            "currency": "string",
            "price": 0
          }
        ],
        "propertyType": "Apartment",
        "isAvailable": true,
        "isFeatured": true,
        "hasSeaView": true,
        "hasPoolView": true,
        "hasGardenView": true,
        "hasMountainView": true,
        "hasCityView": true,
        "rulesCancellation": "string",
        "notes": "string",
        "listingDetails": {
          "lateCheckIn": "string",
          "services": [
            "string"
          ],
          "extraPeopleFee": 0,
          "familyFriendly": true,
          "privateEntrance": true,
          "extraPeople": "string"
        },
        "categoryItems": [
          {
            "id": 0,
            "name": "string",
            "icon": "string",
            "displayOrder": 0
          }
        ],
        "infoAreaPlaces": [
          {
            "id": 0,
            "name": "string",
            "distance": "string"
          }
        ],
        "images": [
          {
            "id": 0,
            "imageUrl": "string",
            "isPrimary": true,
            "sortOrder": 0
          }
        ],
        "createdBy": "string",
        "createdAt": "2026-11-15T13:15:15.552Z",
        "updatedBy": "string",
        "updatedAt": "2026-11-15T13:15:15.552Z"
      }
    ],
    "pageNumber": 0,
    "totalPages": 0,
    "totalCount": 0,
    "hasPreviousPage": true,
    "hasNextPage": true
  },
  "errors": "string"
}
No links

POST
/api/rentals


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "code": "string",
  "name": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "description": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "rentalLocationId": 0,
  "floor": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "bedroomNo": 0,
  "bathroomNo": 0,
  "capacity": 0,
  "size": 0,
  "priceUSD": 0,
  "propertyType": "Apartment",
  "isAvailable": true,
  "isFeatured": true,
  "hasSeaView": true,
  "hasPoolView": true,
  "hasGardenView": true,
  "hasMountainView": true,
  "hasCityView": true,
  "rulesCancellation": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "notes": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "listingDetails": {
    "lateCheckIn": {
      "en": "string",
      "ar": "string",
      "de": "string"
    },
    "services": [
      {
        "en": "string",
        "ar": "string",
        "de": "string"
      }
    ],
    "extraPeopleFee": 0,
    "familyFriendly": true,
    "privateEntrance": true,
    "extraPeople": {
      "en": "string",
      "ar": "string",
      "de": "string"
    }
  },
  "propertyCategoryItemIds": [
    0
  ],
  "infoAreaPlaces": [
    {
      "infoAreaPlaceId": 0,
      "distance": "string"
    }
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "message": "string",
    "prices": [
      {
        "id": 0,
        "currency": "string",
        "price": 0
      }
    ],
    "categoryItems": [
      {
        "id": 0,
        "name": "string",
        "icon": "string",
        "displayOrder": 0
      }
    ],
    "infoAreaPlaces": [
      {
        "id": 0,
        "name": "string",
        "distance": "string"
      }
    ]
  },
  "errors": "string"
}
No links

GET
/api/rentals/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
10
language
string
(query)

--
currency
string
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/rentals/10' \
  -H 'accept: text/plain'
Request URL
https://realestate44.runasp.net/api/rentals/10
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "",
  "data": {
    "id": 10,
    "code": "RENT-NC-CHL-103",
    "name": "Luxury Lagoon View Chalet",
    "description": "A luxury two-bedroom chalet in the North Coast, featuring a spacious terrace, modern furniture, and direct access to the crystal lagoon.",
    "rentalLocation": {
      "id": 7,
      "name": "Sheikh Zayed",
      "description": "Sheikh Zayed City is an upscale, boutique urban oasis celebrated for its tree-lined avenues, elite lifestyle clubs, fine dining promenades, and pedestrian-friendly compounds. It is ideal for families and professionals seeking secure, luxury rental properties including townhouses, modern duplexes, and garden apartments with quick access to the Cairo-Alexandria Desert Road.",
      "videoUrl": "videos/RentalLocations/66423b59-f97d-431a-9e45-2e4ff1224331.mp4"
    },
    "floor": "First Floor",
    "bedroomNo": 2,
    "bathroomNo": 2,
    "capacity": 5,
    "size": 135,
    "prices": [
      {
        "id": 37,
        "currency": "USD",
        "price": 95
      }
    ],
    "propertyType": 0,
    "isAvailable": true,
    "isFeatured": true,
    "hasSeaView": false,
    "hasPoolView": true,
    "hasGardenView": true,
    "hasMountainView": false,
    "hasCityView": false,
    "rulesCancellation": "Free cancellation up to 7 days before check-in. Pets are not allowed.",
    "notes": "Quiet hours are from 11:00 PM to 08:00 AM.",
    "listingDetails": {
      "lateCheckIn": "Self check-in with a smart lock after 03:00 PM.",
      "services": [
        "High-Speed Wi-Fi",
        "Complimentary Beach Chairs",
        "Private Parking"
      ],
      "extraPeopleFee": 15,
      "familyFriendly": true,
      "privateEntrance": true,
      "extraPeople": "One child under 12 years old can stay free of charge."
    },
    "categoryItems": [
      {
        "id": 3,
        "name": "Fully Equipped Kitchen",
        "icon": "TbToolsKitchen2",
        "displayOrder": 1
      }
    ],
    "infoAreaPlaces": [
      {
        "id": 3,
        "name": "Senzo Mall",
        "distance": "4.0 km"
      }
    ],
    "images": [],
    "createdBy": "admin@realestate.com",
    "createdAt": "2026-11-14T12:35:44.8596382",
    "updatedBy": null,
    "updatedAt": null
  },
  "errors": null
}