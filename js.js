class App {
  constructor(size) {
    this.board = this.initBoard(size);
  }

  initBoard(size) {
    this.board = new Board(size);
  }
}


class Square {
  constructor(id) {
    this.id = id;
  }

  
  get blocked() {
    let elem = $('#' + this.id);
    return $(elem).hasClass('blocked');
  }

  set blocked(bool) {
    let elem = $('#' + this.id);
    if (bool) {
      $(elem).addClass('blocked');
    } else {
      $(elem).removeClass('blocked');
    }
  }

  
  get cash() {
    let amount = 0;
    let cashDiv = $('#' + this.id + ' .cash');
    if (cashDiv) {
      amount = Number($(cashDiv).text());  
      return amount
    }
  }

  set cash(amount) {
    let elem = $('#' + this.id);
    $(elem).append('<div class="cash">' + amount + '</div>');
  }

  /* Here I wanted to append a div with class='player' to the square, 
  and since I didn't know what to return in the getter when the div is empty, I returned blank content.
  I know this is wrong, also because it doesn't work every time :( */
  get player() { 
    let content;
    let playerDiv = $('#' + this.id + ' .player')
    if (playerDiv) {
      content = $(playerDiv).text();
      return content
    }
  }

  set player(content) {
    let elem = $('#' + this.id);
    $(elem).append('<div class="player">' + content + '</div>');
  }


} // end of Square




class Board {
  constructor(size) {
    this.size = size;
    this.table = this.createTable();
    this.blockRandomSquare();
    this.addCash();
    this.placePlayer();
    this.movePlayer();
  }


  createTable() {
    var tableElem = $("<table>").appendTo(document.body);
    $(tableElem).attr('id', 'myTable')

    for (let r = 0; r < this.size; r++) {
      var row = $("<tr>").appendTo(tableElem);

      for (let c = 0; c < this.size; c++) {
        let tdId = `sq_${r}_${c}`;
        $("<td>")
          .attr("id", tdId)
          .appendTo(row);
      }
    }
    return tableElem
  }

  blockRandomSquare() {
    var blockedCount = 0;
    while (blockedCount < 5) {
      let r = Math.floor(Math.random() * this.size);
      let c = Math.floor(Math.random() * this.size);
      let tdId = `sq_${r}_${c}`;
      let square = new Square(tdId);
      if (!square.blocked) {
        square.blocked = true;
        blockedCount++
      }
    }
  }

  addCash() {
    var cash = [20, 30, 40, 50, 60];
    while (cash.length > 0) {
      let r = Math.floor(Math.random() * this.size);
      let c = Math.floor(Math.random() * this.size);
      let tdId = `sq_${r}_${c}`;
      let square = new Square(tdId);
      if (!square.cash && !square.blocked) {
        let amount = cash.pop();
        square.cash = amount;
      }
    }
  }

  placePlayer() {
    let r = Math.floor(Math.random() * this.size);
    let c = Math.floor(Math.random() * this.size);
    let tdId = `sq_${r}_${c}`;
    let square = new Square(tdId);
    let player = new Player('Angelica');
    if (!square.cash && !square.blocked) {
      square.player = ''; 
      player.money = 0;
    }
  }

  /* Here I started to think about moving the player and since I don't have a model I'm trying to retrieve
  positions from the table with rows and columns. It's just a start but I wanted to know if it's right to move the player
  by moving all the divs that are its children */
  movePlayer() {
    let tdId = $('.player').parent().attr('id');
    let rowIndex = Number(tdId[3]);
    let columnIndex = Number(tdId[5]);
    let currentPosition = $('#myTable tr:eq(' + rowIndex + ') td:eq(' + columnIndex + ')');
    let newRow = rowIndex + 1;
    let newCol = columnIndex + 1;
    let newPosition = $('#myTable tr:eq(' + newRow + ') td:eq(' + newCol + ')');
    $(currentPosition).append('I was here');
    $(currentPosition).children().appendTo(newPosition);
  }



} // end of Board 


class Player {
  constructor(name) {
    this.name = name;
  }

//I tried to follow the example with cash in the Square class  
  get money() {
    let amount = 0;
    let moneyDiv = $(this + ' .money');
    if (moneyDiv) {
      amount = Number($(moneyDiv).text());
      return amount
    }
  }

  set money(amount) {
    let elem = $('.player');
    $(elem).append('<div class="name">' + this.name + '</div>')
      .append('<div class="money">' + amount + '</div>');
  }



} // end of Player

let myApp = new App(5);
