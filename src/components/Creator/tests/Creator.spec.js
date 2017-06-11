/* global describe, it, beforeEach */
/* eslint no-unused-expressions: "off" */
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import Creator from '../index';

chai.use(chaiEnzyme());

describe('(Component) Creator', () => {
    it('renders without errors', () => {
        const rendered = shallow(<Creator />);
        expect(rendered.text('.Creator')).to.have.string('Name'); // replace with real test
    });
});
