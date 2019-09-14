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
    let td = $('#' + this.id + ' .player');
    if (td) {
      p = new Player('Angelica');
    }
    return p
  }

  set player(p) {
    let td = $('#' + this.id)[0]; 
    if (p === null) {
      $('.player', td).remove();
      $(td).text('was here');
    } else {
      $(td).append(p.elem); 
    }
  }


  static getPlayerSquare() {
    let tdId = $('.player').parent().attr('id');
    return new Square(tdId);
  }

  static getById(id) {
    return new Square(id);
  }

} // end of Square




class Board {
  constructor(size) {
    this.size = size;
    this.table = this.createTable();
    this.blockRandomSquare();
    this.addCash();
    this.placePlayer();
    this.checkValidSquare();
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


  checkValidSquare() {
    let tdId = $('.player').parent().attr('id');
    let row = Number(tdId[3]);
    let col = Number(tdId[5]);
    let row2 = row + 1;
    let col2 = col + 1;
    if (row2 > 0 && row2 < 5 && col2 > 0 && col2 < 5) {
      this.movePlayer(row2, col2);
    }
  }


  movePlayer(row, col) {
    let sq1 = Square.getPlayerSquare();
    let p = sq1.player;
    sq1.player = null;
    let tdId2 = `sq_${row}_${col}`;
    let sq2 = Square.getById(tdId2);
    sq2.player = p;
  }




} // end of Board 


class Player {
  constructor(name) {
    this.name = name;


    let myDiv = $('#' + name); 
    if (myDiv.length === 0) {
      this.elem = this._createElem(); 
    } else {
      this.elem = myDiv[0]; 
    }

  }

  _createElem() {
    let elem = $('<div>')
      .attr('id', this.name)
      .addClass('player')
      .append('<div class="name">' + this.name + '</div>')
      .append('<div class="money"> 0 </div>');
    return elem
  }




} // end of Player

let myApp = new App(5);
