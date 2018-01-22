import React from "react";
import { func } from "prop-types";

const displayName = "AddItem";
const defaultProps = {
	onSubmitHandler: null
};
const propTypes = {
	onSubmitHandler: func.isRequired
};

class AddItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			price: 0
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleTitleOnChange = this.handleTitleOnChange.bind(this);
		this.handlePriceOnChange = this.handlePriceOnChange.bind(this);
	}

	handleFormSubmit(event) {
		event.preventDefault();
		const item = {
			title: this.state.title,
			price: this.state.price
		};
		this.props.onSubmitHandler(item);
		this.setState({
			title: "",
			price: 0
		});
	}

	handleTitleOnChange(event) {
		this.setState({ title: event.target.value });
	}

	handlePriceOnChange(event) {
		this.setState({ price: parseFloat(event.target.value) });
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				Title: <input type="text" name="title" value={this.state.title} onChange={this.handleTitleOnChange} />
				Price: <input type="number" name="price" value={this.state.price} onChange={this.handlePriceOnChange} />
				<button>ADD</button>
			</form>
		);
	}
};



AddItem.displayName = displayName;
AddItem.defaultProps = defaultProps;
AddItem.propTypes = propTypes;

export default AddItem;
