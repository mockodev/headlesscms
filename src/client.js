import * as contentful from "contentful";

export const client = contentful.createClient({
  //   accessToken: "0Uk-wSM6gQPI7gky_ZU-SigEj7lu39_hp0CS6vcohYU",
  //   space: "clazyxiognn2",
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
});
