import { useEffect, useState } from "react";
import { client } from "./client";

//getting information from contentful
//we use get Animal to retrieve a new simplified object and save it  line 7-17: object
const getAnimal = (animal) => ({
  id: animal.sys.id,
  name: animal.fields.name,
  latinName: animal.fields.latinName,
  thumbnails: animal.fields.thumbnails?.map((thumb) => ({
    url: thumb.fields.file.url,
    title: thumb.fields.title,
  })),
  //crop: animal.fields?.fields.file.url + "?w=300&h=200&fit=crop",
  img: animal.fields.image?.fields.file.url + "?w=400&h=300&fit=fill",
});

//hook created to include list of animals from API
function useAnimals() {
  //animals=current state, setAnimals=state setter
  const [animals, setAnimals] = useState([]); //we define useState and start with empty array

  //useEffect executes something at the end of the whole execution in React
  //useEffect = actions are exectued after the DOM is loaded (at the end)
  //fetch can have a lot of data, we need client.getEntries otherwise website won´t be shown
  //with client.getEntries we can have loading state
  useEffect(() => {
    client.getEntries()
    //if the server replies
    //response is a variable, depends on map function
      .then((response) => {
        console.log(response);
        const newAnimals = response.items.map((item) => getAnimal(item));
        setAnimals(newAnimals); //-> actions after answer, asynchronous callback
      })
      .catch((error) => console.log("Request failed: " + error));
    // .catch(() => console.log("Request failed"));
    //.catch -> in order to control error -> browser will display "Request failed" if promise is not fulfilled, but rejected
  }, []);

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
