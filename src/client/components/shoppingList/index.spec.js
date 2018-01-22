import React from "react";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import { ShoppingList, AddItem, List } from "../";
import { currencylayerUrl, currenciesPath } from "../../config";
import { stub } from "sinon";

describe("ShoppingList", () => {
	let wrapper;
	let fetchStub;
	const payload = { quotes : {"GBPUSD": 0.9892} };
	const promisePayload = new Promise((resolve) => {
		resolve(payload);
	});

	beforeEach(() => {
		fetchStub = stub().returns(promisePayload);
		wrapper = shallow(<ShoppingList fetchUtility={fetchStub}/>);
	});

	it("renders the AddItem component", () => {
		expect(wrapper.find(AddItem).length).to.equal(1);
	});

	it("renders a List component", () => {
		expect(wrapper.find(List).length).to.equal(1);
	});

	it("Adds to the list in state", () => {
		fetchStub = stub().returns(promisePayload);
		wrapper = mount(<ShoppingList fetchUtility={fetchStub}/>);
		const form = wrapper.find(AddItem);
		const newState = [ { id: 1, title: "", price: 0 } ];

		form.simulate("submit");
		expect(wrapper.state().list).to.deep.equal(newState);
	});

	it("displays the correct total", () => {
		const items = [
			{title: "beans", price: 2},
			{title: "eggs", price: 1},
			{title: "bread", price: 4}
		];
		wrapper.instance().addItemtoList(items[0]);
		wrapper.instance().addItemtoList(items[1]);

		expect(wrapper.state().total).to.equal(3);
	});

	it("removes an item from state when handleRemoveFromList is called", () => {
		fetchStub = stub().returns(promisePayload);
		wrapper = mount(<ShoppingList fetchUtility={fetchStub}/>);
		const items = [
			{title: "beans", price: 2, id: 1},
			{title: "eggs", price: 1, id: 2},
			{title: "bread", price: 4, id: 3}
    ];
    wrapper.setState({list: items});
    wrapper.find("li").at(0).find("button").simulate("click");
		expect(wrapper.find("li").length).to.equal(items.length - 1);
	});

	it("increments idTracker after every addItem call", () => {
		expect(wrapper.state().idTracker).to.equal(1);
		const list = [
			{title: "beans", price: 2},
			{title: "eggs", price: 1},
			{title: "bread", price: 4}
		];
		wrapper.instance().addItemtoList(list);
		expect(wrapper.state().idTracker).to.equal(2);
	});

	it("calls the currenies api on mount", () => {
		expect(fetchStub.calledOnce).to.equal(true);
	});
});
