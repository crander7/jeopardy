import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * Game
 * @description Description of what this component does goes here.
 */
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.onDrop = this.onDrop.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        axios.get('/api/games').then((data) => {
            if (data.data) {
                this.setState({ games: data.data });
            }
        });
    }
    render() {
        const games = this.state.games;
        return (
            <div className="game">Jeopardy
                <div>
                    {games.length > 0 && games.map(game => (
                        <div
                            key={game.id}
                        >
                            <div>
                                {game.name}
                            </div>
                            <div>
                                {game.creator}
                            </div>
                            <div>
                                {game.day_double}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

/**
 * propTypes
 * @type {object}
 * @property {type} description
 */
Game.propTypes = {
    someprop: PropTypes.string
};
export default Game;
