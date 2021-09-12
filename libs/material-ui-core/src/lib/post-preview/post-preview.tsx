
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/* eslint-disable-next-line */
export interface PostPreviewProps {
  id: number,
  title: string,
  imageUrl: string,
  content: string,
  onReadMore: ()=> void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: "22em",
      flex: 1,
    [theme.breakpoints.up('md')]: {
      minWidth: "25em",
      maxWidth: 345,
    },
    },
    media: {
      height: 140,
    },
    content: {
      height: "12em",
      display: "flex",
      flexDirection: "column"
    },
    text : {
      display: "-webkit-box",
      ['-webkit-line-clamp']: 4,
      ['-webkit-box-orient']: "vertical",
      overflow: "hidden"
    }
  })
);

export const PostPreview: React.FC<PostPreviewProps> = ({ title, imageUrl, content, onReadMore }) => {
  
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={() => onReadMore() }>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostPreview;
