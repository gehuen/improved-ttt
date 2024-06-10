var colour;
var player_1;
var player_2;
var winning = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var turn = 0;
var game_ended = false;
var winningScreen;

window.onload = function(){
    colour = new Array();
    for (var i=0; i < 9; ++i) {
        colour[i] = -1;
    }

    player_1 = new Array();
    for (var i = 0; i < 3; ++i) {
        player_1[i] = -2;
    }

    player_2 = new Array();
    for (var i = 0; i < 3; ++i) {
        player_2[i] = -2;
    }

    winningScreen = document.getElementById("winning-screen");

}

function canvas_click(canvas_number) {

    if (game_ended) {
        return;
    }

    var clicked_canvas = document.getElementById("canvas" + canvas_number);

    if (colour[canvas_number] == -1) {
        var disappearing_num;
        var disappearing_canvas;

        if (turn % 2 == 0) {
            var turn0 = turn / 2;

            disappearing_num = player_1[turn0 % 3];
            if (disappearing_num != -2) {
                disappearing_canvas = document.getElementById('canvas' + disappearing_num);
                disappearing_canvas.style.background = 'grey';
                colour[disappearing_num] = -1;
            }

            colour[canvas_number] = 0;
            player_1[turn0 % 3] = canvas_number;
            clicked_canvas.style.background = 'red';
        } else {
            var turn1 = (turn - 1) / 2;

            disappearing_num = player_2[turn1 % 3];
            if (disappearing_num != -2) {
                disappearing_canvas = document.getElementById('canvas' + disappearing_num);
                disappearing_canvas.style.background = 'grey';
                colour[disappearing_num] = -1;
            }

            colour[canvas_number] = 1;
            player_2[turn1 % 3] = canvas_number;
            clicked_canvas.style.background = 'blue';
        }

        ++ turn;
        check_winners(colour[canvas_number])
    } 
}

function check_winners(player_number) {
    for (var i = 0; i < winning.length; ++i) {
        if (colour[winning[i][0]] == player_number &&  colour[winning[i][1]] == player_number && colour[winning[i][2]] == player_number) {
            winningScreen.innerHTML = `Player ${player_number+1} has won!`;
            winningScreen.style.display = "block";
            game_ended = true;
        }
    }
}

function restart() {
    game_ended = false;
    location.reload();
}