function calcRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealthValue: 100,
      playerHealthValue: 100,
    };
  },
  computed: {},

  methods: {
    addMonsterAttack() {
      const attackValue = calcRandomValue(5, 12);
      console.log(attackValue);
      this.monsterHealthValue -= attackValue;
      this.addPlayerAttack();
    },
    addPlayerAttack() {
      const attackValue = calcRandomValue(8, 15);
      this.playerHealthValue -= attackValue;
    },
  },
});

app.mount(".game");
