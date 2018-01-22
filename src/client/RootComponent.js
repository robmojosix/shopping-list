import React from "react";

import { ShoppingList } from "./components/";

import { currenciesUrl } from "./config";
import fetch from "universal-fetch";

const fetchRates = () => {
	return fetch(currenciesUrl)
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

export default () => (
	<ShoppingList fetchUtility={fetchRates}/>
);
