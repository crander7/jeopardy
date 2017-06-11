/* global describe, it, beforeEach */
/* eslint no-unused-expressions: "off" */
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import <%= pascalEntityName %> from '../index';

chai.use(chaiEnzyme());

describe('(Component) <%= pascalEntityName %>', () => {
    it('renders without errors', () => {
        const rendered = shallow(<<%= pascalEntityName %> />);
        expect(rendered.text()).to.have.string('ADD UNIT TESTS FOR THIS COMPONENT'); // replace with real test
    });
});
