import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Players from './components/CreatorAddPlayers';
/**
 * Creator
 * @description Description of what this component does goes here.
 */
class Creator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {},
            playerCountArr: [],
            players: []
        };
        this.handleGameInfo = this.handleGameInfo.bind(this);
        this.handleAddPlayer = this.handleAddPlayer.bind(this);
        this.handlePlayerInput = this.handlePlayerInput.bind(this);
        this.handleRemovePlayer = this.handleRemovePlayer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleRemovePlayer(toRemove) {
        const { playerCountArr } = this.state;
        if (playerCountArr.length === 1) playerCountArr.length = 0;
        else {
            playerCountArr.map((player, idx) => {
                if (idx === toRemove - 1) playerCountArr.splice(idx, 1);
                return true;
            });
        }
        this.setState({ playerCountArr });
    }
    handlePlayerInput(name) {
        const arr = this.state.players;
        arr.push(name.target.value);
        this.setState({ players: arr });
    }
    handleAddPlayer() {
        const arr = this.state.playerCountArr;
        if (arr[0]) {
            const newNum = (this.state.playerCountArr[this.state.playerCountArr.length - 1] + 1);
            arr.push(newNum);
        } else {
            arr.push(1);
        }
        this.setState({ playerCountArr: arr });
    }
    handleGameInfo(e, prop) {
        const { game } = this.state;
        if (prop === 'title') game.name = e.target.value;
        else game.creator = e.target.value;
        this.setState({ game });
    }
    handleSubmit() {
        const { game, players } = this.state;
        game.players = players;
        this.setState({ game });
        console.log(this.state.game);
    }
    render() {
        return (
            <div
                className="container"
            >
                <div>
                    <TextField
                        hintText="Enter Game Name"
                        floatingLabelText="Game Name"
                        onBlur={e => this.handleGameInfo(e, 'title')}
                    />
                </div>
                <div>
                    <TextField
                        hintText="Enter Creator Name"
                        floatingLabelText="Creator Name"
                        onBlur={e => this.handleGameInfo(e, 'creator')}
                    />
                </div>
                <Players playerCount={this.state.playerCountArr} newPlayer={this.handleAddPlayer} removePlayer={this.handleRemovePlayer} addPlayer={this.handlePlayerInput} />
                <FlatButton
                    label="Submit"
                    onClick={this.handleSubmit}
                    primary={true}
                />
            </div>
        );
    }
}

export default Creator;
