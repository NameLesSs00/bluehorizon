notes for the contact 
	ContactStatusContactStatusstring
Enum:
[ Pending, Viewed ]
type	ContactTypeContactTypestring
Enum:
[ BuyUnit, SellUnit, Other, Investment ]
hearFrom	ContactHearFromContactHearFromstring
Enum:
[ SocialMedia, Advertisement, SEO, Other, Friend ]
and the create endpoint or the Post we will create the hook for it but we will not add it in the admin pages the admin will be only view them adn delte and also edit the sataue to be viewed 

Contacts


GET
/api/Contacts


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/Contacts' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/Contacts
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+201234567890",
      "type": "BuyUnit",
      "hearFrom": "SocialMedia",
      "status": "Viewed",
      "notes": "Interested in viewing available properties in El Kawther next week.",
      "createdAt": "2026-11-07T10:22:56.135695",
      "updatedAt": "2026-11-07T10:23:35.4535546"
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:23:42 GMT 
 server: Microsoft-IIS/10.0 
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
[
  {
    "id": 0,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "type": "BuyUnit",
    "hearFrom": "SocialMedia",
    "status": "Pending",
    "notes": "string",
    "createdAt": "2026-11-07T10:23:55.840Z",
    "updatedAt": "2026-11-07T10:23:55.840Z"
  }
]
No links

POST
/api/Contacts


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+201234567890",
  "type": "BuyUnit",
  "hearFrom": "SocialMedia",
  "notes": "Interested in viewing available properties in El Kawther next week."
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/Contacts' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+201234567890",
  "type": "BuyUnit",
  "hearFrom": "SocialMedia",
  "notes": "Interested in viewing available properties in El Kawther next week."
}'
Request URL
https://realestate44.runasp.net/api/Contacts
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": 1,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:22:55 GMT 
 server: Microsoft-IIS/10.0 
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
  "succeeded": true,
  "errors": [
    "string"
  ],
  "data": 0
}
No links

GET
/api/Contacts/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/Contacts/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/Contacts/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+201234567890",
    "type": "BuyUnit",
    "hearFrom": "SocialMedia",
    "status": "Pending",
    "notes": "Interested in viewing available properties in El Kawther next week.",
    "createdAt": "2026-11-07T10:22:56.135695",
    "updatedAt": null
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:23:23 GMT 
 server: Microsoft-IIS/10.0 
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
  "id": 0,
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "type": "BuyUnit",
  "hearFrom": "SocialMedia",
  "status": "Pending",
  "notes": "string",
  "createdAt": "2026-11-07T10:23:55.847Z",
  "updatedAt": "2026-11-07T10:23:55.847Z"
}
No links

DELETE
/api/Contacts/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://realestate44.runasp.net/api/Contacts/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/Contacts/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:23:54 GMT 
 server: Microsoft-IIS/10.0 
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
true
No links

PUT
/api/Contacts/{id}/status


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
1
Request body

application/json
{
  "status": "Viewed"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate44.runasp.net/api/Contacts/1/status' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g' \
  -H 'Content-Type: application/json' \
  -d '{
  "status": "Viewed"
}'
Request URL
https://realestate44.runasp.net/api/Contacts/1/status
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:23:34 GMT 
 server: Microsoft-IIS/10.0 
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
true

---

Blogs


GET
/api/Blogs


