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
    let elem = $('#' + this.id);
    return $(elem).hasClass('cash');
  }


  set cash(bool) {
    let elem = $('#' + this.id);
    if (bool) {
      $(elem).addClass('cash');
    } else {
      $(elem).removeClass('cash');
    }
  }

} // end of Square




class Board {
  constructor(size) {
    this.size = size;
    this.table = this.createTable();
    this.block = this.blockRandomSquare();
    this.cash = this.addCash();
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
    var cashCount = 0;
    while (cashCount < 5) {
      let r = Math.floor(Math.random() * this.size);
      let c = Math.floor(Math.random() * this.size);
      let tdId = `sq_${r}_${c}`;
      let square = new Square(tdId);
      if (!square.cash && !square.blocked) {
        square.cash = true;
        cashCount++
      }
    }
  }

} // end of Board 


let myApp = new App(5);
