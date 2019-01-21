new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        healCount: 3,
        playerWonCount: 0,
        monsterWonCount: 0,
        logs: []
    },
    methods: {

        setDefaults() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = false;
            this.healCount = 3;
            this.logs = [];
        },

        startGame() {
            this.setDefaults();
            this.gameIsRunning = true;
        },

        attack(isSpecialAttack) {
            let minDamage = isSpecialAttack ? 10 : 1;
            let maxDamage = isSpecialAttack ? 25 : 10;
            let playerDamage = this.random(minDamage, maxDamage)
            let monsterDamage = this.random(minDamage, maxDamage);
            this.writeLog(true, "Player damage is " + playerDamage + "%.");
            this.writeLog(false, "Monster damage is " + monsterDamage + "%.");
            this.monsterHealth -= playerDamage;
            if (this.checkWin()) {
                return;
            }
            this.playerHealth -= monsterDamage;
            this.checkWin();

        },

        heal() {
            if (this.healCount != 0 && this.playerHealth != 100) {
                let healNumber = this.random(1, 5);
                this.playerHealth += healNumber;
                this.healCount--;
            }
            else if (this.playerHealth == 100) {
                alert("Your health is maxed!");
            }
            else {
                alert("Sorry, you have no active heals. (max number of heals - 3)");
            }
        },

        giveUp() {
            this.monsterWonCount++;
            confirm("Slacker, you ate! Start new game") ? this.startGame() : this.setDefaults();
        },

        random(min, max) {
            return Math.floor(Math.random() * max) + min;
        },

        checkWin() {
            if (this.monsterHealth <= 0) {
                this.playerWonCount++;
                confirm("U won! New game?") ? this.startGame() : this.setDefaults();
                return true;
            }
            else if (this.playerHealth <= 0) {
                this.monsterWonCount++;
                confirm("U lost! New game?") ? this.startGame() : this.setDefaults();
                return true;
            }
            return false;
        },

        writeLog(isPlayer, message) {
            this.logs.unshift({
                isPlayer: isPlayer,
                message: message
            });
        }
    },
})