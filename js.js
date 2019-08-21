class Square {
  constructor(id) {
      this.id = id;
  }
}

class Board {
  constructor(size) {
      this.size = size;
      this.table = this.createTable();
      this.model = this.createModel();
  }


  createTable() {
      var tableElem = $("<table>").appendTo(document.body);

      for (let r = 0; r < this.size; r++) {
          var row = $("<tr>").appendTo(tableElem);

          for (let c = 0; c < this.size; c++) {
              let tdId = "sq_${r}_${c}";
              $("<td>")
                  .attr("id", tdId)
                  .appendTo(row)
                  .addClass("cell");
          }
      }

      return tableElem
  }

    
  createModel() {
      var model = [];
      for (let r = 0; r < this.size; r++) {
          model.push([]);

          for (let c = 0; c < this.size; c++) {
              let sqId = "sq_${r}_${c}";
              model[r].push(new Square(sqId));
          }
      }
      return model
  }
}


let myBoard = new Board(5);

var arrayOfCells = [];
$(".cell").each(function () {
  arrayOfCells.push($(this));
});

function selectRandomCells(number, status) {
  for (let c = 0; c < number; c++) {
      var index = Math.floor(Math.random() * arrayOfCells.length);
      var randomCell = arrayOfCells[index];
      arrayOfCells.splice(index, 1);
      randomCell.addClass(status);
  }
}

selectRandomCells(5, "blocked");

selectRandomCells(5, "money");

function addMoney() {
  var cash = ["20$", "40$", "100$", "50$", "90$"];
  var moneyCells = [];
  $(".money").each(function () {
      moneyCells.push($(this));
  });
  for (let c = 0; c < cash.length; c++) {
      moneyCells[c].append(cash[c]);
  }
}

addMoney();
