import React from "react";
import { array, func } from "prop-types";

const displayName = "List";
const defaultProps = {
  list: [],
  handleRemoveFromList: null
};
const propTypes = {
  list: array,
  handleRemoveFromList: func
};

const List = ({ list, handleRemoveFromList }) => (
	<ul>
		{
			list.map(({title, price, id}, i) => {
				return (
					<li key={id} id={id}>
						{title} | {price} <button onClick={() => { handleRemoveFromList(id) } }>x</button>
					</li>
				);
			})
		}
	</ul>
);

List.displayName = displayName;
List.defaultProps = defaultProps;
List.propTypes = propTypes;

export default List;
