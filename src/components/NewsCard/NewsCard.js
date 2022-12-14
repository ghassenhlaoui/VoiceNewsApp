import { useEffect, useState, createRef } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import useStyles from './styles.js';

import classNames from 'classnames';
const NewsCard = ({savedArticles: {description, publishedAt, source, title, url,urlToImage}, i, activeArticle}) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
    useEffect(() => {
        setElRefs((refs)=> Array(20).fill().map((_, j) => refs[j] ||createRef()));
    }, []);

    useEffect(() =>{
        if(i === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle]);
        }
    }, [i, activeArticle, elRefs])
    return ( 
        <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle===i ? classes.activeCard :null)}>
            <CardActionArea href={url} target='_blank'>
                <CardMedia className={classes.media} image={urlToImage || 'https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png'}/>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' component='h2'>{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant='body2' color='textSecondary' component='h2'>{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant='h5'>{title}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size='small' color='primary'>Learn More</Button>
                <Typography variant='h5' color='textSecondary'>{i + 1}</Typography>
            </CardActions>
        </Card>
     );
}
 
export default NewsCard;