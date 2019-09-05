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
    let cashDiv = $('#'+ this.id + '.cash');
    if (cashDiv) {
        amount = Number( $(cashDiv).text() );  
    }
    return amount;
  }

    
  set cash(amount) {
    let elem = $('#' + this.id);
    $(elem).append('<div class="cash">' + amount + '</div>');
  }

  get player() {
    let elem = $('#' + this.id);
    return elem.player
  }

  set player(bool) {
    let elem = $('#' + this.id);
    if (bool) {
      $(elem).append('<div class="player"> </div>');
    }
  }

} // end of Square



class Board {
  constructor(size) {
    this.size = size;
    this.table = this.createTable();
    this.block = this.blockRandomSquare();
    this.cash = this.addCash();
    this.player = this.placePlayer();
  }


  createTable() {
    var tableElem = $("<table>").appendTo(document.body);

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
    let player = new Player();
    if (!square.cash && !square.blocked) {
      square.player = true;
      player.name = 'Angelica';
      player.money = 0;
    }
  }


} // end of Board 



class Player {
  constructor(name) {
    this.name = name;
  }

  get name() {
    return this.name
  }

  set name(name) {
    $(".player").append('<div class="name">' + name + '</div>');
  }


  get money() {
    return this.money
  }

  set money(money) {
    $(".player").append('<div class="money">' + money + '</div>');
  }

} // end of Player

let myApp = new App(5);
