import React, { Component } from 'react';
import { TextField, FlatButton } from 'material-ui/';
import Delete from 'material-ui/svg-icons/content/clear';
import propTypes from 'prop-types';

class CreatorAddPlayers extends Component {
    render() {
        const { addPlayer, newPlayer, removePlayer, playerCount } = this.props;
        return (
            <div>
                <div>Players</div>
                <div>
                    <TextField
                        hintText="Enter Player Name"
                        floatingLabelText="Player Name"
                        onBlur={addPlayer}
                    />
                </div>
                <div>
                    <TextField
                        hintText="Enter Player Name"
                        floatingLabelText="Player Name"
                        onBlur={addPlayer}
                    />
                </div>
                {playerCount.map(player =>
                    <div
                        key={player}
                    >
                        <TextField
                            hintText="Enter Player Name"
                            floatingLabelText="Player Name"
                            onBlur={addPlayer}
                        />
                        <span>
                            <Delete
                                onClick={() => removePlayer(player)}
                            />
                        </span>
                    </div>
                )}
                <FlatButton
                    label="Add Player"
                    primary={true}
                    onTouchTap={newPlayer}
                />
            </div>
        );
    }
}

CreatorAddPlayers.propTypes = {
    addPlayer: propTypes.func.isRequired,
    removePlayer: propTypes.func.isRequired,
    newPlayer: propTypes.func.isRequired,
    playerCount: propTypes.array
};

export default CreatorAddPlayers;
