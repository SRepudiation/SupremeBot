module.exports={
    name:'minesweeper',
    description:'Prints an 8x8 minesweeper board, although it can be used to generate boards ranging from 8x8 to 14x14 if the size is specified after the "minesweeper" command',
    execute(message,words){
        function CheIsInt(n){
            let IsInt=true;
            for(let i=0;i<n.length;i++){
                if((n.charCodeAt(i)<48)||(n.charCodeAt(i)>57)){
                        IsInt=false;
                        return IsInt;
                }
            }
            return IsInt;
        }
        function CheckAround(arr){
            let nums={1:"||:one:||", 2:"||:two:||", 3:"||:three:||", 4:"||:four:||",5:"||:five:||",
            6:"||:six:||", 7:"||:seven:||",8:"||:eight:||",9:"||:nine:||",0:"||:zero:||"};
            let opps=[0,1,-1];
            for(let y=0;y<arr.length;y++){
                for(let x=0;x<arr[y].length;x++){
                    if(arr[y][x]!="||:bomb:||"){
                        let counter=0;
                        for(let i=0;i<opps.length;i++){
                            for(let j=0;j<opps.length;j++){
                                if((y+opps[i]>(arr.length-1))||(y+opps[i]<0)||(x+opps[j]>(arr[y].length-1))||(x+opps[j]<0)||(j==0 && 0==i)){
                                    continue;}
                                else if(arr[y+opps[i]][x+opps[j]]=="||:bomb:||"){counter++;}
                            }
                        }
                        arr[y][x]=nums[counter];
                    }
                }
            }
            return arr;
        }
        function GenBoard(size=8){
            if(!CheIsInt(size)){size=8;}
            else{size=parseInt(size,10);}
            if(size>14||size<8){size=8;}
            let board=[];
            for(let i=0;i<size;i++){
                board.push(new Array(size).fill(" "));
            }
            for(let i=0;i<((size**2)/4);i++){
                let found=false;
                while(!found){
                    let x=Math.floor(Math.random()*size);
                    let y=Math.floor(Math.random()*size);
                    if(board[x][y]==" "){
                        board[x][y]='||:bomb:||';
                        found=true;
                    }
                }
            }
            board=CheckAround(board);
            return board;
        }
        let board=[];
        if(words.length>2){board=GenBoard(words[2]);}
        else{board=GenBoard();}
        let output="";
        for (let j=0;j<board.length;j++){
            for(let i=0;i<board[j].length;i++){
                output=output+board[j][i];
                if(i==(board[j].length-1)){output=output+'\n';}
            }
        }
        message.channel.send(output);
    }
    
}