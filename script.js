function calcRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealthValue: 100,
      playerHealthValue: 100,
      currentRound: 0,
      winner: "",
      logMessages: [],
    };
  },
  watch: {
    playerHealthValue(value) {
      if (value <= 0 && this.monsterHealthValue <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
        this.playerHealthValue = 0;
      }
    },
    monsterHealthValue(value) {
      if (value <= 0 && this.playerHealthValue <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
        this.monsterHealthValue = 0;
      }
    },
  },

  computed: {
    playerBarStyles() {
      return { width: this.playerHealthValue + "%" };
    },
    monsterBarStyles() {
      return { width: this.monsterHealthValue + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },

  methods: {
    startGame() {
      this.monsterHealthValue = 100;
      this.playerHealthValue = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    addMonsterAttack() {
      this.currentRound++;
      const attackValue = calcRandomValue(5, 12);
      this.monsterHealthValue -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.addPlayerAttack();
    },
    addPlayerAttack() {
      this.currentRound++;
      const attackValue = calcRandomValue(8, 15);
      this.playerHealthValue -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    addSpecialAttack() {
      this.currentRound++;
      const specialAttackValue = calcRandomValue(10, 25);
      this.monsterHealthValue -= specialAttackValue;
      this.addLogMessage("player", "special attack", specialAttackValue);
      this.addPlayerAttack;
    },
    addHeal() {
      this.currentRound++;
      const healValue = calcRandomValue(8, 20);
      if (this.playerHealthValue + healValue > 100) {
        this.playerHealthValue = 100;
      } else {
        this.playerHealthValue += healValue;
        this.addLogMessage("player", "heal", healValue);
      }
    },
    addSurrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount(".game");
