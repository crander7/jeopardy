/* global describe, it, beforeEach, afterEach */
/* eslint no-unused-expressions: "off" */
import { expect } from 'chai';

import fetchHeaders from './fetchHeaders';

describe('(function) fetchHeadrs', () => {
    it('only sets content-type for missing or invalid user param', () => {
        const expectedObj = { 'Content-Type': 'application/json' };

        expect(fetchHeaders()).to.eql(expectedObj);
        expect(fetchHeaders({ 'I am': 'not a real user object' })).to.eql(expectedObj);
    });

    it('sets bearer token to user.coded', () => {
        const expectedObj = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer: myToken'
        };

        expect(fetchHeaders({ coded: 'myToken' })).to.eql(expectedObj);
    });
});
