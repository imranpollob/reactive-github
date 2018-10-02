const PlayerAPI = {
  players: [
    { number: 1, name: "Imran Pollob", position: "X" },
    { number: 2, name: "Dave Defender", position: "D" },
    { number: 3, name: "Sam Sweeper", position: "D" },
    { number: 4, name: "Matt Midfielder", position: "M" },
    { number: 5, name: "William Winger", position: "M" },
    { number: 6, name: "Fillipe Forward", position: "F" }
  ],
  all: function() {
    return this.players;
  },
  get: function(id) {
    const isPlayer = p => p.number == id;
    return this.players.find(isPlayer);
  }
};

export default PlayerAPI;
