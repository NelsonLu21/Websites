class Square
{
    constructor(x, y, wid, height, canvas_el)
    {
        this.x = x;
        this.y = y;
        this.width = wid;
        this.height = height;
        this.canvas_el = canvas_el;
        this.player = null;
    }

    draw()
    {
        this.canvas_el.strokeStyle = 'black';
        this.canvas_el.strokeRect(this.x, this.y, this.width, this.height);

        if (this.player)
        {
            this.canvas_el.fillStyle = 'black';
            this.canvas_el.font = '40px Arial';
            this.canvas_el.textAlign = 'center';
            this.canvas_el.fillText(this.player, this.x + this.width / 2, this.y + this.height / 2 + 10);
        }
    }
}

class TicTacToe
{
    constructor(id) 
    {
        this.canvas = document.getElementById(id);
        this.canvas_el = this.canvas.getContext("2d")

        this.squares = [];

        const w = this.canvas.width/3;
        const h = this.canvas.height/3;

        for (let x = 0; x < 3; x++)
        {
            for (let y = 0; y < 3; y++)
            {
                this.squares.push(new Square(x*w, y*h, w, h, this.canvas_el));
            }
        }

        this.players = ["X", "O"];
        this.turn = 0;
        this.gameOver = false;
        this.squares.forEach(squares => squares.draw());
        this.canvas.addEventListener('click', function(event){this.click(event);}.bind(this))
    }

    click(event)
    {
        if (this.gameOver)
        {
            alert("Game over!");
            this.reset();
            return;
        }

        const x = event.offsetX;
        const y = event.offsetY;
        for (let Square of this.squares)
        {
            if(Square.player != null) continue;
            if(x>=Square.x && x <= Square.x+Square.width && y>=Square.y && y <= Square.y+Square.height)
            {
                Square.player = this.players[this.turn];
                console.log(Square.player);
                Square.draw();
                if (this.turn == 1) this.turn = 0;
                else this.turn = 1;
                this.checkForWinner()
            }
        }
    }

    checkForWinner()
    {
        const allCombos = [
            [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,4,8], [0,4,8], [2,4,6]
        ]
        
        for (let i = 0; i < allCombos.length; i++)
        {
            let combo = allCombos[i];
            let sq1 = this.squares[combo[0]];
            let sq2 = this.squares[combo[1]];
            let sq3 = this.squares[combo[2]];

            if (sq1.player != null && sq1.player == sq2.player && sq1.player == sq3.player)
            {
                this.gameOver = true;
                this.canvas_el.beginPath();
                this.canvas_el.moveTo(sq1.x + sq1.width/2, sq1.y+sq1.height/2);
                this.canvas_el.lineTo(sq3.x+sq3.width/2, sq3.y+sq3.height/2);
                this.canvas_el.stroke();

                alert(sq1.player  + " has won the game!");
                return;
            }
            else if (!this.gameOver && this.squares.filter(square => square.player == null).length == 0) {
                this.gameOver = true;
                alert("Draw!");
                return;
              }
        }
    }

    reset()
    {
        this.canvas_el.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.squares.forEach(Square => Square.player = null);
        this.squares.forEach(Square => Square.draw());
        this.turn = 0;
        this.gameOver = false;
    }
}


new TicTacToe('canvas');