Parameters
Cancel
Name	Description
Language
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
  'https://realestate44.runasp.net/api/Blogs' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/Blogs
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "items": [
      {
        "id": 2,
        "title": "Discovering Blue Horizon & Coastal Living in Hurghada, Egypt",
        "imageUrl": "",
        "sections": [
          {
            "id": 2,
            "sectionNumber": 1,
            "tittle": "The Appeal of Hurghada Real Estate",
            "content": "Hurghada continues to stand out as one of Egypt's premier destinations for real estate investment and lifestyle buyers. With year-round sunshine, pristine Red Sea waters, and expanding infrastructure, properties in areas like El Kawthar and the coast offer remarkable long-term value and high rental yields.",
            "imageUrl": ""
          },
          {
            "id": 3,
            "sectionNumber": 2,
            "tittle": "Modern Comfort and Strategic Locations",
            "content": "Real estate projects along the Red Sea combine modern architectural design with accessibility. Situated close to international airports, pristine beaches, and bustling commercial avenues, developments provide residents and investors with convenience, high-end finishing, and secure gated communities.",
            "imageUrl": ""
          }
        ]
      },
      {
        "id": 1,
        "title": "Discovering Blue Horizon & Coastal Living in Hurghada, Egypt",
        "imageUrl": "images/blogs/22d49f9e-e896-443a-a8b0-a2c050f5b989.webp",
        "sections": [
          {
            "id": 4,
            "sectionNumber": 1,
            "tittle": "The Appeal of Hurghada Real Estate",
            "content": "Hurghada continues to stand out as one of Egypt's premier destinations for real estate investment and lifestyle buyers. With year-round sunshine, pristine Red Sea waters, and expanding infrastructure, properties in areas like El Kawthar and the coast offer remarkable long-term value and high rental yields.",
            "imageUrl": "images/blogs/17c9276e-2b45-4cad-8721-3baf2b90c423.webp"
          },
          {
            "id": 5,
            "sectionNumber": 2,
            "tittle": "Modern Comfort and Strategic Locations",
            "content": "Real estate projects along the Red Sea combine modern architectural design with accessibility. Situated close to international airports, pristine beaches, and bustling commercial avenues, developments provide residents and investors with convenience, high-end finishing, and secure gated communities.",
            "imageUrl": ""
          }
        ]
      }
    ],
    "pageNumber": 1,
    "totalPages": 1,
    "totalCount": 2,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:30:36 GMT 
 server: Microsoft-IIS/10.0 
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
  "items": [
    {
      "id": 0,
      "title": "string",
      "imageUrl": "string",
      "sections": [
        {
          "id": 0,
          "sectionNumber": 0,
          "tittle": "string",
          "content": "string",
          "imageUrl": "string"
        }
      ]
    }
  ],
  "pageNumber": 0,
  "totalPages": 0,
  "totalCount": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}
No links

