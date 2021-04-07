import { useEffect, useState } from "react";
import { client } from "./client";
import PropTypes from "prop-types";

const getAnimal = (animal) => ({
  name: animal.fields.name,
  latinName: animal.fields.latinName,
  thumbnails: animal.fields.thumbnails?.map((thumb) => ({
    url: thumb.fields.file.url,
    title: thumb.fields.title,
  })),
  crop: animal.fields.image.fields.file.url + "?w=300&h=200&fit=crop",
  img: animal.fields.image.fields.file.url + "?w=400&h=300&fit=fill",
});

function useAnimals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    client.getEntries().then((response) => {
      console.log(response.items);
      const newAnimals = response.items.map((item) => getAnimal(item));
      setAnimals(newAnimals);
    });
  }, []);

  /* // 

    //`string text ${expression} string text`
    // animals[0].fields.image.fields.file.url
    //images.ctfassets.net/utnfcxl3mjrn/50p1o2nZkNiQZYZGs1308H/48e8b02fa2c1f0391ac3c6f343a2c28c/276650b7-nutty-shopper-t-501069.jpg?w=300&h=300&hfit=fill
    /*
    const asset = client.getAsset('50p1o2nZkNiQZYZGs1308H')
    .then((asset) => console.log(`${asset.fields.file.url}?w=300&h=300&fit=fill`))  ;  
    
    const asset2 = client.getAsset('50p1o2nZkNiQZYZGs1308H')
    .then((asset) => console.log(`${asset.fields.file.url}?w=300&h=200&fit=crop`))  ;  
*/

  return animals;
}

export default useAnimals;
/*
id: "50p1o2nZkNiQZYZGs1308H"
https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/change-the-resizing-behavior/retrieve-an-image/console/js


const asset = client.getAsset('<asset_id>')
  .then((asset) => console.log(`${asset.fields.file.url}?fm=jpg&fl=progressive`))

  const asset = client.getAsset('50p1o2nZkNiQZYZGs1308H')
  .then((asset) => console.log(`${asset.fields.file.url}?w=100&h=100`))
// function useMonsters() {
//   const [monsters, setMonsters] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedMonster, setSelectedMonster] = useState({});

//   useEffect(() => {
//     fetch("https://www.dnd5eapi.co/api/monsters/")
//       .then((response) => response.json())
//       .then((json) => {
//         setIsLoading(false);
//         setMonsters(json.results);
//       })
//       .catch(() => console.log("Request failed"));
//   }, []);

//   const selectMonster = (monstersInfo, toggle) => {
//     fetch(`https://www.dnd5eapi.co${monstersInfo.url}`)
//       .then((response) => response.json())
//       .then((json) => {
//         setSelectedMonster({
//           ...monstersInfo,
//           alignment: json.alignment,
//           type: json.type
//         });
//         toggle();
//       })
//       .catch(() => console.log("Request failed"));
//   };

//   return [monsters, selectedMonster, selectMonster, isLoading];
// }

// export default useMonsters;
*/
