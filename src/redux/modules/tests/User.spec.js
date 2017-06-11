/* global describe, it, beforeEach */
/* eslint no-unused-expressions: "off" */
/* eslint no-undef: "off" */
import { expect } from 'chai';
import { createStore } from 'redux';
import reducer, { defaultState, constants } from '../../../redux/modules/User';

describe('(Redux) User', () => {
    describe('(Reducer)', () => {
        it('sets up initial state', () => {
            expect(reducer(undefined, {})).to.eql(defaultState);
        });

        it('should create a store', () => {
            const userStore = createStore(reducer, defaultState);
            const state = userStore.getState();
            expect(state.isLoading).to.be.false;
            expect(state.coded).to.be.null;
            expect(state.decoded).to.be.null;
            expect(state.permissions).to.be.null;
            expect(state.stale).to.be.false;
        });
    });
    describe('dispatch', () => {
        const initialState = {
            isLoading: false,
            coded: null,
            decoded: null,
            permissions: ['to be nulled'],
            stale: false
        };

        const signedInState = {
            isLoading: false,
            coded: 'coded',
            decoded: { user: 'hi' },
            permissions: ['permitted'],
            stale: false
        };

        const loadingState = {
            isLoading: true
        };

        it('should set stale flag on LOCATION_CHANGE', () => {
            const userStore = createStore(reducer, initialState);
            userStore.dispatch({ type: constants.LOCATION_CHANGE });
            userStore.dispatch({ type: constants.LOCATION_CHANGE });
            const state = userStore.getState();
            expect(state.permissions).to.not.be.null;
            expect(state.stale).to.be.true;
        });

        it('should set isLoading to true on USER_LOGGING_IN', () => {
            const userStore = createStore(reducer, { ...initialState, stale: true });
            userStore.dispatch({ type: constants.USER_LOGGING_IN });
            const state = userStore.getState();
            expect(state.isLoading).to.be.true;
            expect(state.stale).to.be.false;
        });

        it('should process the payload on USER_LOGGED_IN', () => {
            const userStore = createStore(reducer, { ...initialState, stale: true });
            const testPayload = {
                coded: 'coded',
                decoded: {
                    user: 'hello'
                },
                permissions: ['permitted']
            };
            userStore.dispatch({ type: constants.USER_LOGGED_IN, payload: testPayload });
            const state = userStore.getState();
            expect(state.isLoading).to.be.false;
            expect(state.coded).to.equal('coded');
            expect(state.decoded.user).to.equal('hello');
            expect(state.permissions[0]).to.equal('permitted');
            expect(state.stale).to.be.false;
        });

        it('should clear user data on USER_LOGGED_OUT', () => {
            const userStore = createStore(reducer, signedInState);
            userStore.dispatch({ type: constants.USER_LOGGED_OUT });
            const state = userStore.getState();
            expect(state.isLoading).to.be.false;
            expect(state.coded).to.be.null;
            expect(state.decoded).to.be.null;
            expect(state.permissions).to.be.null;
        });

        it('should set isLoading to false on END_GLOBAL_LOAD', () => {
            const userStore = createStore(reducer, loadingState);
            userStore.dispatch({ type: constants.END_GLOBAL_LOAD });
            const state = userStore.getState();
            expect(state.isLoading).to.be.false;
        });
    });
});
