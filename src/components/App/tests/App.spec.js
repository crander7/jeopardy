/* global describe, it, beforeEach */
/* eslint no-unused-expressions: "off" */
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import App from '../App';

const AppComponent = App.WrappedComponent;

chai.use(chaiEnzyme());

describe('(Component) AppComponent', () => {
    it('renders without errors', () => {
        const rendered = shallow(<AppComponent />);
        expect(rendered).to.have.length(1);
    });

    it('renders child components', () => {
        const Child = () => <div>Child Component</div>;
        const rendered = shallow(<AppComponent><Child /></AppComponent>);

        expect(rendered.find(Child)).to.have.length(1);
    });
});
