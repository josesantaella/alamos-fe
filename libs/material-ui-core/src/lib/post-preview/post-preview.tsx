import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/* eslint-disable-next-line */
export interface PostPreviewProps {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  onReadMore: () => void;
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       minWidth: '22em',
//       flex: 1,
//       [theme.breakpoints.up('md')]: {
//         minWidth: '25em',
//         maxWidth: 345
//       }
//     },
//     media: {
//       height: 140
//     },
//     content: {
//       height: '12em',
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     text: {
//       display: '-webkit-box',
//       '-webkit-line-clamp': 4,
//       '-webkit-box-orient': 'vertical',
//       overflow: 'hidden'
//     }
//   })
// );

export const PostPreview: React.FC<PostPreviewProps> = ({ title, imageUrl, content, onReadMore }) => {
  return (
    <Card sx={{ minWidth: { xs: '22em', md: '25em' }, maxWidth: { md: 345 }, flex: 1 }}>
      <CardActionArea>
        <CardMedia sx={{ height: 140 }} image={imageUrl} title={title} />
        <CardContent sx={{ height: '12em', display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            sx={{
              display: '-webkit-box',
              // '-webkit-line-clamp': 4,
              // '-webkit-box-orient': 'vertical',
              overflow: 'hidden'
            }}
          >
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={() => onReadMore()}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostPreview;