POST
/api/Blogs


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "title": {
    "en": "Discovering Blue Horizon & Coastal Living in Hurghada, Egypt",
    "ar": "اكتشاف بلو هورايزون والحياة الساحلية في الغردقة، مصر",
    "de": "Entdeckung von Blue Horizon und Küstenleben in Hurghada, Ägypten"
  },
  "sections": [
    {
      "sectionNumber": 1,
      "tittle": {
        "en": "The Appeal of Hurghada Real Estate",
        "ar": "جاذبية العقارات في الغردقة",
        "de": "Der Reiz von Immobilien in Hurghada"
      },
      "content": {
        "en": "Hurghada continues to stand out as one of Egypt's premier destinations for real estate investment and lifestyle buyers. With year-round sunshine, pristine Red Sea waters, and expanding infrastructure, properties in areas like El Kawthar and the coast offer remarkable long-term value and high rental yields.",
        "ar": "تستمر الغردقة في التميز كواحدة من أبرز الوجهات في مصر للاستثمار العقاري والمشترين الباحثين عن نمط حياة مميز. بفضل طقسها المشمس طوال العام، ومياه البحر الأحمر الصافية، والبنية التحتية المتنامية، توفر العقارات في مناطق مثل الكوثر والساحل قيمة استثمارية طويلة الأجل وعوائد إيجارية عالية.",
        "de": "Hurghada ist nach wie vor eines der führenden Ziele Ägyptens für Immobilieninvestitionen und Käufer von Lebensstilimmobilien. Mit ganzjährigem Sonnenschein, klarem Wasser des Roten Meeres und einer wachsenden Infrastruktur bieten Immobilien in Gebieten wie El Kawthar und an der Küste einen bemerkenswerten langfristigen Wert und hohe Mietrenditen."
      }
    },
    {
      "sectionNumber": 2,
      "tittle": {
        "en": "Modern Comfort and Strategic Locations",
        "ar": "الراحة العصرية والمواقع الاستراتيجية",
        "de": "Moderner Komfort und strategische Lagen"
      },
      "content": {
        "en": "Real estate projects along the Red Sea combine modern architectural design with accessibility. Situated close to international airports, pristine beaches, and bustling commercial avenues, developments provide residents and investors with convenience, high-end finishing, and secure gated communities.",
        "ar": "تجمع مشاريع العقارات على طول البحر الأحمر بين التصميم المعماري الحديث وسهولة الوصول. وبفضل وجودها بالقرب من المطارات الدولية، والشواطئ النقية، والشوارع التجارية النابضة بالحياة، توفر المشاريع للمقيمين والمستثمرين الراحة، والتشطيبات الفاخرة، والمجمعات السكنية المسورة الآمنة.",
        "de": "Immobilienprojekte am Roten Meer verbinden modernes architektonisches Design mit hervorragender Erreichbarkeit. Nahe internationaler Flughäfen, unberührter Strände und belebter Einkaufsstraßen gelegen, bieten diese Entwicklungen den Bewohnern und Investoren Komfort, hochwertige Ausstattungen und sichere Wohnanlagen."
      }
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/Blogs' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": {
    "en": "Discovering Blue Horizon & Coastal Living in Hurghada, Egypt",
    "ar": "اكتشاف بلو هورايزون والحياة الساحلية في الغردقة، مصر",
    "de": "Entdeckung von Blue Horizon und Küstenleben in Hurghada, Ägypten"
  },
  "sections": [
    {
      "sectionNumber": 1,
      "tittle": {
        "en": "The Appeal of Hurghada Real Estate",
        "ar": "جاذبية العقارات في الغردقة",
        "de": "Der Reiz von Immobilien in Hurghada"
      },
      "content": {
        "en": "Hurghada continues to stand out as one of Egypt'\''s premier destinations for real estate investment and lifestyle buyers. With year-round sunshine, pristine Red Sea waters, and expanding infrastructure, properties in areas like El Kawthar and the coast offer remarkable long-term value and high rental yields.",
        "ar": "تستمر الغردقة في التميز كواحدة من أبرز الوجهات في مصر للاستثمار العقاري والمشترين الباحثين عن نمط حياة مميز. بفضل طقسها المشمس طوال العام، ومياه البحر الأحمر الصافية، والبنية التحتية المتنامية، توفر العقارات في مناطق مثل الكوثر والساحل قيمة استثمارية طويلة الأجل وعوائد إيجارية عالية.",
        "de": "Hurghada ist nach wie vor eines der führenden Ziele Ägyptens für Immobilieninvestitionen und Käufer von Lebensstilimmobilien. Mit ganzjährigem Sonnenschein, klarem Wasser des Roten Meeres und einer wachsenden Infrastruktur bieten Immobilien in Gebieten wie El Kawthar und an der Küste einen bemerkenswerten langfristigen Wert und hohe Mietrenditen."
      }
    },
    {
      "sectionNumber": 2,
      "tittle": {
        "en": "Modern Comfort and Strategic Locations",
        "ar": "الراحة العصرية والمواقع الاستراتيجية",
        "de": "Moderner Komfort und strategische Lagen"
      },
      "content": {
        "en": "Real estate projects along the Red Sea combine modern architectural design with accessibility. Situated close to international airports, pristine beaches, and bustling commercial avenues, developments provide residents and investors with convenience, high-end finishing, and secure gated communities.",
        "ar": "تجمع مشاريع العقارات على طول البحر الأحمر بين التصميم المعماري الحديث وسهولة الوصول. وبفضل وجودها بالقرب من المطارات الدولية، والشواطئ النقية، والشوارع التجارية النابضة بالحياة، توفر المشاريع للمقيمين والمستثمرين الراحة، والتشطيبات الفاخرة، والمجمعات السكنية المسورة الآمنة.",
        "de": "Immobilienprojekte am Roten Meer verbinden modernes architektonisches Design mit hervorragender Erreichbarkeit. Nahe internationaler Flughäfen, unberührter Strände und belebter Einkaufsstraßen gelegen, bieten diese Entwicklungen den Bewohnern und Investoren Komfort, hochwertige Ausstattungen und sichere Wohnanlagen."
      }
    }
  ]
}'
Request URL
https://realestate44.runasp.net/api/Blogs
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": 2,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:28:14 GMT 
 server: Microsoft-IIS/10.0 
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
0
No links

