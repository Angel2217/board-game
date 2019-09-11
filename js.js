class App {
  constructor(size) {
    this.board = this.initBoard(size);
  }

  initBoard(size) {
    this.board = new Board(size);
    return this.board;
  }

} // end of App



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
    }
    return amount
  }


  set cash(amount) {
    let elem = $('#' + this.id);
    $(elem).append('<div class="cash">' + amount + '</div>');
  }


  get player() {
    let p = null;
    let td = $('#' + this.id + '.player');
    if (td) {
      p = new Player();
      return p
    }
  }

  set player(p) {
    let td = $('#' + this.id)[0]; // get <td> for this square
    if (p === null) {
      $(td).remove('.player'); // remove the player from the square
    } else {
      $(td).append(p.elem); // add the player to the square
    }
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
    let playerCount = 0;
    while (playerCount < 1) {
      let r = Math.floor(Math.random() * this.size);
      let c = Math.floor(Math.random() * this.size);
      let tdId = `sq_${r}_${c}`;
      let square = new Square(tdId);
      if (!square.cash && !square.blocked) {
        let p = new Player('Angelica');
        square.player = p;
        playerCount++;
      }
    }
  }


  movePlayer() {
    let tdId = $('.player').parent().attr('id');
    let row = Number(tdId[3]);
    let col = Number(tdId[5]);
    let sq1 = $('#' + tdId);
    let p = sq1.player;
    let row2 = row + 1;
    let col2 = col + 1;
    let tdId2 = `sq_${row2}_${col2}`
    let sq2 = $('#' + tdId2);
    if (sq2.length > 0 && sq2.attr('class') !== 'blocked') {
      sq1.append('I was here');
      $(sq1).children().appendTo(sq2);
    }
  }


  /* movePlayer(row, col)
  sq1 = get the square with the player
  p = sq1.player
  sq1.player = null
  sq2 = get square at row/col
  sq2.player = p
*/

} // end of Board 


class Player {
  constructor(name) {
    this.name = name;
    this.money = 0;


    let myDiv = $('#' + name); // see if <div> elem already exists
    if (myDiv.length === 0) {
      this.elem = this._createElem(); // it doesn’t exist; create it
    } else {
      this.elem = myDiv[0]; // yay, we found it
    }
  }

  _createElem() {
    let elem = $('<div>')
      .attr('id', 'name')
      .addClass('player')
      .append('<div class="name">' + this.name + '</div>')
      .append('<div class="money">' + this.money + '</div>');
    return elem
  }

/* get money() {
    let amount = 0;
    let moneyDiv = $('.money', this.elem)[0];  // return the 1st elem in player that has class “money"
    if (moneyDiv) {
      amount = Number( $(moneyDiv).text() );
    }
      return amount
  }
  
set money(amount) {
   let elem = $('.money', this.elem)[0];
    $(elem).append(amount);
  } */
  
  
  
} // end of Player

let myApp = new App(5);
