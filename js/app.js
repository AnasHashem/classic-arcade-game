// Enemies our player must avoid
class Enemy {
    constructor(posX, posY, speed){
        this.x = posX;
        this.y = posY;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    update (dt) {
        this.x += (this.speed * dt);
        this.x = (this.x >= 505) ? 0 : this.x;
        this.hasColided();
    }
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Deals with collisions
    hasColided () {
        if (player.y + 131 >= this.y + 90 &&
            player.y + 73 <= this.y + 135 &&
            player.x + 25 <= this.x + 88 &&
            player.x + 76 >= this.x + 11)
                gameInit();
    }
}

class Player {
    constructor (posX = 202, posY = 383, speed){
        this.x = posX;
        this.y = posY;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
    }
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput (key) {
        switch (key) {
            case 'left':
                this.x -= (this.speed + 505) % 505;
                if (this.x < 2.5) this.x = 2.5; //To not get lost
                break;
            case 'right': 
                this.x += (this.speed + 505) % 505;
                if (this.x > 458) this.x = 458; //To not get lost
                break;
            case 'up':
                this.y -= (this.speed + 606) % 606;
                if (this.y <= 35) gameWon();  //To not walk over water :D
                break;
            case 'down':
                this.y += (this.speed + 606) % 606;
                if (this.y > 400) this.y = 400; //To not escape the land :)
        }
    }
    reset () {
        this.x = 202;
        this.y = 383;
    }
    update () {} //Still needs to be here for the engine.
}

var allEnemies = [];
var player = new Player(0, 0, 45);
gameInit();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Initialize the game ..
function gameInit() {
    player.reset();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0, Math.random() * 150 + 50, Math.random() * 100 + 40),
        new Enemy(0, Math.random() * 150 + 70, Math.random() * 100 + 60),
        new Enemy(0, Math.random() * 150 + 60, Math.random() * 100 + 50)
    );
}

// Won (reached water)
function gameWon() {
    player.reset();
    alert(`Congratulations! You have won.\nFeel free to play again :)`);
}
