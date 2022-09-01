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
    };
  },
  watch: {
    playerHealthValue(value) {
      if (value <= 0 && this.monsterHealthValue <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealthValue(value) {
      if (value <= 0 && this.playerHealthValue <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
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
    addMonsterAttack() {
      this.currentRound++;
      const attackValue = calcRandomValue(5, 12);
      this.monsterHealthValue -= attackValue;
      this.addPlayerAttack();
      console.log(this.monsterHealthValue);
    },
    addPlayerAttack() {
      this.currentRound++;
      const attackValue = calcRandomValue(8, 15);
      this.playerHealthValue -= attackValue;
    },
    addSpecialAttack() {
      this.currentRound++;
      const specialAttackValue = calcRandomValue(10, 25);
      this.monsterHealthValue -= specialAttackValue;
      this.addPlayerAttack;
    },
    addHeal() {
      this.currentRound++;
      const healValue = calcRandomValue(8, 20);
      this.playerHealthValue += healValue;
      if (this.playerHealthValue + healValue > 100) {
        this.playerHealthValue = 100;
      } else {
        this.addPlayerAttack();
      }
    },
  },
});

app.mount(".game");
