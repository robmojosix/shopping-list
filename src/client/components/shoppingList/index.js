import React from "react";
import { AddItem, List } from "../";
import { func } from "prop-types";

const displayName = "ShoppingList";
const defaultProps = {
	fetchUtility: null
};
const propTypes = {
	fetchUtility: func
};

const calculateCartTotal = (list) => {
	return list.reduce((total, item) => (total + item.price), 0);
};

class ShoppingList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			idTracker: 1,
			list: [],
			total: 0,
			rates: []
		};
		this.addItemtoList = this.addItemtoList.bind(this);
		this.removeFromList = this.removeFromList.bind(this);
	}

	componentDidMount() {
		this.props.fetchUtility()
			.then(({ quotes }) => this.setState({rates: quotes}) )
			.catch((err) => console.log(err))
	}

	addItemtoList(item) {
		this.setState((state) => {
			const list = [
				...state.list,
				{
					...item,
					id: state.idTracker
				}
			];
			return {
				list,
				idTracker: state.idTracker + 1,
				total: calculateCartTotal(list)
			};
		});
	}

	removeFromList(id) {
		this.setState((state) => {
			const list = state.list.filter((item) => item.id !== id);
			return {
				list,
				total: calculateCartTotal(list)
			};
		});
	}

	// couldn't update state in render or other lifecycle methods
	// as we create a circular dependancy.
	// When props or state is updated React assumes we need to re-render the content.
	// shouldComponentUpdate(nextProps, nextState) solves this
	render() {
		return (
			<div>
				<AddItem onSubmitHandler={this.addItemtoList} />
				<List list={this.state.list} handleRemoveFromList={this.removeFromList}/>
				{`Total: ${this.state.total}`}
			</div>
		);
	}
}

ShoppingList.displayName = displayName;
ShoppingList.defaultProps = defaultProps;
ShoppingList.propTypes = propTypes;

export default ShoppingList;
