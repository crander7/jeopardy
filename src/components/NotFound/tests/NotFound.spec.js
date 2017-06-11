/* global describe, it, beforeEach */
/* eslint no-unused-expressions: "off" */
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import NotFound from '../index';

chai.use(chaiEnzyme());

describe('(Component) NotFound', () => {
    it('renders without errors', () => {
        const rendered = shallow(<NotFound />);
        expect(rendered.find('.NotFound').text()).to.have.string('404');
    });
});
