/* global describe, it, beforeEach */
/* eslint no-unused-expressions: "off" */
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import Home from '../index';

chai.use(chaiEnzyme());

describe('(Component) Home', () => {
    it('renders without errors', () => {
        const rendered = shallow(<Home />);
        expect(rendered.text('.Home')).to.have.string('Hello World'); // replace with real test
    });
});
