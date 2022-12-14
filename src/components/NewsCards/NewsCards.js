import NewsCard from '../NewsCard/NewsCard';
import { Grid, Grow, Typography } from '@material-ui/core';
import useStyles from './styles.js'

const infoCards = [
    { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
    { color: '#283593', title: 'News by Sources', info: 'CNN, BBC Sport, BBC News, Marca, MTV News, National Geographic, ABC News...', text: 'Give me the latest news from CNN' },
  ];

const NewsCards = ({ savedArticles, activeArticle }) => {
    const classes= useStyles();

    if(!savedArticles.length){
        return(
            <Grow in>
                <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                    {infoCards.map((infoCard) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                            <div className={classes.card} style={{backgroundColor: infoCard.color}}>
                                <Typography variant="h5">{infoCard.title}</Typography>
                                    {infoCard.info?
                                        (<Typography variant='h6'>
                                            <strong>{infoCard.title.split(' ')[2]}:
                                            </strong>
                                            <br />
                                            {infoCard.info}
                                </Typography>): null}
                                
                                <Typography variant='h6'>Trying say: <br /> <i>{infoCard.text}</i></Typography>

                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        )
    }

    return ( 
        <Grow in>
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>

            {savedArticles.map((article, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} style={{ display:'flex' }}>
                    <NewsCard savedArticles={article} activeArticle={activeArticle} i={i}/>
                </Grid>
            ))}
            </Grid>
        </Grow>
     );
}
 
export default NewsCards;