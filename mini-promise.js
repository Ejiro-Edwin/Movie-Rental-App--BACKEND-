
async function getInfo(){
  
        const user = await getCustomer(1);
        console.log('Customer', user);
        if(user.isGold){
            const movies = await getTopMovies();
            console.log('Top Movies:',movies);
            await sendEmail(user.email, movies);
            console.log('Email Sent...');
        }
    
}
getInfo();

function getCustomer(id){
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id:1,
                name:'ejiro',
                isGold:true,
                email:'email'
            });
        }, 4000);
    });
}


function getTopMovies(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=> {
            resolve(['movie1', 'movie2'] );
        }, 4000);
    });
}



function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });
  }
