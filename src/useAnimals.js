import { useEffect, useState } from "react";
import { client } from "./client";

function useAnimals() {
  useEffect(() => {
    client.getEntries().then((response) => {
      console.log(response);
    });
  });
}

export default useAnimals;
