/* global describe, it, beforeEach */
/* eslint no-unused-expressions: "off" */
/* eslint no-undef: "off" */
import { expect } from 'chai';
import reducer, { defaultState } from '../<%= pascalEntityName %>';

describe('(Redux) <%= pascalEntityName %>', () => {
    describe('(Reducer)', () => {
        it('sets up initial state', () => {
            expect(reducer(undefined, {})).to.eql(defaultState);
        });

        it('TODO: ADD UNIT TESTS FOR THIS MODULE', () => {
            expect(defaultState).to.eql('ADD UNIT TESTS FOR THIS MODULE');
        });
    });
});
