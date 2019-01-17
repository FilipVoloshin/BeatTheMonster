new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        healCount: 3,
        playerWonCount: 0,
        monsterWonCount: 0
    },
    methods: {

        setDefaults() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = false;
            this.healCount = 3
        },

        startGame() {
            this.setDefaults();
            this.gameIsRunning = true;
        },

        attack(isSpecialAttack) {
            let minDamage = !isSpecialAttack ? 1 : 10;
            let maxDamage = !isSpecialAttack ? 10 : 25;
            let playerDamage = this.random(minDamage, maxDamage);
            let monsterDamage = this.random(minDamage, maxDamage);
            this.playerHealth -= monsterDamage;
            this.monsterHealth -= playerDamage;
            this.checkResult();
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

        },

        random(min, max) {
            return Math.floor(Math.random() * max) + min;
        },

        checkResult() {
            let checkForNewGame = false;
            if (this.playerHealth <= 0 && this.monsterHealth > 0) {
                alert("You lost! Monster won!");
                this.monsterWonCount++;
                checkForNewGame = true;
            }
            else if (this.monsterHealth <= 0 && this.playerHealth > 0) {
                alert("You won! Monster is defeated!");
                this.playerWonCount++;
                checkForNewGame = true;
            }
            else if (this.monsterHealth == 0 && this.playerHealth == 0) {
                alert("There are no defeated in this battle!");
                checkForNewGame = true;
            }

            if (checkForNewGame) {
                var startNew = confirm("Do you want to start new battle?");
                if (startNew) this.startGame();
                else this.setDefaults();
            }
        }
    },
})