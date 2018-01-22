import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { stub } from "sinon";
import { AddItem } from "../";

describe("AddItem", () => {
	let wrapper;
	const onSubmit = stub();
	const defaultState = { title: "", price: 0 };

	beforeEach(() => {
		wrapper = shallow(<AddItem onSubmitHandler={onSubmit}/>);
	});

	it("renders a form", () => {
		expect(wrapper.type()).to.equal("form");
	});

	it("renders the title input", () => {
		expect(wrapper.find("input").at(0).prop("name")).to.equal("title");
	});

	it("renders the price input", () => {
		expect(wrapper.find("input").at(1).prop("name")).to.equal("price");
	});

	it("renders a submit button", () => {
		expect(wrapper.find("button").length).to.equal(1);
	});

	it("calls the submit prop", () => {
		wrapper.simulate("submit", { preventDefault() {} });
		expect(onSubmit.calledOnce).to.equal(true);
	});

	it("state defaults", () => {
		expect(wrapper.state()).to.deep.equal(defaultState);
	});

	it("updates the title state", () => {
		const title = "Beans";
		wrapper.find("input").at(0).simulate("change", {target: {value: title}});
		expect(wrapper.state().title).to.equal(title);
	});

	it("updates the price state", () => {
		const price = 3;
		wrapper.find("input").at(1).simulate("change", {target: {value: price}});
		expect(wrapper.state().price).to.equal(price);
	});

	it("resets state when submitted", () => {
		wrapper.find("input").at(0).simulate("change", {target: {value: "Beans"}});
		wrapper.find("input").at(1).simulate("change", {target: {value: 3}});
		wrapper.simulate("submit", { preventDefault() {} });
		expect(wrapper.state()).to.deep.equal(defaultState);
	});

	// Something learnt
	// expect(itemTitleInput.props()).to.have.property("title");
	// setState() is async only test react components with enzyme not vanilla api if it uses setState()
	// React may batch multiple setState() calls into a single update for performance.
	// Pass { preventDefault() {} } to simulate to fake it.
});
