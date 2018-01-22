import React from "react";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import { List } from "../";
import { stub } from "sinon";

describe("List", () => {
	let wrapper;
	const items = [
		{title: "beans", price: 2},
		{title: "eggs", price: 1},
		{title: "bread", price: 4}
	];

	it("renders no items by default", () => {
		wrapper = shallow(<List />);
		expect(wrapper.find("li").length).to.equal(0);
	});

	it("renders a shopping list", () => {
		wrapper = shallow(<List list={items}/>);
		expect(wrapper.find("li").length).to.equal(items.length);
  });

  it("renders a remove button", () => {
		wrapper = shallow(<List list={items}/>);
		expect(wrapper.find("li").find("button").length).to.equal(items.length);
  });

  it("calls handleRemoveFromList when delete button is pressed", () => {
    const handleRemoveFromListStub = stub();
    wrapper = mount(<List list={items} handleRemoveFromList={handleRemoveFromListStub}/>);
    const firstListItemDeleteButton = wrapper.find("li").at(0).find("button");
    firstListItemDeleteButton.simulate("click");

    expect(handleRemoveFromListStub.calledOnce).to.equal(true);
	});
});