PUT
/api/Blogs


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "id": 1,
  "title": {
    "en": "Discovering Blue Horizon & Coastal Living in Hurghada, Egypt",
    "ar": "اكتشاف بلو هورايزون والحياة الساحلية في الغردقة، مصر",
    "de": "Entdeckung von Blue Horizon und Küstenleben in Hurghada, Ägypten"
  },
  "sections": [
    {
      "sectionNumber": 1,
      "tittle": {
        "en": "The Appeal of Hurghada Real Estate",
        "ar": "جاذبية العقارات في الغردقة",
        "de": "Der Reiz von Immobilien in Hurghada"
      },
      "content": {
        "en": "Hurghada continues to stand out as one of Egypt's premier destinations for real estate investment and lifestyle buyers. With year-round sunshine, pristine Red Sea waters, and expanding infrastructure, properties in areas like El Kawthar and the coast offer remarkable long-term value and high rental yields.",
        "ar": "تستمر الغردقة في التميز كواحدة من أبرز الوجهات في مصر للاستثمار العقاري والمشترين الباحثين عن نمط حياة مميز. بفضل طقسها المشمس طوال العام، ومياه البحر الأحمر الصافية، والبنية التحتية المتنامية، توفر العقارات في مناطق مثل الكوثر والساحل قيمة استثمارية طويلة الأجل وعوائد إيجارية عالية.",
        "de": "Hurghada ist nach wie vor eines der führenden Ziele Ägyptens für Immobilieninvestitionen und Käufer von Lebensstilimmobilien. Mit ganzjährigem Sonnenschein, klarem Wasser des Roten Meeres und einer wachsenden Infrastruktur bieten Immobilien in Gebieten wie El Kawthar und an der Küste einen bemerkenswerten langfristigen Wert und hohe Mietrenditen."
      }
    },
    {
      "sectionNumber": 2,
      "tittle": {
        "en": "Modern Comfort and Strategic Locations",
        "ar": "الراحة العصرية والمواقع الاستراتيجية",
        "de": "Moderner Komfort und strategische Lagen"
      },
      "content": {
        "en": "Real estate projects along the Red Sea combine modern architectural design with accessibility. Situated close to international airports, pristine beaches, and bustling commercial avenues, developments provide residents and investors with convenience, high-end finishing, and secure gated communities.",
        "ar": "تجمع مشاريع العقارات على طول البحر الأحمر بين التصميم المعماري الحديث وسهولة الوصول. وبفضل وجودها بالقرب من المطارات الدولية، والشواطئ النقية، والشوارع التجارية النابضة بالحياة، توفر المشاريع للمقيمين والمستثمرين الراحة، والتشطيبات الفاخرة، والمجمعات السكنية المسورة الآمنة.",
        "de": "Immobilienprojekte am Roten Meer verbinden modernes architektonisches Design mit hervorragender Erreichbarkeit. Nahe internationaler Flughäfen, unberührter Strände und belebter Einkaufsstraßen gelegen, bieten diese Entwicklungen den Bewohnern und Investoren Komfort, hochwertige Ausstattungen und sichere Wohnanlagen."
      }
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate44.runasp.net/api/Blogs' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "title": {
    "en": "Discovering Blue Horizon & Coastal Living in Hurghada, Egypt",
    "ar": "اكتشاف بلو هورايزون والحياة الساحلية في الغردقة، مصر",
    "de": "Entdeckung von Blue Horizon und Küstenleben in Hurghada, Ägypten"
  },
  "sections": [
    {
      "sectionNumber": 1,
      "tittle": {
        "en": "The Appeal of Hurghada Real Estate",
        "ar": "جاذبية العقارات في الغردقة",
        "de": "Der Reiz von Immobilien in Hurghada"
      },
      "content": {
        "en": "Hurghada continues to stand out as one of Egypt'\''s premier destinations for real estate investment and lifestyle buyers. With year-round sunshine, pristine Red Sea waters, and expanding infrastructure, properties in areas like El Kawthar and the coast offer remarkable long-term value and high rental yields.",
        "ar": "تستمر الغردقة في التميز كواحدة من أبرز الوجهات في مصر للاستثمار العقاري والمشترين الباحثين عن نمط حياة مميز. بفضل طقسها المشمس طوال العام، ومياه البحر الأحمر الصافية، والبنية التحتية المتنامية، توفر العقارات في مناطق مثل الكوثر والساحل قيمة استثمارية طويلة الأجل وعوائد إيجارية عالية.",
        "de": "Hurghada ist nach wie vor eines der führenden Ziele Ägyptens für Immobilieninvestitionen und Käufer von Lebensstilimmobilien. Mit ganzjährigem Sonnenschein, klarem Wasser des Roten Meeres und einer wachsenden Infrastruktur bieten Immobilien in Gebieten wie El Kawthar und an der Küste einen bemerkenswerten langfristigen Wert und hohe Mietrenditen."
      }
    },
    {
      "sectionNumber": 2,
      "tittle": {
        "en": "Modern Comfort and Strategic Locations",
        "ar": "الراحة العصرية والمواقع الاستراتيجية",
        "de": "Moderner Komfort und strategische Lagen"
      },
      "content": {
        "en": "Real estate projects along the Red Sea combine modern architectural design with accessibility. Situated close to international airports, pristine beaches, and bustling commercial avenues, developments provide residents and investors with convenience, high-end finishing, and secure gated communities.",
        "ar": "تجمع مشاريع العقارات على طول البحر الأحمر بين التصميم المعماري الحديث وسهولة الوصول. وبفضل وجودها بالقرب من المطارات الدولية، والشواطئ النقية، والشوارع التجارية النابضة بالحياة، توفر المشاريع للمقيمين والمستثمرين الراحة، والتشطيبات الفاخرة، والمجمعات السكنية المسورة الآمنة.",
        "de": "Immobilienprojekte am Roten Meer verbinden modernes architektonisches Design mit hervorragender Erreichbarkeit. Nahe internationaler Flughäfen, unberührter Strände und belebter Einkaufsstraßen gelegen, bieten diese Entwicklungen den Bewohnern und Investoren Komfort, hochwertige Ausstattungen und sichere Wohnanlagen."
      }
    }
  ]
}'
Request URL
https://realestate44.runasp.net/api/Blogs
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:28:41 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/Blogs/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/Blogs/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/Blogs/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 1,
    "title": "Discovering Blue Horizon & Coastal Living in Hurghada, Egypt",
    "imageUrl": "",
    "sections": [
      {
        "id": 4,
        "sectionNumber": 1,
        "tittle": "The Appeal of Hurghada Real Estate",
        "content": "Hurghada continues to stand out as one of Egypt's premier destinations for real estate investment and lifestyle buyers. With year-round sunshine, pristine Red Sea waters, and expanding infrastructure, properties in areas like El Kawthar and the coast offer remarkable long-term value and high rental yields.",
        "imageUrl": ""
      },
      {
        "id": 5,
        "sectionNumber": 2,
        "tittle": "Modern Comfort and Strategic Locations",
        "content": "Real estate projects along the Red Sea combine modern architectural design with accessibility. Situated close to international airports, pristine beaches, and bustling commercial avenues, developments provide residents and investors with convenience, high-end finishing, and secure gated communities.",
        "imageUrl": ""
      }
    ]
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:29:11 GMT 
 server: Microsoft-IIS/10.0 
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
  "id": 0,
  "title": "string",
  "imageUrl": "string",
  "sections": [
    {
      "id": 0,
      "sectionNumber": 0,
      "tittle": "string",
      "content": "string",
      "imageUrl": "string"
    }
  ]
}
No links

