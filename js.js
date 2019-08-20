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
    
    for (let r=0; r<this.size; r++) {
      var row = $("<tr>").appendTo(tableElem);
     
      for (let c=0; c<this.size; c++) {
        let tdId = [r, c];
        var cell = $("<td>")
        .appendTo(row)
        .attr("id", tdId);
      }
    } 
  }   
  
    
  createModel() {
    var model = [];
    for (let r=0; r<this.size; r++) {
      model.push([]);
      
      for (let c=0; c<this.size; c++) {
       let sqId = [r, c];
        model[r].push(new Square(sqId));
      } 
  } 
  }  
  }
  
  
  let myBoard = new Board(5);
  