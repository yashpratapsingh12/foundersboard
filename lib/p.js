const user ={
    name:{
        p:"yyy"
    },
    last:{
        z:"kkk"
    }

}

function app ({name:{p}}){
  console.log(p)
}

const{name} = user;


console.log(p)