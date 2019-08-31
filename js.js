class App {
    constructor(size) {
        this.board = this.initBoard(size);
    }

    initBoard(size) {
        this.board = new Board(size);
    }
}

class Board {
    constructor(size) {
        this.size = size;
        this.table = this.createTable();
        this.array = this.createArray();
        this.randomCell = this.selectRandomCells(); // is it necessary to declare all the methods in the constructor first?   
        this.block = this.blockCells();
    }
    createTable() {
        var tableElem = $("<table>").appendTo(document.body);
        $("<table>").attr("id", "myTable");

        for (let r = 0; r < this.size; r++) {
            var row = $("<tr>").appendTo(tableElem);

            for (let c = 0; c < this.size; c++) {
                let tdId = `sq_${r}_${c}`;
                $("<td>")
                    .attr("id", tdId)
                    .appendTo(row)
                    .addClass("cell")
            }
        }
        return tableElem
    }


    createArray() {
        var array = [];
        $(".cell").each(function () {
            array.push($(this));
        });
        return array
    }


    selectRandomCells() {
        var index = Math.floor(Math.random() * this.array.length);
        var randomCell = this.array[index];
        this.array.splice(index, 1);
        return randomCell;
    }


    blockCells() {
        for (let i = 0; i < 5; i++) {
            let myRandomCell = this.selectRandomCells();
            myRandomCell.append("hello"); // this is only to check that it's working (affecting the DOM). In theory I should write something like
            // myRandomCell.blocked = true ?         
        }
    }
}

let myApp = new App(5);
