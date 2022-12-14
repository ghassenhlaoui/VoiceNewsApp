import React, { useState, useEffect } from "react";
import wordsToNumbers from "words-to-numbers";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles.js';


const alanKey = 'b63298abac0f30240d86ca3ab309e7992e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () =>{
    const classes = useStyles();
    const [activeArticle,setActiveArticle] = useState(-1);
    const [newsArticles,setNewsArticles] = useState([]);

    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({ command, savedArticles, number }) => {
                if(command === 'newHeadLines'){
                    setNewsArticles(savedArticles);
                    setActiveArticle(-1);
                } else if (command === 'highlight'){
                    setActiveArticle((prevActiveArticle) =>prevActiveArticle + 1);
                } else if(command ==='open'){
                    const parsedNumber = number.length >2 ? wordsToNumbers(number, {fuzzy :true}) : number;
                    const article = savedArticles[parsedNumber - 1];
                    if (parsedNumber >20){
                        alanBtn().playText('Please try that again !')
                    }else if(article){
                        console.log('Article',number)
                        window.open(savedArticles[number].url, '_blank');
                        alanBtn().playText('Openning...')
                    }
                    
                    
                }
            }
        })
    }, [])

    

    return(
        <div>
            <div className={classes.logoContainer}>
                <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan logo"/>
            </div>
            <NewsCards savedArticles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}
export default App;