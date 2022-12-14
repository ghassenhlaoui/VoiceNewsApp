intent('What does this app do?', 'What can I do here',
      reply('This is a news project.'));

const API_KEY = '0d6551d7a2994bb0a8941f54be77ed8d';
let savedArticles = [];
//News by sources

onCreateProject(() => {
    project.news = {en: "CNN|BBC News|ABC News|BBC Sport|CBC News|Google News|L'equipe|Marca|MTV News|National Geographic"};
});

    
    intent('Give me the latest news from $(NEWS p:news)',  async(p) =>{
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=0d6551d7a2994bb0a8941f54be77ed8d`;
        if(p.NEWS.value){
  
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.NEWS.value.toLowerCase().split(" ").join('-')}`
    }
        
        const response = await api.axios.get(NEWS_API_URL, {
                 headers: {
                     'User-Agent': "PostmanRuntime/7.29.0" 
                      }
             });

             if(!response.data.articles.length) {
                p.play("Sorry, please try searching from a different source");
                return;
             } else {
                const articles = response.data.articles;
                 p.userData.savedArticles =response.data.articles;
                p.play({ command: "newHeadLines", savedArticles:articles});
                p.play(`Here are the (latest|recent) news from  ${p.NEWS.value} news`);
             }
        p.play("Would you like me to read the headlines? ");
                 p.then(confirmation);
   

})
//News by terms

onCreateProject(() => {
    project.terms = {en: "Bitcoin|Apple|PlayStation 5|Smartphones|Donald Trump"};
});

    
    intent('What\'s up with $(TERMS p:terms)',  async(p) =>{
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=0d6551d7a2994bb0a8941f54be77ed8d`;
        if(p.TERMS.value){
  
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.TERMS.value}`
    }
        
        const response = await api.axios.get(NEWS_API_URL, {
                 headers: {
                     'User-Agent': "PostmanRuntime/7.29.0" 
                      }
             });

             if(!response.data.articles.length) {
                p.play("Sorry, please try searching from a different source");
                return;
             } else {
                const articles = response.data.articles;
                 p.userData.savedArticles =response.data.articles;
                p.play({ command: "newHeadLines", savedArticles:articles});
                p.play(`Here are the (latest|recent) articles on ${p.TERMS.value}`);
             
                 p.play("Would you like me to read the headlines? ");
                 p.then(confirmation);
             }
   

})



//News by categories    
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}`;

    intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|)$(C~ ${CATEGORIES_INTENT})`, 
           `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`,async (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=0d6551d7a2994bb0a8941f54be77ed8d&country=us`;
        if(p.C.value){
            
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`;
    }
        
        const response = await api.axios.get(NEWS_API_URL, {
                 headers: {
                     'User-Agent': "PostmanRuntime/7.29.0" 
                      }
             });

             if(!response.data.articles.length) {
                p.play("Sorry, please try searching from a different category");
                return;
             } else {
                const articles = response.data.articles;
                  p.userData.savedArticles =response.data.articles;
                p.play({ command: "newHeadLines", savedArticles:articles});
                 
                 
                 if(p.C.value){
                      p.play(`Here are the (latest|recent) articles on ${p.C.value}`);
                    }else {
                        p.play(`Here are the (latest|recent) news`);
                    }
                 p.play("Would you like me to read the headlines? ");
                 p.then(confirmation);
             }
                 
   

});

const confirmation = context(() => {
intent('yes', async (p) => {
for(let i = 0; i <  p.userData.savedArticles.length; i++){
p.play({ command: 'highlight', article:  p.userData.savedArticles[i]});
p.play( p.userData.savedArticles[i].title);
}
})

intent('no', (p) => {
    p.play('Sure, sounds good to me.')
})
})

intent('open (the|) (article|) (number|) $(number* (.*))', async(p) => {
    if(p.number.value) {
        p.play({ command:'open', number: p.number.value, savedArticles:  p.userData.savedArticles})
    }
})
//Going Back
intent('(Go|) back', async (p) => {
    p.play('Sure, going back.')
    p.play({ command: 'newHeadLines', savedArticles: []})

})
