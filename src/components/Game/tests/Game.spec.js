/* global describe, it, beforeEach */
/* eslint no-unused-expressions: "off" */
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import Game from '../index';

chai.use(chaiEnzyme());

describe('(Component) Game', () => {
    it('renders without errors', () => {
        const rendered = shallow(<Game />);
        expect(rendered.text('.Game')).to.have.string('Jeopardy'); // replace with real test
    });
});
