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
                let tdId = `sq_${r}_${c}`;
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
                let sqId = `sq_${r}_${c}`;
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

//New part from here//
class Player {
    constructor(name, location, gain) {
        this.name = name;
        this.location = location;
        this.gain = gain;
        this.locate = this.locatePlayer();
    }

    locatePlayer() {
        this.location.append(this.name + "\n").append(this.gain + "$");
    }
}

selectRandomCells(1, "player");
var currentPosition = $(".player");

var myPlayer = new Player("Angelica", currentPosition, 0);

$(document).keydown(function (e) {
    if (e.keyCode === 39) {
        if (currentPosition.next().attr("class") !== "cell blocked" && (currentPosition.next().attr("class") !== "cell money")) {
            currentPosition.empty();
            currentPosition = currentPosition.next();
            currentPosition.append(myPlayer.name + "\n").append(myPlayer.gain + "$");
        } else if (currentPosition.next().attr("class") == "cell money") {
            currentPosition.empty();
            currentPosition = currentPosition.next();
            myPlayer.gain = parseInt(myPlayer.gain) + parseInt(currentPosition.html());
            currentPosition.empty();
            currentPosition.append(myPlayer.name + "\n").append(myPlayer.gain + "$");
            currentPosition.removeClass("money");
        } else {
            alert("bad move!");
        }
    }
});

$(document).keydown(function (e) {
    if (e.keyCode === 37) {
        if (currentPosition.prev().attr("class") !== "cell blocked" && (currentPosition.prev().attr("class") !== "cell money")) {
            currentPosition.empty();
            currentPosition = currentPosition.prev();
            currentPosition.append(myPlayer.name + "\n").append(myPlayer.gain + "$");
        } else if (currentPosition.prev().attr("class") == "cell money") {
            currentPosition.empty();
            currentPosition = currentPosition.prev();
            myPlayer.gain = parseInt(myPlayer.gain) + parseInt(currentPosition.html());
            currentPosition.empty();
            currentPosition.append(myPlayer.name + "\n").append(myPlayer.gain + "$");
            currentPosition.removeClass("money");
        } else {
            alert("bad move!");
        }
    }
});