DELETE
/api/Blogs/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
2
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://realestate44.runasp.net/api/Blogs/2' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/Blogs/2
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:30:52 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/Blogs/{id}/image


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
1
Request body

multipart/form-data
file
string($binary)
WhatsApp Image 2026-10-28 at 9.33.28 PM.jpeg
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/Blogs/1/image' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@WhatsApp Image 2026-10-28 at 9.33.28 PM.jpeg;type=image/jpeg'
Request URL
https://realestate44.runasp.net/api/Blogs/1/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": "images/blogs/22d49f9e-e896-443a-a8b0-a2c050f5b989.webp",
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:29:32 GMT 
 server: Microsoft-IIS/10.0 
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
  "succeeded": true,
  "errors": [
    "string"
  ],
  "data": "string"
}
No links

DELETE
/api/Blogs/{id}/image


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://realestate44.runasp.net/api/Blogs/1/image' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/Blogs/1/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:29:27 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/Blogs/{id}/sections/{sectionId}/image


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
1
sectionId *
integer($int32)
(path)
4
Request body

multipart/form-data
file
string($binary)
WhatsApp Image 2026-10-28 at 9.33.32 PM.jpeg
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/Blogs/1/sections/4/image' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@WhatsApp Image 2026-10-28 at 9.33.32 PM.jpeg;type=image/jpeg'
Request URL
https://realestate44.runasp.net/api/Blogs/1/sections/4/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": "images/blogs/17c9276e-2b45-4cad-8721-3baf2b90c423.webp",
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:30:24 GMT 
 server: Microsoft-IIS/10.0 
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
  "succeeded": true,
  "errors": [
    "string"
  ],
  "data": "string"
}
No links

DELETE
/api/Blogs/{id}/sections/{sectionId}/image


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
sectionId *
integer($int32)
(path)
4
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://realestate44.runasp.net/api/Blogs/1/sections/4/image' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/Blogs/1/sections/4/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 10:30:18 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK