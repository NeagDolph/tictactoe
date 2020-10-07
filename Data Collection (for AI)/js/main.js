var grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

var player = 0;

var play = 0;

var datacol = []

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

// runalgo();

$("li").click(function() {

    console.log("grid", [].concat(...grid))
    checkwin(grid)


    if ($(this).hasClass("x") || $(this).hasClass("o")) return;

    let index = $(this).index()

    // if (player === 0) {

    // let emptygrid = [].concat(...grid).map((x, idx) => {if (x === 0) {return idx}}).filter(e => e != null)

    // console.log("empty indexes", emptygrid)

    // let rplay = emptygrid[Math.floor(Math.random() * emptygrid.length)]

    // console.log("rplay", rplay)

    $($("li")[index]).addClass("x")
    player = 1;
    play += 1;
    grid[Math.floor(index / 3)][index % 3] = "x"
    // grid[Math.floor(rplay / 3)][rplay % 3] = "x"

    if ([].concat(...grid).indexOf(0) == -1) {
        alertin("Draw!")
        win2()
        return
    }

    runalgo();

    // wait(1000);
});


function checkwin(g) {
    if (checkitems(g[0][0], g[1][1], g[2][2])) { 
        win(g[0][0])
        return;
    }
    if (checkitems(g[2][0], g[1][1], g[0][2])) { 
        win(g[2][0])
        return;
    }
    if (checkitems(g[0][0], g[0][1], g[0][2])) { 
        win(g[0][0])
        return;
    }
    if (checkitems(g[1][0], g[1][1], g[1][2])) { 
        win(g[1][0])
        return;
    }
    if (checkitems(g[2][0], g[2][1], g[2][2])) { 
        win(g[2][0])
        return;
    }
    if (checkitems(g[0][0], g[1][0], g[2][0])) { 
        win(g[0][0])
        return;
    }
    if (checkitems(g[0][1], g[1][1], g[2][1])) { 
        win(g[0][1])
        return;
    }
    if (checkitems(g[0][2], g[1][2], g[2][2])) { 
        win(g[0][2])
        return;
    }
}

function checkitems(a, b, c) {
    if (a == b && b == c) return a
}

function win(p) {
    alertin(`Player ${p} Wins!`)

    win2()
}

function win2() {
    $("li").each(function () {
        $(this).removeClass("x")
        $(this).removeClass("o")
    })

    play = 0

    grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    player = 0;

    runalgo()
}

async function alertin(beep) {
    alert(beep)
}

function runalgo() {
    let sel = [];

    rgrid = [[grid[0][0], grid[1][0], grid[2][0]], [grid[0][1], grid[1][1], grid[2][1]], [grid[0][2], grid[1][2], grid[2][2]]];
    fgrid = [].concat(...grid)
    diaglr = [grid[0][0], grid[1][1], grid[2][2]]
    diagrl = [grid[0][2], grid[1][1], grid[2][0]]
    console.log(rgrid, "rgrid")


    if (sel.length == 0) {
        //Win checks
        for (let i in grid) {
            if (counta(grid[i], "o") == 2 && grid[i].includes(0)) {
                console.log("Win block a")
                sel = [i, grid[i].indexOf(0)]
                break
            }

            if (counta(rgrid[i], "o") == 2 && rgrid[i].includes(0)) {
                console.log("Win block b")
                sel = [rgrid[i].indexOf(0), i]
                break
            }
        }
    }

    if (sel.length == 0) {
        //Diagonal win checks
        if (counta(diaglr, "o") == 2 && diaglr.includes(0)) {
            console.log("Diag Win block a")
            if (diaglr.indexOf(0) == 0) sel = [0, 0]
            if (diaglr.indexOf(0) == 1) sel = [1, 1]
            if (diaglr.indexOf(0) == 2) sel = [2, 2]
        }
        else if (counta(diagrl, "o") == 2 && diagrl.includes(0)) {
            console.log("Diag Win block b")
            if (diagrl.indexOf(0) == 0) sel = [0, 2]
            if (diagrl.indexOf(0) == 1) sel = [1, 1]
            if (diagrl.indexOf(0) == 2) sel = [2, 0]
        }
    }

    if (sel.length == 0) {
        for (let i in grid) {
            console.log("ran", grid[i])
            //Player lose checks
            if (counta(grid[i], "x") == 2 && grid[i].includes(0)) {
                console.log("Lose block a")
                sel = [i, grid[i].indexOf(0)]
                break
            }
            
            if (counta(rgrid[i], "x") == 2 && rgrid[i].includes(0)) {
                sel = [rgrid[i].indexOf(0), i]
                break
            }
        } 
    }

    if (sel.length == 0) {
        //Diagonal lose checks
        if (counta(diaglr, "x") == 2 && diaglr.includes(0)) {
            console.log("Diag lose block a")
            if (diaglr.indexOf(0) == 0) sel = [0, 0]
            if (diaglr.indexOf(0) == 1) sel = [1, 1]
            if (diaglr.indexOf(0) == 2) sel = [2, 2]
        }
        else if (counta(diagrl, "x") == 2 && diagrl.includes(0)) {
            console.log("Diag lose block b")
            if (diagrl.indexOf(0) == 0) sel = [0, 2]
            if (diagrl.indexOf(0) == 1) sel = [1, 1]
            if (diagrl.indexOf(0) == 2) sel = [2, 0]
        }
    }

    if (sel.length == 0) {
        if (JSON.stringify(diagrl) == JSON.stringify(["x", "o", "x"]) && (counta([].concat(...grid), "x") == 2 && counta([].concat(...grid), "o") == 1)) {
            //if in a diagonal xox pattern it will play on the sides
            console.log("fork block a")
            if (grid[0][1] == 0) sel = [0, 1]
            if (grid[1][0] == 0) sel = [1, 0]
            if (grid[1][2] == 0) sel = [1, 2]
            if (grid[2][1] == 0) sel = [2, 1]
        }
        else if (JSON.stringify(diaglr) == JSON.stringify(["x", "o", "x"]) && (counta([].concat(...grid), "x") == 2 && counta([].concat(...grid), "o") == 1)) {
            //if in a diagonal xox pattern it will play on the sides
            console.log("fork block b")
            if (grid[0][1] == 0) sel = [0, 1]
            if (grid[1][0] == 0) sel = [1, 0]
            if (grid[1][2] == 0) sel = [1, 2]
            if (grid[2][1] == 0) sel = [2, 1]
        }
    }

    if (sel.length == 0) {
        //Corners
        if (grid[1][1] == 0 && play > 0) sel = [1, 1]
        else if (grid[0][0] == 0) sel = [0, 0]
        else if (grid[0][2] == 0) sel = [0, 2]
        else if (grid[2][0] == 0) sel = [2, 0]
        else if (grid[2][2] == 0) sel = [2, 2]
        //Middle
        else if (grid[1][1] == 0) sel = [1, 1]
    }
    
    if (sel.length == 0) {
        let flatg = [].concat(...grid).indexOf(0);
        sel = [Math.floor(flatg / 3), flatg % 3]
    }

    console.log("sel", sel, parseInt(sel[0]) * 3 + parseInt(sel[1]))
    play += 1;
    datacol.push(grid.concat(parseInt(sel[0]) * 3 + parseInt(sel[1])).join(","))

    $($("li")[sel[0] * 3 + parseInt(sel[1])]).addClass("o")
    player = 0;
    grid[sel[0]][parseInt(sel[1])] = "o"
    checkwin(grid)

    if ([].concat(...grid).indexOf(0) == -1) {
        alertin("Draw!")
        win2()
    } 
}

function counta(array, what) {
    return array.filter(item => item == what).length;
}

function sides() {
    if (grid[0][1] == 0) return [0, 1]
    if (grid[1][0] == 0) return [1, 0]
    if (grid[1][2] == 0) return [1, 2]
    if (grid[2][1] == 0) return [2, 1]
}

function corners() {
    if (grid[0][0] == 0) return [0, 0]
    if (grid[0][2] == 0) return [0, 2]
    if (grid[2][0] == 0) return [2, 0]
    if (grid[2][2] == 0) return [2, 2]
}